// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
    blog: icon('ic_blog'),
    cart: icon('ic_cart'),
    chat: icon('ic_chat'),
    mail: icon('ic_mail'),
    user: icon('ic_user'),
    file: icon('ic_file'),
    lock: icon('ic_lock'),
    label: icon('ic_label'),
    blank: icon('ic_blank'),
    kanban: icon('ic_kanban'),
    folder: icon('ic_folder'),
    banking: icon('ic_banking'),
    booking: icon('ic_booking'),
    invoice: icon('ic_invoice'),
    calendar: icon('ic_calendar'),
    disabled: icon('ic_disabled'),
    external: icon('ic_external'),
    menuItem: icon('ic_menu_item'),
    ecommerce: icon('ic_ecommerce'),
    analytics: icon('ic_analytics'),
    dashboard: <Iconify icon={'ant-design:setting-twotone'} sx={{ width: 1, height: 1 }} />,
    simulation: <Iconify icon={'material-symbols:playlist-play'} sx={{ width: 1, height: 1 }} />,
    jupyter: <Iconify icon={'ep:notebook'} sx={{ width: 1, height: 1 }} />,
    report: icon('ic_analytics'),
};

const navConfig = [
    // General
    {
        subheader: 'General',
        items: [
            {
                title: 'dashboard',
                path: PATH_DASHBOARD.root,
                icon: ICONS.dashboard,
                roles: ['admin'],
                caption: 'only_admin_can_see_this_item',
            },
            { title: 'projects', path: PATH_DASHBOARD.integration.root, icon: ICONS.dashboard },
            { title: 'Simulation Runs', path: PATH_DASHBOARD.simulations.root, icon: ICONS.simulation },
            { title: 'notebooks', path: PATH_DASHBOARD.notebook.root, icon: ICONS.jupyter },
            {
                title: 'tests',
                path: PATH_DASHBOARD.test.root,
                icon: ICONS.simulation,
                roles: ['admin'],
                caption: 'only_admin_can_see_this_item',
            },
        ],
    },

    // Integration
    // ----------------------------------------------------------------------
    // {
    //   subheader: 'Integration',
    //   items: [{ title: 'projects', path: PATH_DASHBOARD.integration.root, icon: ICONS.dashboard }],
    // },
    // Test
    // ----------------------------------------------------------------------
    // {
    //   subheader: 'Simulations',
    //   items: [
    //     { title: 'Runs', path: PATH_DASHBOARD.simulations.root, icon: ICONS.simulation },
    //     { title: 'tests', path: PATH_DASHBOARD.test.root, icon: ICONS.simulation, roles: ['admin'], caption: 'only_admin_can_see_this_item' },

    //     // { title: 'configurations', path: PATH_DASHBOARD.test.configurations, icon: ICONS.dashboard },
    //     // { title: 'config_generator', path: PATH_DASHBOARD.test.config_generator, icon: ICONS.dashboard },
    //     // { title: 'scheduler', path: PATH_DASHBOARD.test.config_generator, icon: ICONS.dashboard },
    //     // { title: 'monitoring', path: PATH_DASHBOARD.test.config_generator, icon: ICONS.dashboard },
    //   ],
    // },
    // Analysis
    // ----------------------------------------------------------------------
    // {
    //   subheader: 'Data',
    //   items: [
    //     { title: 'notebooks', path: PATH_DASHBOARD.notebook.root, icon: ICONS.jupyter },
    //   ],
    // },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
        subheader: 'management',
        items: [
            // USER
            // {
            //   title: 'user',
            //   path: PATH_DASHBOARD.user.root,
            //   icon: ICONS.user,
            //   children: [
            //     { title: 'profile', path: PATH_DASHBOARD.user.profile },
            //     { title: 'cards', path: PATH_DASHBOARD.user.cards },
            //     { title: 'list', path: PATH_DASHBOARD.user.list },
            //     { title: 'create', path: PATH_DASHBOARD.user.new },
            //     { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
            //     { title: 'account', path: PATH_DASHBOARD.user.account },
            //   ],
            // },
            {
                title: 'Notifications',
                path: PATH_PAGE.notifications,
                icon: ICONS.mail,
                // info: <Label color="error">+32</Label>,
            },

            // ADMIN
            {
                title: 'Admin Space',
                caption: 'only_admin_can_see_this_item',
                roles: ['admin'], // Only admin can see this item.
                path: PATH_DASHBOARD.user.root,
                icon: ICONS.user,
                children: [
                    // TODO: notification manager - send notification.
                    { title: 'Notification', roles: ['admin'], path: PATH_PAGE.comingSoon },

                    // TODO: user managment- add/update/remove...
                    { title: 'Users', roles: ['admin'], path: PATH_DASHBOARD.adminUserList.root },
                    // { title: 'Users', path: PATH_PAGE.comingSoon},

                    // TODO: admin dashboard abour the citros system
                    { title: 'Analitics', roles: ['admin'], path: PATH_PAGE.comingSoon },

                    { title: 'Organizations', roles: ['admin'], path: PATH_PAGE.comingSoon },

                    // TODO: git repos + state ...
                    // TODO: google admin
                    // TODO: monitorings tools
                    // TODO: people that left thair info for a waiting list.
                    // TODO: internal documentation for private repos.
                ],
            },

            // // INVOICE
            // {
            //   title: 'invoice',
            //   path: PATH_DASHBOARD.invoice.root,
            //   icon: ICONS.invoice,
            //   children: [
            //     { title: 'list', path: PATH_DASHBOARD.invoice.list },
            //     { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
            //     { title: 'create', path: PATH_DASHBOARD.invoice.new },
            //     { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
            //   ],
            // },

            // {
            //   title: 'File manager',
            //   path: PATH_DASHBOARD.fileManager,
            //   icon: ICONS.folder,
            // },
        ],
    },

    // // GENERAL
    // // ----------------------------------------------------------------------
    // {
    //   subheader: 'general',
    //   items: [
    //     { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
    //     { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
    //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
    //     { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
    //     { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    //     { title: 'file', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
    //   ],
    // },

    // // MANAGEMENT
    // // ----------------------------------------------------------------------
    // {
    //   subheader: 'management',
    //   items: [
    //     // USER
    //     {
    //       title: 'user',
    //       path: PATH_DASHBOARD.user.root,
    //       icon: ICONS.user,
    //       children: [
    //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
    //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
    //         { title: 'list', path: PATH_DASHBOARD.user.list },
    //         { title: 'create', path: PATH_DASHBOARD.user.new },
    //         { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
    //         { title: 'account', path: PATH_DASHBOARD.user.account },
    //       ],
    //     },

    //     // E-COMMERCE
    //     {
    //       title: 'ecommerce',
    //       path: PATH_DASHBOARD.eCommerce.root,
    //       icon: ICONS.cart,
    //       children: [
    //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
    //         { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
    //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
    //         { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
    //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
    //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
    //       ],
    //     },

    //     // INVOICE
    //     {
    //       title: 'invoice',
    //       path: PATH_DASHBOARD.invoice.root,
    //       icon: ICONS.invoice,
    //       children: [
    //         { title: 'list', path: PATH_DASHBOARD.invoice.list },
    //         { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
    //         { title: 'create', path: PATH_DASHBOARD.invoice.new },
    //         { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
    //       ],
    //     },

    //     // BLOG
    //     {
    //       title: 'blog',
    //       path: PATH_DASHBOARD.blog.root,
    //       icon: ICONS.blog,
    //       children: [
    //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
    //         { title: 'post', path: PATH_DASHBOARD.blog.demoView },
    //         { title: 'create', path: PATH_DASHBOARD.blog.new },
    //       ],
    //     },
    //     {
    //       title: 'File manager',
    //       path: PATH_DASHBOARD.fileManager,
    //       icon: ICONS.folder,
    //     },
    //   ],
    // },

    // // APP
    // // ----------------------------------------------------------------------
    // {
    //   subheader: 'app',
    //   items: [
    //     {
    //       title: 'mail',
    //       path: PATH_DASHBOARD.mail.root,
    //       icon: ICONS.mail,
    //       info: <Label color="error">+32</Label>,
    //     },
    //     {
    //       title: 'chat',
    //       path: PATH_DASHBOARD.chat.root,
    //       icon: ICONS.chat,
    //     },
    //     {
    //       title: 'calendar',
    //       path: PATH_DASHBOARD.calendar,
    //       icon: ICONS.calendar,
    //     },
    //     {
    //       title: 'kanban',
    //       path: PATH_DASHBOARD.kanban,
    //       icon: ICONS.kanban,
    //     },
    //   ],
    // },

    // DEMO MENU STATES
    // {
    //   subheader: 'Project Name',
    //   // subheader: 'Other cases',
    //   items: [
    //     // {
    //     //   // default roles : All roles can see this entry.
    //     //   // roles: ['user'] Only users can see this item.
    //     //   // roles: ['admin'] Only admin can see this item.
    //     //   // roles: ['admin', 'manager'] Only admin/manager can see this item.
    //     //   // Reference from 'src/guards/RoleBasedGuard'.
    //     //   title: 'item_by_roles',
    //     //   path: PATH_DASHBOARD.permissionDenied,
    //     //   icon: ICONS.lock,
    //     //   roles: ['admin'],
    //     //   caption: 'only_admin_can_see_this_item',
    //     // },
    //     {
    //       title: 'menu_level',
    //       path: '#/dashboard/menu_level',
    //       icon: ICONS.menuItem,
    //       children: [
    //         {
    //           title: 'menu_level_2a',
    //           path: '#/dashboard/menu_level/menu_level_2a',
    //         },
    //         {
    //           title: 'menu_level_2b',
    //           path: '#/dashboard/menu_level/menu_level_2b',
    //           children: [
    //             {
    //               title: 'menu_level_3a',
    //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
    //             },
    //             {
    //               title: 'menu_level_3b',
    //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
    //               children: [
    //                 {
    //                   title: 'menu_level_4a',
    //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
    //                 },
    //                 {
    //                   title: 'menu_level_4b',
    //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   //   {
    //   //     title: 'item_disabled',
    //   //     path: '#disabled',
    //   //     icon: ICONS.disabled,
    //   //     disabled: true,
    //   //   },

    //   //   {
    //   //     title: 'item_label',
    //   //     path: '#label',
    //   //     icon: ICONS.label,
    //   //     info: (
    //   //       <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
    //   //         NEW
    //   //       </Label>
    //   //     ),
    //   //   },
    //   //   {
    //   //     title: 'item_caption',
    //   //     path: '#caption',
    //   //     icon: ICONS.menuItem,
    //   //     caption:
    //   //       'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
    //   //   },
    //   //   {
    //   //     title: 'item_external_link',
    //   //     path: 'https://www.google.com/',
    //   //     icon: ICONS.external,
    //   //   },
    //   //   {
    //   //     title: 'blank',
    //   //     path: PATH_DASHBOARD.blank,
    //   //     icon: ICONS.blank,
    //   //   },
    //   ],
    // },
];

export default navConfig;
