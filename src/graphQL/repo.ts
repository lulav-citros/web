import { gql } from '@apollo/client';

export const GET_REPOS = gql`
    query getRepos {
        reposList {
            id
            name
            branch
        }
    }
`;
