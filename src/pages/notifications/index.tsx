import { useState, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container } from '@mui/material';
import { MainLayout } from '../../layouts/repo';
import { useMutation, useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS_ALL, MARK_ALL_AS_READ, MARK_AS_READ } from 'src/graphQL/notification';
import { NotificationToolbar } from 'src/components/notifications/NotificationsList/NotificationToolbar';
import { NotificationRow } from 'src/components/notifications/NotificationsList/NotificationRow';
import { NotificationObj } from 'src/components/notifications/notification';
import getAppoloClinet from 'src/utils/connectAppolo';

function filterData(list: NotificationObj[], filter: string): NotificationObj[] {
    return list.filter((repo) => repo.title.toLowerCase().includes(filter.toLowerCase()));
}

ReportList.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default function ReportList() {
    const { push } = useRouter();

    const [filter, setFileter] = useState('');

    // Get the data from CiTROS GraphQL API
    const { loading, error, data, refetch } = useQuery(GET_NOTIFICATIONS_ALL, {
        pollInterval: 10000,
    });
    if (error) {
        console.log('ERROR!', error);
    }
    const [totalUnRead, setTotalUnRead] = useState(0);
    let tableData: NotificationObj[] = useMemo(() => {
        if (data == undefined) {
            return [];
        }

        // console.log("NotificationsPopover -> GET_NOTIFICATIONS", projectsList);
        if (!error && !loading) {
            setTotalUnRead(data.totalUnreadNotificationCount.totalCount);
            return data.notificationsList;
        }
    }, [data]);

    const [readNotification, { loading: saving, error: savingError }] = useMutation(MARK_AS_READ);

    const onNotificationClickHandler = async function (id: string, url: string) {
        // console.log("onNotificationClickHandler", id, url);

        // return;
        await readNotification({
            variables: {
                nid: id,
            },
        });

        if (url) {
            push(url);
            return;
        }
        // refresh notifications window
        refetch();
    };

    const handleMarkAllAsRead = useCallback(async () => {
        const client = getAppoloClinet();
        const resp = await client.mutate({ mutation: MARK_ALL_AS_READ });
        // console.log("*** [debug] handleMarkAllAsRead");
        refetch();
    }, [refetch, data]);

    return (
        <>
            <Head>
                <title> integration: Repo List</title>
            </Head>

            <Container maxWidth={'lg'} sx={{ pt: 3 }}>
                <NotificationToolbar
                    onChange={(data) => setFileter(data as string)}
                    markAllAsRead={function (): void {
                        handleMarkAllAsRead();
                    }}
                />

                <Box sx={{ border: 0.5, borderColor: 'grey.700', borderRadius: 1 }}>
                    {tableData &&
                        filterData(tableData, filter).map((notification) => (
                            <NotificationRow
                                onNotificationClickHandler={onNotificationClickHandler}
                                notification={notification}
                                key={notification.id}
                            />
                        ))}
                </Box>
            </Container>
        </>
    );
}
