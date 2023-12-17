// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------
// console.log("process.env", process.env);
// const getEnvironmentVariable = (environmentVariable: string, default_value:string=''): string => {
//   const unvalidatedEnvironmentVariable = process.env[environmentVariable];
//   if (!unvalidatedEnvironmentVariable) {
//     if(default_value != ''){
//       return default_value;
//     }
//     throw new Error(
//       `Couldn't find environment variable: ${environmentVariable}`
//     );
//   } else {
//     return unvalidatedEnvironmentVariable;
//   }
// };

// export const config = {
//   CITROS_API_URL: getEnvironmentVariable("CITROS_API_URL")
// };

export const DEFAULT_BRANCH = 'main';

export const HOST_API_KEY = process.env.HOST_API_KEY || '';

export const FIREBASE_API = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    clientId: process.env.AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
    clientId: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
};

export const MAPBOX_API = process.env.MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

// JUPYTER SERVER
export const WORKER_CONFIG = {
    connectionString: 'postgresql://' +process.env.POSTGRES_USERNAME + ':' + process.env.POSTGRES_PASSWORD + '@' + process.env.POSTGRES_HOST + ':' + process.env.POSTGRES_PORT + '/' + process.env.POSTGRES_DATABASE
}
export const JUPYTER_CONFIG = {
    referrer: process.env.NEXT_PUBLIC_CITROS_DOMAIN,
    gatewayUrl: process.env.NEXT_PUBLIC_JUPYTER_NOTEBOOK_API,
    wssUrl: 'wss://' + process.env.NEXT_PUBLIC_CITROS_DOMAIN + process.env.NEXT_PUBLIC_JUPYTER_NOTEBOOK_WSS,
    kernelNamespace: 'kernel-ns',
};

export const CITROS_API_URL = process.env.NEXT_PUBLIC_CITROS_API_URL;
export const CITROS_GITOLITE_API = process.env.NEXT_PUBLIC_CITROS_GITOLITE_API;

// console.log('---------------config------------------');
// console.log('config CITROS_DOMAIN:', process.env.NEXT_PUBLIC_CITROS_DOMAIN);
// console.log('config JUPYTER_NOTEBOOK_API:', JUPYTER_CONFIG.gatewayUrl);
// console.log('config JUPYTER_NOTEBOOK_WSS:', JUPYTER_CONFIG.wssUrl);
// console.log('config CITROS_API_URL:', process.env.NEXT_PUBLIC_CITROS_API_URL);
// console.log('config CITROS_GITOLITE_API:', process.env.NEXT_PUBLIC_CITROS_GITOLITE_API);
// console.log('---------------------------------------');

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
    H_MOBILE: 55,
    H_CITROS: 55,
    H_MAIN_DESKTOP: 88,
    H_DASHBOARD_DESKTOP: 92,
    H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
    W_BASE: 260,
    W_DASHBOARD: 380,
    W_DASHBOARD_MINI: 88,
    //
    H_DASHBOARD_ITEM: 48,
    H_DASHBOARD_ITEM_SUB: 36,
    //
    H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
    NAV_ITEM: 24,
    NAV_ITEM_HORIZONTAL: 22,
    NAV_ITEM_MINI: 22,
};
