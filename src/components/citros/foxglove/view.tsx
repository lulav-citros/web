import {
    Box,
    Chip,
    CircularProgress,
    IconButton,
    LinearProgress,
    Link,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { BatchRun } from 'src/@types/repo';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { useSnackbar } from 'src/components/snackbar';
import FoxgloveIcon from 'src/assets/icons/foxgloveIcon';
import { useCallback, useMemo } from 'react';
import { foxgloveFileFromBucket, foxgloveSocketFGBFromBucket } from 'src/components/data-browser/utils';
import FoxgloveDialog from './FoxgloveDialog';


type Props = {
    status: string;

    batchRunId: string;
    sid: string;

    repoName: string;
    simulation: string;
    batch_name: string;
};

export function FoxgloveView({ status, batchRunId, sid, repoName, simulation, batch_name }: Props) {
    const { copy } = useCopyToClipboard();
    const { enqueueSnackbar } = useSnackbar();

    // let component = <FoxgloveDialog batchRunId={batchRunId} sid={sid}></FoxgloveDialog>;
    let component = useMemo(() => {
        if (status == 'DONE') {
            if (repoName != null && simulation != null && batch_name != null && sid != null) {
                return (
                    <IconButton
                        sx={{ p: 0 }}
                        onClick={() => {
                            foxgloveFileFromBucket(
                                `${repoName}/runs/${simulation}/${batch_name}/${sid}/bag/bag_0.mcap`
                            );
                        }}
                    >
                        <FoxgloveIcon></FoxgloveIcon>
                    </IconButton>
                );
            } else {
                console.error(
                    'cant be null: (repoName, simulation, batch_name, sid)',
                    repoName,
                    simulation,
                    batch_name,
                    sid
                );
            }
        }

        if (status == 'RUNNING') {
            if (batchRunId != null && sid != null) {
                return <FoxgloveDialog batchRunId={batchRunId} sid={sid}></FoxgloveDialog>;
            } else {
                console.error('cant be null: (batchRunId, sid)', batchRunId, sid);
            }
        }

        console.log('status', status);
        // disabled for any other status.
        return (
            <IconButton disabled={true} sx={{ p: 0 }}>
                <FoxgloveIcon disabled={true}></FoxgloveIcon>
            </IconButton>
        );
        // }
    }, [status, status, batchRunId, sid, repoName, simulation, batch_name]);

    // const onClickEventHandler = useCallback(() => {
    //     if (status == 'DONE') {
    //         if (repoName != null && simulation != null && batch_name != null && sid != null) {
    //             foxgloveFileFromBucket(`${repoName}/runs/${simulation}/${batch_name}/${sid}/bag/bag_0.mcap`);
    //         } else {
    //             console.error(
    //                 'cant be null: (repoName, simulation, batch_name, sid)',
    //                 repoName,
    //                 simulation,
    //                 batch_name,
    //                 sid
    //             );
    //         }
    //     }
    //     if (status == 'RUNNING') {
    //         if (batchRunId != null && sid != null) {
    //             foxgloveSocketFGBFromBucket(batchRunId, sid);
    //         } else {
    //             console.error('cant be null: (batchRunId, sid)', batchRunId, sid);
    //         }
    //     }
    // }, [status, status, batchRunId, sid, repoName, simulation, batch_name]);

    return <Box sx={{ width: '25px', height: '25px' }}>{component}</Box>;
}
