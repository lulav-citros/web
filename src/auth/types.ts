import { UserCredential } from 'firebase/auth';

// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

export interface AuthUser {
    id: string;
    email: string;
    organization?: {
        type: string;
    };
}

export type AuthUserType = null | any;

export type AuthStateType = {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUserType;
    accessToken: string | null;
};

export interface UserDto {
    email: string;
    organizationId: string;
    id: string;
    firstName: string;
    lastName: string;
    password: string;
}

export type UserUpdateRequest = Partial<UserDto>;

// ----------------------------------------------------------------------

export type JWTContextType = {
    method: 'jwt';
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUserType;
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        organization: string,
        slug: string
    ) => Promise<void>;
    verify: (id: string) => Promise<void>;
    registerUserByInvitation: (email: string, organizationId: string) => Promise<void>;
    verifyUserByInvitation: (UserUpdateRequest: UserUpdateRequest) => Promise<void>;
    logout: () => Promise<void>;
    loginWithGoogle?: () => void;
    loginWithGithub?: () => void;
    loginWithTwitter?: () => void;
};

export type FirebaseContextType = {
    method: 'firebase';
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUserType;
    login: (email: string, password: string) => Promise<UserCredential>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    logout: () => Promise<void>;
    loginWithGoogle?: () => Promise<UserCredential>;
    loginWithGithub?: () => Promise<UserCredential>;
    loginWithTwitter?: () => Promise<UserCredential>;
};

export type AWSCognitoContextType = {
    method: 'cognito';
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUserType;
    login: (email: string, password: string) => Promise<unknown>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<unknown>;
    logout: VoidFunction;
    loginWithGoogle?: () => void;
    loginWithGithub?: () => void;
    loginWithTwitter?: () => void;
};

export type Auth0ContextType = {
    method: 'auth0';
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUserType;
    // login: () => Promise<void>;
    logout: VoidFunction;
    // To avoid conflicts between types this is just a temporary declaration.
    // Remove below when you choose to authenticate with Auth0.
    login: (email?: string, password?: string) => Promise<void>;
    register?: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    loginWithGoogle?: () => void;
    loginWithGithub?: () => void;
    loginWithTwitter?: () => void;
};
