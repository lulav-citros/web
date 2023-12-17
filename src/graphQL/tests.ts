import { gql } from '@apollo/client';

export const GET_TESTS = gql`
    query GetTests {
        testsList {
            id
            createdAt
            description
            isActive
            name
            completions
            parallelism
            ttl
            simulationId
            updatedAt
            userId
            testRunsCount: testRuns {
                totalCount
            }
            testRunsCountDone: testRuns(condition: { status: DONE }) {
                totalCount
            }
            simulation {
                project {
                    name
                    id
                }
            }
        }
    }
`;

export const GET_TEST_RUN = gql`
    query getTestRun($id: UUID!) {
        testRun(id: $id) {
            id
            createdAt
            metadata
            status
            testId
            trigger
            updatedAt
            simulationRunsList {
                id: sid
                status
                message
                createdAt
                updatedAt
            }
        }
    }
`;
// export const GET_TEST_RUN = gql`
// query getTestRun($id: UUID!) {
//   testRun(id: $id) {
//     id
//     createdAt
//     metadata
//     status
//     testId
//     trigger
//     updatedAt
//     simulationRunsList {
//       id
//       sid
//       status
//       createdAt
//       updatedAt
//       simulationEventsByTestRunIdAndSidList(orderBy: PRIMARY_KEY_DESC, first: 10) {
//         id
//         testRunId
//         sid
//         event
//         message
//         metadata
//       }
//     }
//   }
// }
// `;

export const GET_TEST_RUNS = gql`
    query getTestRuns($name: String!) {
        testsList(condition: { name: $name }) {
            testRunsList(orderBy: CREATED_AT_DESC) {
                id
                createdAt
                updatedAt
                metadata
                status
                testId
                trigger
                simulationRunsCountDone: simulationRuns(condition: { status: DONE }) {
                    totalCount
                }
                simulationRunsCount: simulationRuns {
                    totalCount
                }
            }
        }
    }
`;

export const TRIGGER_TEST = gql`
    mutation trigger($trigger: TriggerTestByNameInput!) {
        triggerTestByName(input: $trigger) {
            test {
                id
            }
        }
    }
`;

// export const GET_TEST = gql`
// query GetTests {
// tests {
//     nodes {
//         id
//         createdAt
//         description
//         isActive
//         name
//         completions
//         simulationId
//         updatedAt
//         userId
//         }
//     }
// }
// `;

export const GET_TEST_BY_NAME = gql`
    query GetTests($name: String!) {
        tests(condition: { name: $name }) {
            nodes {
                id
                createdAt
                description
                isActive
                name
                completions
                parallelism
                ttl
                simulationId
                updatedAt
                userId
            }
        }
    }
`;

export const UPSERT_TEST = gql`
    mutation upsertTest($test: UpsertTestInput!) {
        upsertTest(input: $test) {
            test {
                id
                createdAt
                description
                isActive
                name
                completions
                parallelism
                ttl
                simulationId
                updatedAt
                userId
            }
        }
    }
`;

export const GET_SIMULATION_BY_ID = gql`
    query getSimulationById($id: UUID!) {
        simulation(id: $id) {
            id
            createdAt
            launchId
            parameterSetupId
            timeout
            updatedAt
            userId
            projectId
        }
    }
`;

export const GET_SIMULATION_EVENTS_LOGS_EVENTS = gql`
    query getSimulationEventsAndLogs($testRunId: UUID!, $sid: String!) {
        simulationRunsList(condition: { sid: $sid, testRunId: $testRunId }) {
            status
            createdAt
            updatedAt
            metadata

            logsByTestRunIdAndSidList(orderBy: CREATED_DESC) {
                id
                logLevel
                message
                created
                createdAt
            }
            simulationEventsByTestRunIdAndSidList(
                condition: { sid: $sid, testRunId: $testRunId }
                orderBy: CREATED_DESC
            ) {
                id
                event
                tag
                message
                metadata
                created
                createdAt
            }
        }
    }
`;
