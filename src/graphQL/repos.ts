import { gql } from '@apollo/client';

export const GET_REPOS = gql`
    query GetRepos {
        reposList (condition: {isActive: true}){
            id
            user {
                id
                email
            }
            organization {
                id
                name
                logo
            }
            cover
            name
            isActive
            description
            git
            createdAt
            branch
            origin

            batchRunsCount: batchRuns {
                totalCount
            }
            batchRunsCountDone: batchRuns(condition: { status: DONE }) {
                totalCount
            }
        }
    }
`;

export const GET_PEPO = gql`
    query GetProject($username: String!, $name: String!) {
        usersList(condition: { username: $username }) {
            projectsList(condition: { name: $name }) {
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
                cover
                name
                isActive
                description
                git
                path
                readme
                license
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_ALL_BATCH_RUNS = gql`
query getBatchRuns ($first: Int, $offset: Int, $filter: String){
    batchRuns(first: $first, offset: $offset, filter: {name: {includes: $filter}}, orderBy: CREATED_AT_DESC) {
      totalCount
      edges {
        node {
          id
          name
          message
  
          simulation
  
          completions
          parallelism
  
          image
          tag
          
          citrosCommit
          citrosBranch
          userCommit
          userBranch
          cpu
          gpu
  
          memory
          metadata
          storageType
  
          user {
              id
              firstName
              lastName
              email
          }
  
          organization {
              id
              name
              slug
          }
  
          repo {
              name
          }
  
          status
          simulationRunsCountDone: simulationRuns(condition: { status: DONE }) {
              totalCount
          }
          simulationRunsCount: simulationRuns {
              totalCount
          }
          createdAt
          updatedAt
  
          dataLastAccess
          dataStatus
        }
      }
    }
  }  
`;
export const GET_BATCH_RUN = gql`
    query getBatchRun($batchRunId: UUID!) {
        batchRunsList(condition: { id: $batchRunId }) {
            id
            name
            message
            simulation
            completions
            parallelism
            image
            citrosCommit
            citrosBranch
            cpu
            gpu
            memory
            metadata
            storageType
            user {
                id
                firstName
                lastName
                email
            }
            organization {
                id
                name
                slug
            }
            repo {
                name
            }
            status
            simulationRunsCountDone: simulationRuns(condition: { status: DONE }) {
                totalCount
            }
            simulationRunsCount: simulationRuns {
                totalCount
            }
            createdAt
            updatedAt

            dataLastAccess
            dataStatus
        }
    }
`;

// export const GET_BATCH_RUNS = gql`
// query getBatchRuns ($first: Int, $offset: Int, $filter: String){
//     batchRuns(first: $first, offset: $offset, filter: {name: {includes: $filter}}, orderBy: CREATED_AT_DESC) {
//       totalCount
//       edges {
//         node {
//           id
//           name
//           message
  
//           simulation
  
//           completions
//           parallelism
  
//           image
//           citrosCommit
//           citrosBranch
//           cpu
//           gpu
  
//           memory
//           metadata
//           storageType
  
//           user {
//               id
//               firstName
//               lastName
//               email
//           }
  
//           organization {
//               id
//               name
//               slug
//           }
  
//           repo {
//               name
//           }
  
//           status
//           simulationRunsCountDone: simulationRuns(condition: { status: DONE }) {
//               totalCount
//           }
//           simulationRunsCount: simulationRuns {
//               totalCount
//           }
//           createdAt
//           updatedAt
  
//           dataLastAccess
//           dataStatus
//         }
//       }
//     }
//   }  
// `;
export const GET_BATCH_RUNS = gql`
query getBatchRuns($repoName: String, $first: Int, $offset: Int, $filter: String) {
    reposList(condition: {name: $repoName}){
      batchRuns(
        first: $first
        offset: $offset
        filter: {name: {includes: $filter}}
        orderBy: CREATED_AT_DESC
      ) {
        totalCount
        edges {
          node {
            id
            name
            message
            simulation
            completions
            parallelism
            image
            tag
            citrosCommit
            citrosBranch
            userCommit
            userBranch
            cpu
            gpu
            memory
            metadata
            storageType
            user {
              id
              firstName
              lastName
              email
            }
            organization {
              id
              name
              slug
            }
            repo {
              name
            }
            status
            simulationRunsCountDone: simulationRuns(condition: {status: DONE}) {
              totalCount
            }
            simulationRunsCount: simulationRuns {
              totalCount
            }
            createdAt
            updatedAt
            dataLastAccess
            dataStatus
          }
        }
      }
    }
  }  
`;
// values = { "projectName": "project name"}

export const GET_SIMULATION_RUNS = gql`
    query getbatchRunWithSimulations($batchRunId: UUID!) {
        batchRunsList(filter: { id: { equalTo: $batchRunId } }) {
            id
            name
            message
            simulation
            completions
            parallelism
            image
            tag
            citrosCommit
            citrosBranch
            userCommit
            userBranch
            cpu
            gpu
            memory
            metadata
            storageType

            dataLastAccess
            dataStatus

            user {
                id
                firstName
                lastName
                email
            }
            organization {
                id
                name
                slug
            }
            repo {
                name
            }
            status
            simulationRunsCountDone: simulationRuns(condition: { status: DONE }) {
                totalCount
            }
            simulationRunsCount: simulationRuns {
                totalCount
            }
            createdAt
            updatedAt
            simulationRunsList(orderBy: SID_ASC) {
                id: sid
                message
                status
                metadata
                createdAt: created
                updatedAt
            }
        }
    }
`;
// values = { "projectName": "project name"}

export const GET_SIMULATION_RUN_LOGS = gql`
    query getSimulationEventsAndLogs($batchRunId: UUID!, $sid: Int!) {
        getSimulationLogsList(arg0: $batchRunId, arg1: $sid) {
            timestamp
            userId
            organizationId
            batchRunId
            sid
            podName
            containerName
            log
        }
    }
`;

export const GET_SIMULATION_RUN_EVENTS = gql`
    query getSimulationTraces($batchRunId: UUID!, $sid: Int!) {
        getSimulationTracesList(arg0: $batchRunId, arg1: $sid) {
            id
            timestamp
            userId
            organizationId
            batchRunId
            sid
            span
        }
    }
`;

// export const GET_SIMULATION_RUN_EVENTS = gql`
// query getSimulationEventsAndLogs($batchRunId: UUID!, $sid: String!) {
//   simulationRunsList(condition: {sid: $sid, batchRunId: $batchRunId}) {
//     status
//     createdAt
//     updatedAt
//     metadata

//     simulationEventsByBatchRunIdAndSidList(
//       condition: {sid: $sid, batchRunId: $batchRunId}
//       orderBy: CREATED_AT_DESC
//     ) {
//       id
//       event
//       tag
//       message
//       metadata
//       created
//       createdAt

//     }
//   }
// }
// `;
