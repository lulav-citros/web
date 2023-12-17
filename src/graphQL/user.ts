import { gql } from '@apollo/client';

export const AUTHONTICATE_USER = gql`
    mutation AuthenticateUser($email: Emailtype!, $password: String!) {
        authenticate(input: { email: $email, password: $password }) {
            jwt
        }
    }
`;

export const REGISTER_ORGANIZATION_AND_USER = gql`
    mutation registerOrgainzationAndUser(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
        $organization: String!
        $slug: String!
    ) {
        registerOrganizationAndUser(
            input: {
                organizationName: $organization
                slug: $slug
                firstName: $firstName
                lastName: $lastName
                email: $email
                password: $password
            }
        ) {
            user {
                id
                email
            }
        }
    }
`;

export const VERIFY_USER = gql`
    mutation verifyUser($userId: String!) {
        verifyUser(input: { userId: $userId }) {
            boolean
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query getCurrentUser {
        currentUser {
            id
            firstName
            lastName
            email
            emailVerified
            photo
            phone
            country
            address
            state
            city
            zip
            about
            isActive
            role {
                id
                role
            }
            createdAt
            updatedAt
            organization {
                id
                name
                logo
                slug
                hostingType
                type
                isActive
            }
        }
    }
`;

export const GET_ORGANIZATION_USERS = gql`
    query getUsers($organizationId: UUID!) {
        usersList(condition: { organizationId: $organizationId }) {
            id
            firstName
            lastName
            email
            organizationId
            isActive
            role {
                id
                role
            }
            createdAt
            updatedAt
        }
    }
`;

export const UPSERT_USER = gql`
    mutation upsertUser($id: UUID, $user: UpsertUserInput!) {
        upsertUser(where: { id: $id }, input: $user) {
            user {
                id
                email
            }
        }
    }
`;

export const COMPLETE_USER_REGISTRATION = gql`
    mutation completeUserRegistration($userId: String!, $firstName: String!, $lastName: String!, $password: String!) {
        completeUserRegistration(
            input: { userId: $userId, firstName: $firstName, lastName: $lastName, password: $password }
        ) {
            boolean
        }
    }
`;

export const CHANGE_USER_PASSWORD = gql`
    mutation changePassword($userId: UUID!, $oldPassword: String!, $newPassword: String!) {
        changePassword(input: { userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword }) {
            boolean
        }
    }
`;
