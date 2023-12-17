import { useMemo } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_SIMULATION_RUN_EVENTS } from '../../graphQL/repos';
import SimulationStatus from './chips/SimulationStatus';
import { fDateTimeShort } from 'src/utils/formatTime';

type Props = {
    batchRunId: string;
    simulationRunId: string;
};

export default function SimulationRunEvents({ batchRunId, simulationRunId }: Props) {
    // Get the data from CiTROS GraphQL API
    const { loading, error, data } = useQuery(GET_SIMULATION_RUN_EVENTS, {
        variables: { batchRunId: batchRunId, sid: parseInt(simulationRunId) },
    });
    if (error) {
        console.log('ERROR!', error);
    }
    // transform data to projects type
    const tableEventData = useMemo(() => {
        if (data == undefined) {
            return [];
        }
        const temp_data = [];

        if (!error && !loading) {
            for (let i = 0; i < data.getSimulationTracesList.length; i++) {
                temp_data.push(data.getSimulationTracesList[i]);
            }

            // console.log('tableEventData', temp_data);
            return temp_data;
        }
        return [];
    }, [data]);

    return (
        <Box sx={{ width: '100%' }}>
            {tableEventData?.map((event) => (
                <Box
                    key={event.id}
                    sx={{
                        pb: 3,
                        borderBottom: 0.5,
                        borderColor: 'grey.800',
                        ':hover': {
                            cursor: 'pointer',
                            backgroundColor: 'grey.850',
                        },
                    }}
                >
                    <Box sx={{ pb: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            {event.span.attributes['message']}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant="body2" color="text.secondary">
                            Time:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {fDateTimeShort(event.timestamp)}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant="body2" color="text.secondary">
                            Type:
                        </Typography>
                        <SimulationStatus status={event.span.attributes['event-type'] as string}></SimulationStatus>
                    </Box>
                    <Divider></Divider>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant="body2" color="text.secondary">
                            Tag:
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {event.span.attributes['tag']}
                        </Typography>

                        {/* <Typography variant="body2" color="text.secondary">
                        {JSON.stringify(event.span.attributes["metadata"], null, 3)}
                        </Typography> */}
                    </Box>
                    {/* <Divider></Divider>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}>

                        <Typography variant="body2" color="text.secondary" >
                            Metadata: 
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {JSON.stringify(event.span.attributes["metadata"], null, 3)}
                        </Typography>

                    </Box> */}
                </Box>
            ))}
        </Box>

        // <DataGridSimulationRunEvents data={tableEventData} />
    );
}
