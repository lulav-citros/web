import { PATH_BATCH, PATH_DASHBOARD, PATH_PAGE, PATH_REPO, PATH_SETTINGS } from '../../../routes/paths';
import Iconify from '../../../components/iconify';

const generateConfig = (repo: string) => {
    return [
        // {
        //     title: 'Overview',
        //     path: PATH_PAGE.root,
        //     pathname: PATH_PAGE.root,
        //     icon: <Iconify icon={'octicon:home-16'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
        // },
        {
            title: 'Repositories',
            path: PATH_REPO.list,
            pathname: PATH_REPO.list,
            icon: <Iconify icon={'ri:git-repository-line'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
        },
        {
            title: 'Runs',
            path: PATH_BATCH.list,
            pathname: PATH_BATCH.list,
            icon: <Iconify icon={'zondicons:play-outline'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
        },
        {
            title: 'Images',
            path: PATH_REPO.images(),
            pathname: PATH_REPO.images(),
            icon: <Iconify icon={'pajamas:container-image'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
        },
        {
            title: 'data',
            path: PATH_REPO.allData(),
            pathname: "/data/[[...filepath]]",
            icon: <Iconify icon={'majesticons:data-line'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
            // caption: 'simulation runs',
        },
        {
            title: 'Notifications',
            path: PATH_PAGE.notifications,
            pathname: PATH_PAGE.notifications,
            icon: (
                <Iconify
                    icon={'zondicons:notifications-outline'}
                    sx={{ width: '16px', height: '16px', color: 'gray' }}
                />
            ),
            // info: <Label color="error">+32</Label>,
        },
        {
            title: 'Settings',
            path: PATH_SETTINGS.root,
            pathname: PATH_SETTINGS.root,
            icon: <Iconify icon={'solar:settings-outline'} sx={{ width: '16px', height: '16px', color: 'gray' }} />,
            // info: <Label color="error">+32</Label>,
        },
        // { title: 'hooks', path: PATH_DASHBOARD.notebook.root, icon: ICONS.jupyter },
        // { title: 'data managment', path: PATH_DASHBOARD.notebook.root, icon: ICONS.jupyter },
        // { title: 'query data', path: PATH_DASHBOARD.notebook.root, icon: ICONS.jupyter },
        // { title: 'notebooks', path: PATH_DASHBOARD.notebook.root, icon: ICONS.jupyter },
        // { title: 'tests', path: PATH_DASHBOARD.test.root, icon: ICONS.simulation, roles: ['admin'], caption: 'only_admin_can_see_this_item' },
    ];
};

export default generateConfig;
