import { gql } from '@apollo/client';

export const GET_SIMULATIONS_METRICS = gql`
    mutation GetSimulationMetrics($simulationId: String!, $batchRunId: String!, $last: Int!) {
        getSimulationMetrics(input: { simulationId: $simulationId, batchRunId: $batchRunId, last: $last }) {
            strings
        }
    }
`;

export const GET_SIMULATIONS_LOGS = gql`
    mutation GetSimulationlogs($simulationId: String!, $batchRunId: String!, $last: Int!) {
        getSimulationLogs(input: { simulationId: $simulationId, batchRunId: $batchRunId, last: $last }) {
            strings
        }
    }
`;

export const GET_SIMULATIONS_TRACES = gql`
    mutation GetSimulationTraces($simulationId: String!, $batchRunId: String!, $last: Int!) {
        getSimulationTraces(input: { simulationId: $simulationId, batchRunId: $batchRunId, last: $last }) {
            strings
        }
    }
`;
