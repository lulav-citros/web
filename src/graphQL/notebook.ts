import { gql } from '@apollo/client';

export const GET_NOTEBOOKS = gql`
    query getNotebooks {
        notebooksList {
            id
            user {
                id
                username
                organization {
                    id
                    name
                    logo
                }
            }
            project {
                id
                name
                user {
                    id
                    username
                }
            }

            name
            description
            content
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_NOTEBOOK_BY_ID = gql`
    mutation DeleteNotebookById($nbid: UUID!) {
        deleteNotebook(input: { id: $nbid }) {
            clientMutationId
            deletedNotebookNodeId
        }
    }
`;

export const GET_NOTEBOOK = gql`
    query getNotebook($id: UUID = "00000000-0000-0000-0000-000000000000") {
        notebooksList(filter: { id: { equalTo: $id } }) {
            id
            userId
            user {
                id
                username
            }
            projectId

            name
            description
            content
            createdAt
            updatedAt
        }
    }
`;

// {
//   "id": "ef0a56e1-a246-4ae8-9732-11693da60458"
// }

export const UPSERT_NOTEBOOK = gql`
    mutation upsert_notebook($param: UpsertNotebookInput!) {
        upsertNotebook(input: $param) {
            notebook {
                id
                userId
                projectId

                name
                description
                content
                createdAt
                updatedAt
            }
        }
    }
`;

// {
//   "param": {
//     "notebook": {
//   		"name": "second notebook",
// 			"description": "descroiption"
//   	}
//   }
// }
