// next
// routes
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';
// import { AuthUserPayload } from '../pages/api/auth/_auth';

// ----------------------------------------------------------------------

// export async function getAuthUserApi(req: NextApiRequest) {
//   const authorization = req.headers['authorization'];
//   const jwt_token = authorization?.split(' ')[1];

//   if (!jwt_token) {
//     return null;
//   }

//   return extractJwtPayload(jwt_token);
// }

// server side
// export async function extractJwtPayload(jwt_token: string): Promise<AuthUserPayload | null> {
//   const KEY: string = process.env.JWT_SECRET!;

//   console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);

//   let role: string;
//   let user: JWTPayload;
//   try {
//     const { payload } = await jwtVerify(jwt_token!, new TextEncoder().encode(KEY));
//     user = payload;
//     role = user.role as string;

//     return {
//       id: user.id as string,
//       email: user.email as string,
//       username: user.username as string,
//       permissions: user.permissions as string[],
//       role,
//     };
//   } catch (error) {
//     console.error('!!!!! Unable to parse JWT', error);
//     return null;
//   }
// }
// client side
export const jwtDecode = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
};

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode(accessToken);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer;

    const currentTime = Date.now();

    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(() => {
        alert('Token expired');

        localStorage.removeItem('accessToken');

        window.location.href = PATH_AUTH.login;
    }, timeLeft);
};

// ----------------------------------------------------------------------
export const clearSession = () => {
    localStorage.removeItem('accessToken');

    delete axios.defaults.headers.common.Authorization;
};

export const setSession = (accessToken: string | null): boolean => {
    if (!accessToken) {
        clearSession();
        return false;
    }

    let dataFromJWT = jwtDecode(accessToken);
    // if the user failed to authenticate the server returns role citros_anonymous.
    if (dataFromJWT.role == 'citros_anonymous') {
        // console.log("citros_anonymous")
        clearSession();
        return false;
    }

    localStorage.setItem('accessToken', accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    // const { exp } = dataFromJWT; // ~3 days by minimals server
    tokenExpired(dataFromJWT.exp);
    return true;
};

export function getLocalStorageAccessToken(): string | null {
    return localStorage.getItem('accessToken');
}
