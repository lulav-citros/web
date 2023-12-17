import { gql } from '@apollo/client';

export const GET_SIMULATION_METRICS = gql`
    query getSimulationMetrics($batchRunId: UUID!, $sid: Int!) {
        batchRun(id: $batchRunId) {
            cpu
            gpu
            memory
        }
        getSimulationMetricsList(arg0: $batchRunId, arg1: $sid, arg2: 10) {
            timestamp
            userId
            organizationId
            batchRunId
            sid
            cpuTime
            cpuUtilization
            memoryRss
            memoryUsage
        }
    }
`;
