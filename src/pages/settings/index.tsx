import { useState } from 'react';
import Head from 'next/head';
import { Container, Tab, Tabs, Box, Divider } from '@mui/material';
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock/arrays';
import { MainLayout } from '../../layouts/repo';
import Iconify from '../../components/iconify';
import {
    AccountGeneral,
    AccountOrganization,
    AccountBilling,
    AccountChangePassword,
    AccountSSHKeys,
} from '../../sections/settings/user/account';
import { useRouter } from 'next/router';
import UsersListComponent from 'src/components/users/UsersListComponent';

UserAccountPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default function UserAccountPage() {
    const router = useRouter();

    // const [currentTab, setCurrentTab] = useState('general');
    const [currentTab, setCurrentTab] = useState(router.query.tab || 'general');

    const TABS = [
        {
            value: 'general',
            label: 'General',
            icon: <Iconify icon="ic:round-account-box" />,
            component: <AccountGeneral />,
        },
        {
            value: 'organization',
            label: 'Organization',
            icon: <Iconify icon="ic:round-account-box" />,
            component: <AccountOrganization />,
        },
        {
            value: 'users',
            label: 'users',
            icon: <Iconify icon="mdi:user-outline" />,
            component: <UsersListComponent />,
        },
        // { // TODO: not ready yet
        //     value: 'billing',
        //     label: 'Billing',
        //     icon: <Iconify icon="ic:round-receipt" />,
        //     component: <AccountBilling cards={_userPayment} addressBook={_userAddressBook} invoices={_userInvoices} />,
        // },
        // { // TODO: not ready yet
        //     value: 'notifications',
        //     label: 'Notifications',
        //     icon: <Iconify icon="eva:bell-fill" />,
        //     component: <AccountNotifications />,
        // },
        {
            value: 'change_password',
            label: 'Change password',
            icon: <Iconify icon="ic:round-vpn-key" />,
            component: <AccountChangePassword />,
        },
        {
            value: 'ssh_keys',
            label: 'SSH Keys',
            icon: <Iconify icon="ic:round-vpn-key" />,
            component: <AccountSSHKeys />,
        },
        // {
        //     value: 'quota',
        //     label: 'quota',
        //     icon: <Iconify icon="eos-icons:quota-outlined" />,
        //     component: <Box />,
        // },
    ];

    // console.log('currentTab', currentTab);

    return (
        <>
            <Head>
                <title> User: Account Settings | CiTROS </title>
            </Head>

            <Container maxWidth={'lg'}>
                {/* <CustomBreadcrumbs
                    heading="Account"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        // { name: 'User', href: PATH_DASHBOARD.user.root },
                        { name: 'Account Settings' },
                    ]}
                /> */}

                <Tabs
                    sx={{ mt: 1 }}
                    value={currentTab}
                    onChange={(event, newValue) => {
                        setCurrentTab(newValue);
                        router.push(
                            {
                                pathname: router.pathname,
                                query: { ...router.query, tab: newValue },
                            },
                            undefined,
                            { shallow: true }
                        );
                    }}
                >
                    {TABS.map((tab) => (
                        <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                    ))}
                </Tabs>
                <Divider></Divider>

                {TABS.map(
                    (tab) =>
                        tab.value === currentTab && (
                            <Box key={tab.value} sx={{ mt: 5 }}>
                                {tab.component}
                            </Box>
                        )
                )}
            </Container>
        </>
    );
}
