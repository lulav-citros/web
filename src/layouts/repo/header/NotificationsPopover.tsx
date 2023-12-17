import { noCase } from 'change-case';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
// @mui
import {
    Box,
    Stack,
    List,
    Badge,
    Button,
    Avatar,
    Tooltip,
    Divider,
    IconButton,
    Typography,
    ListItemText,
    ListSubheader,
    ListItemAvatar,
    ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
// import { _notifications } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';

import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS, MARK_AS_READ, MARK_ALL_AS_READ } from '../../../graphQL/notification';
import getAppoloClinet from 'src/utils/connectAppolo';
import { PATH_DASHBOARD, PATH_PAGE } from 'src/routes/paths';
// ----------------------------------------------------------------------

type NotificationItemProps = {
    id: string;
    title: string;
    description: string;
    url: string;
    avatar: string | null;
    type: 'message' | 'announcement' | 'notification';
    createdAt: Date;
    isUnRead: boolean;
};

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
    const { loading, error, data, refetch } = useQuery(GET_NOTIFICATIONS, {
        pollInterval: 10000,
    });
    if (error) {
        console.log('ERROR!', error);
    }
    const [totalUnRead, setTotalUnRead] = useState(0);
    let notifications: NotificationItemProps[] = useMemo(() => {
        if (data == undefined) {
            return [];
        }

        // console.log("NotificationsPopover -> GET_NOTIFICATIONS", projectsList);
        if (!error && !loading) {
            setTotalUnRead(data.totalUnreadNotificationCount.totalCount);
            return data.notificationsList;
        }
    }, [data]);

    // const [MarkAllNotificationAsRead, { loading: saving, error: savingError }] = useMutation(MARK_ALL_AS_READ);

    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const handleMarkAllAsRead = useCallback(async () => {
        const client = getAppoloClinet();
        const resp = await client.mutate({ mutation: MARK_ALL_AS_READ });
        // console.log("*** [debug] handleMarkAllAsRead");
        refetch();
    }, [refetch, data]);

    return (
        <>
            <IconButtonAnimate
                color={openPopover ? 'primary' : 'default'}
                onClick={handleOpenPopover}
                sx={{ width: 40, height: 40 }}
            >
                <Badge badgeContent={totalUnRead} color="error">
                    <Iconify icon="eva:bell-fill" />
                </Badge>
            </IconButtonAnimate>

            <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">Notifications</Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            You have {totalUnRead} unread messages
                        </Typography>
                    </Box>

                    {totalUnRead > 0 && (
                        <Tooltip title=" Mark all as read">
                            <IconButton color="primary" onClick={handleMarkAllAsRead}>
                                <Iconify icon="eva:done-all-fill" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                                New
                            </ListSubheader>
                        }
                    >
                        {notifications.slice(0, 2).map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} refetch={refetch} />
                        ))}
                    </List>

                    <List
                        disablePadding
                        subheader={
                            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                                Before that
                            </ListSubheader>
                        }
                    >
                        {notifications.slice(2, 5).map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} refetch={refetch} />
                        ))}
                    </List>
                </Scrollbar>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ p: 1 }}>
                    <Button fullWidth disableRipple href={PATH_PAGE.notifications}>
                        View All
                    </Button>
                </Box>
            </MenuPopover>
        </>
    );
}

// ----------------------------------------------------------------------

function NotificationItem({ notification, refetch }: { notification: NotificationItemProps; refetch: any }) {
    const { query, push } = useRouter();

    const { avatar, title } = renderContent(notification);

    const [readNotification, { loading: saving, error: savingError }] = useMutation(MARK_AS_READ);

    const onNotificationClickHandler = async function () {
        await readNotification({
            variables: {
                nid: notification.id,
            },
        });

        if (notification.url) {
            // console.log("pressed notification: ", notification);
            push(notification.url);
            return;
        }
        // refresh notifications window
        refetch();
    };

    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(notification.isUnRead && {
                    bgcolor: 'action.selected',
                }),
            }}
            onClick={onNotificationClickHandler}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
            </ListItemAvatar>

            <ListItemText
                disableTypography
                primary={title}
                secondary={
                    <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
                        <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
                        <Typography variant="caption">{fToNow(notification.createdAt)}</Typography>
                    </Stack>
                }
            />
        </ListItemButton>
    );
}

// ----------------------------------------------------------------------

function renderContent(notification: NotificationItemProps) {
    const title = (
        <Typography variant="subtitle2">
            {notification.title}
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                &nbsp; {noCase(notification.description)}
            </Typography>
        </Typography>
    );

    if (notification.type === 'message') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/notification/message.png" />,
            title,
        };
    }
    if (notification.type === 'announcement') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/notification/announcement.png" />,
            title,
        };
    }
    if (notification.type === 'notification') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/notification/notification.png" />,
            title,
        };
    }
    return {
        avatar: <img alt={notification.title} src="/assets/icons/notification/ic_mail.svg" />,
        // avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
        title,
    };
}
