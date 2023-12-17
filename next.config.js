/* eslint-disable @typescript-eslint/no-var-requires */
const packageJSON = require('./package.json');
const jupyterTranspilePackages = Object.keys(packageJSON.dependencies).filter(
    (it) => it.includes('jupyter') || it.includes('@lumino')
);

const withTM = require('next-transpile-modules')([
    '@fullcalendar/common',
    '@fullcalendar/daygrid',
    '@fullcalendar/interaction',
    '@fullcalendar/list',
    '@fullcalendar/react',
    '@fullcalendar/timegrid',
    '@fullcalendar/timeline',
    ...jupyterTranspilePackages,
]);

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
    // trim off `<owner>/`
    const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');

    assetPrefix = `/${repo}/`;
    basePath = `/${repo}`;
}

module.exports = withTM({
    assetPrefix: assetPrefix,
    basePath: basePath,
    output: 'export',
    // output: 'standalone',
    swcMinify: false,
    trailingSlash: false,
    env: {
        //   // HOST
        //   // HOST_API_KEY: 'https://api-dev-minimal-v4.vercel.app',
        //   HOST_API_KEY: '',

        //   // JWT
        //   // JWT_SECRET: process.env.JWT_SECRET || 'asdhfgyuweg7oy3u23981230@#REfgsdlhgp',

        // JUPYTER NOTEBOOK
        NEXT_PUBLIC_CITROS_DOMAIN: process.env.CITROS_DOMAIN,
        NEXT_PUBLIC_JUPYTER_NOTEBOOK_API: process.env.JUPYTER_NOTEBOOK_API,
        NEXT_PUBLIC_JUPYTER_NOTEBOOK_WSS: process.env.JUPYTER_NOTEBOOK_WSS,

        // REDIS
        // REDIS_URI: process.env.REDIS_URI,

        //GraphQL entry point -- neets to be available client side
        NEXT_PUBLIC_CITROS_API_URL: process.env.CITROS_API_URL,
        NEXT_PUBLIC_CITROS_API_WS: process.env.CITROS_API_WS,
        NEXT_PUBLIC_CITROS_GITOLITE_API: process.env.CITROS_GITOLITE_API,
    },
    async rewrites() {
        return [
            // {
            //   source: '/jupyter/api/kernels/:path(.+)',
            //   destination: `${process.env.JUPYTER_NOTEBOOK_API}/api/kernels/:path`,
            // },
            // {
            //     source: '/git/api/:path*',
            //     destination: `http://${process.env.CITROS_GITOLITE_API}/:path*`, // Proxy to Backend
            // },
        ];
    },
    // async redirects() {
    //   return [
    //     { // TODO: Fix shoes page (;landing page)
    //       source: '/',
    //       destination: '/dashboard',
    //       permanent: true,
    //     }
    //   ]
    // },
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
});
