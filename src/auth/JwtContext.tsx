import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
// utils
//
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType, UserUpdateRequest } from './types';

import getAppoloClinet from '../utils/connectAppolo';
import {
    AUTHONTICATE_USER,
    GET_CURRENT_USER,
    REGISTER_ORGANIZATION_AND_USER,
    UPSERT_USER,
    VERIFY_USER,
    COMPLETE_USER_REGISTRATION,
} from '../graphQL/user';
import { useRouter } from 'next/router';
import { PATH_AUTH } from '../routes/paths';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
    INITIAL = 'INITIAL',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    VERIFY = 'VERIFY',
    LOGOUT = 'LOGOUT',
    COMPLETE_USER_REGISTRATION = 'COMPLETE_USER_REGISTRATION',
    UPSERT_USER = 'UPSERT_USER',
}

type Payload = {
    [Types.INITIAL]: {
        isAuthenticated: boolean;
        user: AuthUserType;
        accessToken: string | null;
    };
    [Types.LOGIN]: {
        user: AuthUserType;
        accessToken: string;
    };
    [Types.REGISTER]: {
        user: AuthUserType;
        accessToken: string;
    };
    [Types.COMPLETE_USER_REGISTRATION]: {
        user: AuthUserType;
    };
    [Types.UPSERT_USER]: {
        user: AuthUserType;
    };
    [Types.VERIFY]: {
        user: AuthUserType;
    };
    [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
    accessToken: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
    if (action.type === Types.INITIAL) {
        return {
            isInitialized: true,
            isAuthenticated: action.payload.isAuthenticated,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
        };
    }
    if (action.type === Types.LOGIN) {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
        };
    }
    if (action.type === Types.REGISTER) {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
        };
    }
    if (action.type === Types.VERIFY) {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
        };
    }
    if (action.type === Types.COMPLETE_USER_REGISTRATION) {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
        };
    }

    if (action.type === Types.UPSERT_USER) {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
        };
    }

    if (action.type === Types.LOGOUT) {
        return {
            ...state,
            isAuthenticated: false,
            user: null,
        };
    }
    return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { push } = useRouter();

    useEffect(() => {
        setCookie('logged_in', state.isAuthenticated);
    }, [state.isAuthenticated]);
    // INNIT
    const initialize = useCallback(async () => {
        try {
            const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);

                // const response = await axios.get('/api/users/me');
                // const { user } = response.data;

                const client = getAppoloClinet();

                const resp = await client.query({ query: GET_CURRENT_USER }); // add check
                try {
                    const result = await resp;
                    let user = { ...result.data.currentUser };
                    user.role = user.role.role;

                    if (!user.isActive) {
                        console.log('Error getting user');
                        localStorage.setItem('accessToken', '');
                        push(PATH_AUTH.login);
                    }
                    // console.log('initialize -> ', user);
                    
                    dispatch({
                        type: Types.INITIAL,
                        payload: {
                            isAuthenticated: true,
                            user: user,
                            accessToken,
                        },
                    });
                } catch (err) {
                    console.log('Error getting user', err);
                    return;
                }
            } else {
                dispatch({
                    type: Types.INITIAL,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                        accessToken,
                    },
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: Types.INITIAL,
                payload: {
                    isAuthenticated: false,
                    user: null,
                    accessToken: null,
                },
            });
        }
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);

    // LOGIN
    const login = async (email: string, password: string) => {
        // console.log("logging in...", email, password);
        // remove tocken from request
        setSession(null);
        const client = getAppoloClinet();
        let resp = await client.mutate({
            variables: { email: email, password: password },
            mutation: AUTHONTICATE_USER,
        });

        // try {
        const dataFromClient = await resp;
        let accessToken = dataFromClient.data.authenticate.jwt;
        // console.log(accessToken);
        // TODO: Add Error Handling
        if (!accessToken) {
            throw Error('Error, email or password is incorrect.');
        }
        const sessionsSuccedded = setSession(accessToken);
        if (!sessionsSuccedded) {
            throw Error('Error, email or password is incorrect.');
        }
        // } catch(err) {
        //   console.log("error accessToken", err);
        //   // return
        // }

        resp = await client.query({ query: GET_CURRENT_USER });
        try {
            const result = await resp;
            let user = { ...result.data.currentUser };
            user.role = user.role.role;
            console.log('login -> user: ', user);

            dispatch({
                type: Types.LOGIN,
                payload: {
                    user,
                    accessToken,
                },
            });
        } catch (err) {
            console.log('Error getting user', err);
            return;
        }
    };

    // REGISTER
    const register = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        organization: string,
        slug: string
    ) => {
        // throw MethodNotAllowedError;

        setSession(null);
        const client = getAppoloClinet();
        let registration_resp = await client.mutate({
            variables: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                organization: organization,
                slug: slug,
            },
            mutation: REGISTER_ORGANIZATION_AND_USER,
        });
        push({
            pathname: PATH_AUTH.thanksForRegistering,
            query: { email: email, time: 'soon' },
        });
    };

    // UPSERT_USER
    const registerUserByInvitation = async (email: string, organizationId: string) => {
        let user = {
            firstName: '',
            lastName: '',
            email: email,
            organizationId: organizationId,
        };
        const client = getAppoloClinet();
        let registration_resp = await client.mutate({
            variables: {
                user: { user },
            },
            mutation: UPSERT_USER,
        });
    };

    // VERIFY_USER_BY_INVITATION
    const verifyUserByInvitation = async (UserUpdateRequest: UserUpdateRequest) => {
        const { id, firstName, lastName, password } = UserUpdateRequest;
        const client = getAppoloClinet();
        let registration_resp = await client.mutate({
            variables: { userId: id, firstName: firstName, lastName: lastName, password: password },
            mutation: COMPLETE_USER_REGISTRATION,
        });
        push(PATH_AUTH.login);
    };

    // VERIFY
    const verify = async (id: string) => {
        setSession(null);
        const client = getAppoloClinet();
        try {
            let verification_resp = await client.mutate({
                variables: { userId: id },
                mutation: VERIFY_USER,
            });
            verification_resp ? push(PATH_AUTH.login) : console.log('Error verificating user, incorrect link');
        } catch (err) {
            console.log('Error verificating user', err);
            return;
        }
    };

    // LOGOUT
    const logout = async () => {
        setSession(null);
        dispatch({
            type: Types.LOGOUT,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                loginWithGoogle: () => {},
                loginWithGithub: () => {},
                loginWithTwitter: () => {},
                logout,
                register,
                registerUserByInvitation,
                verifyUserByInvitation,
                verify,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
