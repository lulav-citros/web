import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
    query GetProjects {
        projectsList {
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
            simulationsList {
                id
                batchRunsCount: batchRuns {
                    totalCount
                }
                batchRunsCountDone: batchRuns(condition: { status: DONE }) {
                    totalCount
                }
            }
        }
    }
`;

export const GET_PROJECT = gql`
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

export const GET_PACKAGES_NODES = gql`
    query getPackagesNodes($username: String!, $projectName: String!) {
        usersList(condition: { username: $username }) {
            projectsList(condition: { name: $projectName }) {
                rosPackagesList {
                    cover
                    createdAt
                    updatedAt
                    description
                    git
                    id
                    license
                    maintainer
                    maintainerEmail
                    name
                    path
                    projectId
                    readme
                    rosNodesByPackageIdList {
                        createdAt
                        entryPoint
                        id
                        name
                        nodeId
                        packageId
                        path
                        updatedAt
                    }
                }
            }
        }
    }
`;

export const GET_NODE = gql`
    query GetNode($projectName: String!, $packageName: String!, $nodeName: String!) {
        projectsList(condition: { name: $projectName }) {
            rosPackagesList(condition: { name: $packageName }) {
                rosNodesByPackageIdList(condition: { name: $nodeName }) {
                    createdAt
                    entryPoint
                    id
                    name
                    packageId
                    path
                    updatedAt
                }
            }
        }
    }
`;

export const GET_NODE_PARAMS = gql`
    query GetNode($projectName: String!, $packageName: String!, $nodeName: String!) {
        projectsList(condition: { name: $projectName }) {
            rosPackagesList(condition: { name: $packageName }) {
                rosNodesByPackageIdList(condition: { name: $nodeName }) {
                    createdAt
                    entryPoint
                    id
                    name
                    packageId
                    path
                    updatedAt
                    rosNodeParametersList {
                        createdAt
                        description
                        id
                        name
                        parameterType
                        rosNodeId
                        updatedAt
                        value
                    }
                }
            }
        }
    }
`;

export const UPSERT_NODE_PARAMETER = gql`
    mutation upsertRosNodeParameter($id: UUID, $param: UpsertRosNodeParameterInput!) {
        upsertRosNodeParameter(where: { id: $id }, input: $param) {
            rosNodeParameter {
                createdAt
                description
                id
                name
                parameterType
                rosNodeId
                updatedAt
                value
            }
        }
    }
`;
// variable = {
//   "id": "UUID",
//   "param":{
//     "rosNodeParameter":{
//       "name": "vova2",
//       "rosNodeId": "b861197e-65ea-4f46-85b8-5026ac4861fc",
//       "value": "1"
//     }
// 	}
// }

export const UPDATE_NODE_PARAMETER = gql`
    mutation updateRosNodeParameter($rosParameter: UpdateRosNodeParameterInput!) {
        updateRosNodeParameter(input: $rosParameter) {
            rosNodeParameter {
                createdAt
                description
                id
                name
                parameterType
                rosNodeId
                updatedAt
                value
            }
        }
    }
`;

export const GET_LAUNCH_LIST = gql`
    query getLaunches($username: String!, $projectName: String) {
        usersList(condition: { username: $username }) {
            projectsList(condition: { name: $projectName }) {
                id
                name
                rosPackagesList {
                    id
                    name
                    launchesByPackageIdList {
                        name
                        createdAt
                        description
                        id
                        path
                        updatedAt
                    }
                }
            }
        }
    }
`;
// variable = {
//   "projectName": "projectName"
// }

export const GET_LAUNCH = gql`
    query getLaunchById($id: UUID!) {
        launch(id: $id) {
            createdAt
            description
            id
            name
            packageId
            path
            updatedAt
        }
    }
`;
// variable = {
//   "id": "uuid"
// }

export const UPDATE_LAUNCH = gql`
    mutation updateLaunch($launch: UpdateLaunchInput!) {
        updateLaunch(input: $launch) {
            launch {
                id
                createdAt
                description
                name
                packageId
                updatedAt
                path
            }
        }
    }
`;
// variable:
// {
//   "launch":{
//     "id": "538bd43a-4cd8-4028-9125-7096671f909f",
//     "patch":{
//         "description": "asdasd",
//         "id": "538bd43a-4cd8-4028-9125-7096671f909f"
//   	}
//   }
// }

export const GET_SIMULATION = gql`
    query getSimulationById($id: UUID! = "00000000-0000-0000-0000-000000000000") {
        simulation(id: $id) {
            id
            name
            description
            createdAt
            launchId
            projectId
            timeout
            gpu
            cpu
            memory
            updatedAt
            userId
            parameterSetupId
        }
    }
`;
// variable = {
//   "id": "uuid"
// }

export const GET_SIMULATIONS = gql`
    query getSimulations($username: String!, $projectName: String!) {
        usersList(filter: { username: { equalTo: $username } }) {
            projectsList(filter: { name: { equalTo: $projectName } }) {
                simulationsList {
                    id
                    name
                    timeout
                    description
                    createdAt
                    updatedAt
                    batchRunsCount: batchRuns {
                        totalCount
                    }
                    batchRunsCountDone: batchRuns(condition: { status: DONE }) {
                        totalCount
                    }
                }
            }
        }
    }
`;
// values = { "projectName": "project name"}

export const GET_ALL_BATCH_RUNS = gql`
    query getBatchRuns {
        batchRunsList(orderBy: CREATED_AT_DESC) {
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
        }
    }
`;

export const GET_BATCH_RUNS = gql`
    query getSimulationsFromProjectSimulation($username: String!, $projectName: String!, $simulationId: UUID!) {
        usersList(filter: { username: { equalTo: $username } }) {
            projectsList(filter: { name: { equalTo: $projectName } }) {
                id
                name
                user {
                    id
                    username
                    organization {
                        id
                        name
                        logo
                    }
                }
                simulationsList(filter: { id: { equalTo: $simulationId } }) {
                    id
                    name
                    batchRunsList(orderBy: CREATED_AT_DESC) {
                        id
                        createdAt
                        updatedAt
                        isManual
                        trigger
                        completions
                        parallelism
                        simulationId
                        status
                        simulationRunsCountDone: simulationRuns(condition: { status: DONE }) {
                            totalCount
                        }
                        simulationRunsCount: simulationRuns {
                            totalCount
                        }
                    }
                }
            }
        }
    }
`;
// values = { "projectName": "project name"}

export const GET_SIMULATION_RUNS = gql`
    query getSimulationsFromProjectSimulation(
        $username: String!
        $projectName: String!
        $simulationId: UUID!
        $batchRunId: UUID!
    ) {
        usersList(filter: { username: { equalTo: $username } }) {
            projectsList(filter: { name: { equalTo: $projectName } }) {
                id
                simulationsList(filter: { id: { equalTo: $simulationId } }) {
                    id
                    batchRunsList(filter: { id: { equalTo: $batchRunId } }) {
                        id
                        simulationRunsList {
                            id: sid
                            message
                            status
                            metadata
                            createdAt: created
                            updatedAt
                        }
                    }
                }
            }
        }
    }
`;
// values = { "projectName": "project name"}

export const GET_SIMULATION_RUN_LOGS = gql`
    query getSimulationEventsAndLogs($batchRunId: UUID!, $sid: String!) {
        simulationRunsList(condition: { sid: $sid, batchRunId: $batchRunId }) {
            status
            createdAt
            updatedAt
            metadata
            logsByBatchRunIdAndSidList(orderBy: CREATED_DESC) {
                id
                logLevel
                message
                created
                excInfo
                fileName
                functionName
                lineNumber
                logLevelNumber
                loggerName
                pathName
            }
        }
    }
`;

export const GET_SIMULATION_RUN_EVENTS = gql`
    query getSimulationEventsAndLogs($batchRunId: UUID!, $sid: String!) {
        simulationRunsList(condition: { sid: $sid, batchRunId: $batchRunId }) {
            status
            createdAt
            updatedAt
            metadata

            simulationEventsByBatchRunIdAndSidList(
                condition: { sid: $sid, batchRunId: $batchRunId }
                orderBy: SEQ_DESC
            ) {
                id
                event
                tag
                message
                metadata
                created
                createdAt
                seq
            }
        }
    }
`;

export const GET_PARAMETER_SETUPS = gql`
    query getParameterSetup($username: String!, $projectName: String) {
        usersList(condition: { username: $username }) {
            projectsList(filter: { name: { equalTo: $projectName } }) {
                id
                name
                parameterSetupsList {
                    id
                    name
                    description
                    createdAt
                    updatedAt
                }
            }
        }
    }
`;

export const GET_PARAMETER_SETUP = gql`
    query getIniFileById(
        $id: UUID! = "00000000-0000-0000-0000-000000000000"
        $username: String!
        $projectName: String!
    ) {
        parameterSetup(id: $id) {
            id
            name
            description
        }
        usersList(condition: { username: $username }) {
            projectsList(filter: { name: { equalTo: $projectName } }) {
                id
                name
                user {
                    id
                    username
                    organization {
                        id
                        name
                        logo
                    }
                }
            }
        }
    }
`;
// variable = {
//   "id": "uuid"
// }

export const UPSERT_PARAMETER_SETUP = gql`
    mutation upsertParameterSetup($id: UUID, $param: UpsertParameterSetupInput!) {
        upsertParameterSetup(where: { id: $id }, input: $param) {
            parameterSetup {
                id
                createdAt
                description
                name
                projectId
                updatedAt
            }
        }
    }
`;
// variable = {
//   "id": "UUID",
//   "param":{
//     "rosNodeParameter":{
//       "name": "vova2",
//       "rosNodeId": "b861197e-65ea-4f46-85b8-5026ac4861fc",
//       "value": "1"
//     }
// 	}
// }

export const GET_PARAMAETERS_SETTINGS = gql`
    query getParams($username: String!, $projectName: String!, $parameterSetupId: UUID!) {
        usersList(condition: { username: $username }) {
            projectsList(condition: { name: $projectName }) {
                id
                name
                rosPackagesList {
                    id
                    name
                    rosNodesByPackageIdList {
                        id
                        name
                        rosNodeParametersList {
                            createdAt
                            description
                            id
                            name
                            parameterType
                            rosNodeId
                            updatedAt
                            value
                            parameterSettingsByNodeParameterIdList(condition: { parameterSetupId: $parameterSetupId }) {
                                id
                                parameterSetupId
                                nodeParameterId
                                distType
                                param1Type
                                param1
                                param2Type
                                param2
                                createdAt
                                updatedAt
                            }
                        }
                    }
                }
            }
        }
    }
`;
// {
//   "name": "best_project"
// }

export const UPSERT_PARAMETER_SETTING = gql`
    mutation upsertParameterSetup($parameterSetting: UpsertParameterSettingInput!) {
        upsertParameterSetting(input: $parameterSetting) {
            parameterSetting {
                id
            }
        }
    }
`;
// variable = {
//   "id": "UUID",
//   "param":{
//     "rosNodeParameter":{
//       "name": "vova2",
//       "rosNodeId": "b861197e-65ea-4f46-85b8-5026ac4861fc",
//       "value": "1"
//     }
// 	}
// }

export const UPSERT_PARAMETER = gql`
    mutation upsertNodeParam($nodeParam: UpsertRosNodeParameterInput!) {
        upsertRosNodeParameter(input: $nodeParam) {
            rosNodeParameter {
                id
            }
        }
    }
`;
// {
//   "nodeParam": {
//     "rosNodeParameter" :{
//       "rosNodeId": "e7288376-1260-4141-872e-c026a826508b",
//       "name": "param1",
//       "parameterType": "FLOAT",
//       "value": "1.888"
//     }
//   }
// }
