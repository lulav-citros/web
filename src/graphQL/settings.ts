import { gql } from '@apollo/client';

export const GET_USER_SETTINGS = gql`
    query getUserSettings($organizationId: UUID!, $userId: UUID!) {
        getUserSettingsList(organizationId: $organizationId, userId: $userId) {
            key
            value
        }
    }
`;
export const UPSERT_USER_SETTINGS = gql`
    mutation upsertUserSettings($key: String!, $value: String!, $organizationId: UUID!, $userId: UUID) {
        upsertUserSettings(input: { key: $key, value: $value, organizationId: $organizationId, userId: $userId }) {
            string
        }
    }
`;

// export const UPSERT_SETTING = gql`
//     mutation upsertSetting($organizationId: UUID, $userId: UUID, $key: String, $setting: UpsertSettingInput!) {
//         upsertSetting(
//         input: $setting
//         where: {organizationId: $organizationId, userId: $userId, key: $key}
//         ) {
//         setting {
//             id
//             key
//             value
//         }
//         }
//     }
// `;
