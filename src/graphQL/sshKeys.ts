import { gql } from '@apollo/client';

export const GET_SSH_KEYS = gql`
    query getSSHKeys {
        sshKeysList {
            id
            key
            title
        }
    }
`;

export const CREATE_SSH_KEY = gql`
    mutation createSSHKey($key: String!, $title: String!, $userId: UUID!) {
        createSshKey(input: { sshKey: { key: $key, title: $title, userId: $userId } }) {
            sshKey {
                id
            }
        }
    }
`;

export const DELETE_SSH_KEY = gql`
    mutation deleteSSHKeyByUserAndTitle($userId: UUID!, $title: String!) {
        deleteSshKeyByUserIdAndTitle(input: { userId: $userId, title: $title }) {
            sshKey {
                title
            }
        }
    }
`;
