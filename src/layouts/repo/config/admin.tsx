import { PATH_BATCH, PATH_DASHBOARD, PATH_PAGE, PATH_REPO, PATH_USERS } from '../../../routes/paths';
import Iconify from '../../../components/iconify';

const generateConfig = (repo: string) => {
    return [
        // TODO: notification manager - send notification.
        { title: 'Notification', roles: ['admin'], path: PATH_PAGE.comingSoon },

        // TODO: user managment- add/update/remove...
        { title: 'Users', roles: ['admin'], path: PATH_USERS.root },
        // { title: 'Users', path: PATH_PAGE.comingSoon},

        // TODO: admin dashboard abour the citros system
        { title: 'Analitics', roles: ['admin'], path: PATH_PAGE.comingSoon },

        { title: 'Organizations', roles: ['admin'], path: PATH_PAGE.comingSoon },

        // TODO: git repos + state ...
        // TODO: google admin
        // TODO: monitorings tools
        // TODO: people that left thair info for a waiting list.
        // TODO: internal documentation for private repos.
    ];
};

export default generateConfig;
