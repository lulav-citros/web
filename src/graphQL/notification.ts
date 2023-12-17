import { gql } from '@apollo/client';

export const MARK_ALL_AS_READ = gql`
    mutation readAllNotifications {
        readAllNotifications(input: {}) {
            clientMutationId
        }
    }
`;

export const MARK_AS_READ = gql`
    mutation markAsRead($nid: UUID!) {
        updateNotification(input: { id: $nid, patch: { isUnRead: false } }) {
            clientMutationId
        }
    }
`;

export const GET_NOTIFICATIONS = gql`
    query GetNotifications {
        notificationsList(orderBy: CREATED_AT_DESC, first: 5) {
            id
            userId
            title
            description
            avatar
            type
            url
            isUnRead
            updatedAt
            createdAt
        }

        totalUnreadNotificationCount: notifications(condition: { isUnRead: true }) {
            totalCount
        }

        totalNotificationCount: notifications {
            totalCount
        }
    }
`;

export const GET_NOTIFICATIONS_ALL = gql`
    query GetNotifications {
        notificationsList(orderBy: CREATED_AT_DESC) {
            id
            userId
            title
            description
            avatar
            type
            url
            isUnRead
            updatedAt
            createdAt
        }

        totalUnreadNotificationCount: notifications(condition: { isUnRead: true }) {
            totalCount
        }

        totalNotificationCount: notifications {
            totalCount
        }
    }
`;

export const GET_NOTIFICATIONS_USER = gql`
    query GetNotifications($user_id: UUID!) {
        user(id: $user_id) {
            notificationsList {
                id
                title
                description
                avatar
                type
                url
                isUnRead
                updatedAt
                createdAt
            }
        }
    }
`;
