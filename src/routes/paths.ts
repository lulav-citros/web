// ----------------------------------------------------------------------

import { Dictionary } from '@fullcalendar/common';

function path(root: string, sublink: string, params: Dictionary = {}) {
    let url = `${root}${sublink}`;
    let params_arr: string[] = [];
    for (const [key, value] of Object.entries(params)) {
        params_arr.push(`${key}=${value}`);
    }
    if (params_arr.length == 0) {
        return url;
    }

    return `${url}?${params_arr.join('&')}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
    loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    verify: path(ROOTS_AUTH, '/verify'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    newPassword: path(ROOTS_AUTH, '/new-password'),
    thanksForRegistering: path(ROOTS_AUTH, '/thanks-for-registering'),
    checkYourEmail: path(ROOTS_AUTH, '/check-your-email'),
    close: path(ROOTS_AUTH, '/closing'),
    registerByInvitation: path(ROOTS_AUTH, '/register-by-invitation'),
};

export const PATH_PAGE = {
    root: '/',
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    pricing: '/pricing',
    payment: '/payment',
    about: '/about',
    contact: '/contact-us',
    documentation: '/doc',
    faqs: '/faqs',
    page403: '/403',
    page404: '/404',
    page500: '/500',
    components: '/components',
    dashboard: '/dashboard',
    batch: '/batch',
    data: '/data',
    users: '/users',
    settings: '/settings',
    repo: '',
    notifications: '/notifications',
    test: '/test',
    termsOfService: '/terms-of-service',
    privacyPolicy: '/privacy-policy',
};

export const PATH_USERS = {
    root: PATH_PAGE.users,

    list: path(PATH_PAGE.users, ''),
};

/********************************************************
 * BATCH
 ********************************************************/
export const PATH_BATCH = {
    root: PATH_PAGE.batch,
    view: (batch_id: string) => path(PATH_PAGE.batch, `/${batch_id}`),
    new: path(PATH_PAGE.batch, '/new'),
    list: path(PATH_PAGE.batch, ''),

    simulation: {
        run: (batchRunId: string, simulationRunId: string) =>
            path(PATH_PAGE.batch, `/${batchRunId}/${simulationRunId}`),

        // new: (username: string, projectName: string) => path(ROOTS_DASHBOARD, `/integration/${username}/${projectName}/simulation/new`),

        // view: (username: string, projectName: string, simulationId: string) =>
        //   path(PATH_PAGE.batch, `${batchRunId}/${simulationRunId}`),
    },
};

/********************************************************
 * DATA
 ********************************************************/
export const PATH_DATA = {
    root: PATH_PAGE.data,
    view: (prefix: string) => path(PATH_PAGE.data, `/${prefix}`),
};

/********************************************************
 * REPO
 ********************************************************/
export const PATH_REPO = {
    root: PATH_PAGE.repo,

    list: path(PATH_PAGE.repo, '/repos'),
    view: (repoName: string, branch: string = 'main') => branch == 'main' ? path(PATH_PAGE.repo, `/${repoName}`) : path(PATH_PAGE.repo, `/${repoName}/tree/${branch}`),

    blob: (repoName: string, branch: string, filePath: string) =>
        path(PATH_PAGE.repo, `/${repoName}/blob/${branch}/${filePath}`),
    tree: (repoName: string, branch: string, filePath: string) =>
        path(PATH_PAGE.repo, `/${repoName}/tree/${branch}/${filePath}`),

    overview: (repoName: string) => path(PATH_PAGE.repo, `/${repoName}/overview`),
    runs: (repoName: string) => path(PATH_PAGE.repo, `/${repoName}/runs`),
    batch: {
        view: (repoName: string, batch_id: string) => path(PATH_PAGE.repo, `/${repoName}/batch/${batch_id}`),
        run: (repoName: string, batch_id: string, simulationRunId: string) =>
            path(PATH_PAGE.repo, `/${repoName}/batch/${batch_id}/${simulationRunId}`),
        all: (repoName: string) => path(PATH_PAGE.repo, `/${repoName}/batch`),

        data: (repoName: string, simulation: string, batchName: string) => path(PATH_PAGE.repo, `/${repoName}/data/runs/${simulation}/${batchName}`),
        simData: (repoName: string, simulation: string, batchName: string, sid: string) => path(PATH_PAGE.repo, `/${repoName}/data/runs/${simulation}/${batchName}/${sid}`),
    },
    images: () => path(PATH_PAGE.repo, `/images`),
    image: (repoName: string, tag: string | undefined = undefined) => path(PATH_PAGE.repo, `/${repoName}/image` + (tag ? `?tag=${tag}` : '')),
    data: (repoName: string, prefix: string) => path(PATH_PAGE.repo, `/${repoName}/data/${prefix || ''}`),
    allData: () => path(PATH_PAGE.repo, `/data`),
    reports: (repoName: string) => path(PATH_PAGE.repo, `/${repoName}/reports`),

    // file: {
    //   view: (repoName: string, filePath: string) => path(PATH_PAGE.repo, `/${repoName}/${filePath}`),
    // },
};

export const PATH_SETTINGS = {
    root: path(PATH_PAGE.settings, ''),
    // settings: path(PATH_PAGE.settings, '/settings'),

    // new: path(PATH_PAGE.settings, '/new'),
    // list: path(PATH_PAGE.settings, '/list'),
    // cards: path(PATH_PAGE.settings, '/cards'),
    // profile: path(PATH_PAGE.settings, '/profile'),
    // account: path(PATH_PAGE.settings, '/account'),
    // edit: (name: string) => path(PATH_PAGE.settings, `/${name}/edit`),
    // demoEdit: path(PATH_PAGE.settings, `/reece-chung/edit`),
};

/********************************************************
 * DASHBOARD
 ********************************************************/
export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,

    integration: {
        root: path(ROOTS_DASHBOARD, '/integration'),
        list: path(ROOTS_DASHBOARD, '/integration/list'),

        // new: path(ROOTS_DASHBOARD, '/integration/new'),
        view: (username: string, projectName: string) =>
            path(ROOTS_DASHBOARD, `/integration/${username}/${projectName}`),
        edit: (username: string, projectName: string) =>
            path(ROOTS_DASHBOARD, `/integration/${username}/${projectName}/edit`),

        package: {
            // new: path(ROOTS_DASHBOARD, '/integration/new'),
            view: (username: string, projectName: string, packageName: string) =>
                path(ROOTS_DASHBOARD, `/integration/${username}/${projectName}/package/${packageName}`),
        },

        node: {
            // new: path(ROOTS_DASHBOARD, '/integration/new'),
            view: (username: string, projectName: string, packageName: string, nodeName: string) =>
                path(ROOTS_DASHBOARD, `/integration/${username}/${projectName}/package/${packageName}/${nodeName}`),
            edit: (username: string, projectName: string, packageName: string, nodeName: string) =>
                path(
                    ROOTS_DASHBOARD,
                    `/integration/${username}/${projectName}/package/${packageName}/${nodeName}/edit`
                ),
        },

        launch: {
            view: (username: string, projectName: string, launch_name: string) =>
                path(ROOTS_DASHBOARD, `/integration/${username}/${projectName}/launch/${launch_name}`),
        },

        parameterSetup: {
            new: (username: string, projectName: string) =>
                path(ROOTS_DASHBOARD, `/integration/${username}/${projectName}/parameterSetups/new`),

            view: (username: string, projectName: string, parameterSetupId: string) =>
                path(ROOTS_DASHBOARD, `/integration/${username}/${projectName}/parameterSetups/${parameterSetupId}`),
        },

        simulation: {
            batch: (username: string, projectName: string, simulationId: string, batchRunId: string) =>
                path(
                    ROOTS_DASHBOARD,
                    `/integration/${username}/${projectName}/simulation/${simulationId}/${batchRunId}`
                ),

            run: (
                username: string,
                projectName: string,
                simulationId: string,
                batchRunId: string,
                simulationRunId: string
            ) =>
                path(
                    ROOTS_DASHBOARD,
                    `/integration/${username}/${projectName}/simulation/${simulationId}/${batchRunId}/${simulationRunId}`
                ),

            new: (username: string, projectName: string) =>
                path(ROOTS_DASHBOARD, `/integration/${username}/${projectName}/simulation/new`),

            view: (username: string, projectName: string, simulationId: string) =>
                path(ROOTS_DASHBOARD, `/integration/${username}/${projectName}/simulation/${simulationId}`),
        },
    },
    simulations: {
        root: path(ROOTS_DASHBOARD, '/simulations'),
        list: path(ROOTS_DASHBOARD, '/simulations/list'),

        new: path(ROOTS_DASHBOARD, `/simulations/new`),
        view: (testName: string) => path(ROOTS_DASHBOARD, `/simulation/${testName}/`),

        // run: (testName: string, testRunId: string) => path(ROOTS_DASHBOARD, `/simulation/${testName}/${testRunId}/`),
        // simulation: (testName: string, testRunId: string, sid: string) => path(ROOTS_DASHBOARD, `/test/${testName}/${testRunId}/${sid}`),
    },
    analytics: {
        root: path(ROOTS_DASHBOARD, '/analytics'),
        list: path(ROOTS_DASHBOARD, '/analytics/list'),

        // view: (testName: string) => path(ROOTS_DASHBOARD, `/simulation/${testName}/`),

        // run: (testName: string, testRunId: string) => path(ROOTS_DASHBOARD, `/simulation/${testName}/${testRunId}/`),
        // simulation: (testName: string, testRunId: string, sid: string) => path(ROOTS_DASHBOARD, `/test/${testName}/${testRunId}/${sid}`),
    },
    test: {
        root: path(ROOTS_DASHBOARD, '/test'),
        list: path(ROOTS_DASHBOARD, '/test/list'),

        new: path(ROOTS_DASHBOARD, `/test/new`),
        view: (testName: string) => path(ROOTS_DASHBOARD, `/test/${testName}/`),

        run: (testName: string, testRunId: string) => path(ROOTS_DASHBOARD, `/test/${testName}/${testRunId}/`),
        simulation: (testName: string, testRunId: string, sid: string) =>
            path(ROOTS_DASHBOARD, `/test/${testName}/${testRunId}/${sid}`),
    },
    notebook: {
        new: path(ROOTS_DASHBOARD, `/notebook/new`),
        list: path(ROOTS_DASHBOARD, '/notebook/list'),
        root: path(ROOTS_DASHBOARD, '/notebook'),
        view: (notebook_id: string, bid: string = '', sid: string = '') => {
            let params: any = {};
            if (bid) {
                params.bid = bid;
            }
            if (sid) {
                params.sid = sid;
            }
            return path(ROOTS_DASHBOARD, `/notebook/${notebook_id}`, params);
        },

        duplicate: (notebook_id: string) => path(ROOTS_DASHBOARD, `/notebook/${notebook_id}?duplicate=true`),
    },

    repo: {
        root: path(ROOTS_DASHBOARD, '/repo'),
        list: path(ROOTS_DASHBOARD, '/repo/list'),
        view: (repoName: string) => path(ROOTS_DASHBOARD, `/repo/${repoName}`),

        file: {
            view: (repoName: string, filePath: string) => path(ROOTS_DASHBOARD, `/repo/${repoName}/${filePath}`),
        },
    },

    kanban: path(ROOTS_DASHBOARD, '/kanban'),
    calendar: path(ROOTS_DASHBOARD, '/calendar'),
    fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
    permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
    blank: path(ROOTS_DASHBOARD, '/blank'),

    general: {
        app: path(ROOTS_DASHBOARD, '/app'),
        ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
        analytics: path(ROOTS_DASHBOARD, '/analytics'),
        banking: path(ROOTS_DASHBOARD, '/banking'),
        booking: path(ROOTS_DASHBOARD, '/booking'),
        file: path(ROOTS_DASHBOARD, '/file'),
    },
    mail: {
        root: path(ROOTS_DASHBOARD, '/mail'),
        all: path(ROOTS_DASHBOARD, '/mail/all'),
    },
    chat: {
        root: path(ROOTS_DASHBOARD, '/chat'),
        new: path(ROOTS_DASHBOARD, '/chat/new'),
        view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
    },
    user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        new: path(ROOTS_DASHBOARD, '/user/new'),
        list: path(ROOTS_DASHBOARD, '/user/list'),
        cards: path(ROOTS_DASHBOARD, '/user/cards'),
        profile: path(ROOTS_DASHBOARD, '/user/profile'),
        account: path(ROOTS_DASHBOARD, '/user/account'),
        edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
        demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    },
    eCommerce: {
        root: path(ROOTS_DASHBOARD, '/e-commerce'),
        shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
        list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
        checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
        new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
        view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
        edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
        demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
        demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    },
    invoice: {
        root: path(ROOTS_DASHBOARD, '/invoice'),
        list: path(ROOTS_DASHBOARD, '/invoice/list'),
        new: path(ROOTS_DASHBOARD, '/invoice/new'),
        view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
        edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
        demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
        demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
    },
    blog: {
        root: path(ROOTS_DASHBOARD, '/blog'),
        posts: path(ROOTS_DASHBOARD, '/blog/posts'),
        new: path(ROOTS_DASHBOARD, '/blog/new'),
        view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
        demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    },
    adminUserList: {
        root: path(ROOTS_DASHBOARD, '/admin-user-settings'),
        list: path(ROOTS_DASHBOARD, '/admin-user-settings/list'),
    },
};

export const PATH_DOCS = {
    root: 'https://citros.io/doc/',
    changelog: 'https://citros.io/doc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';
