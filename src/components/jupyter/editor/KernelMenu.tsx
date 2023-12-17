import { useKernelManager } from '../kernel';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { JupyterTextLoader } from './JupyterTextLoader';
import { KernelSpecSelectionInput } from './KernelSpecSelectionInput';
import { KernelStatusChip } from './KernelStatusChip';
import { ReactNode } from 'react';
import Iconify from '../../iconify';
import { useTheme } from '@mui/material/styles';

export function KernelMenu() {
    const { loading } = useKernelManager();

    return (
        <Grid container gap={1} alignItems={'center'} flexWrap={'nowrap'}>
            {loading?.kernelSpec ? (
                <JupyterTextLoader text={'Initializing...'} />
            ) : (
                <>
                    {loading.kernel ? <JupyterTextLoader text={'starting kernel...'} /> : <KernelActionRow />}
                    <KernelSpecSelectionInput />
                    <KernelStatusChip />
                </>
            )}
            <ConnectionStatusIndicator />
        </Grid>
    );
}

function KernelActionRow() {
    const { status, connectionStatus, interrupt, shutdown, restart, load: kernelConnect } = useKernelManager();

    const components: ReactNode[] = [];

    // console.log('connectionStatus, status', connectionStatus, status);

    if (connectionStatus == 'disconnected') {
        components.push(
            <Tooltip title={'Start'}>
                <span>
                    <IconButton onClick={kernelConnect} color={'secondary'} size={'small'}>
                        <Iconify icon="codicon:debug-start" />
                    </IconButton>
                </span>
            </Tooltip>
        );
    } else if (connectionStatus == 'connecting') {
        components.push(
            <JupyterTextLoader text={'starting kernel...'} />
        );
    } else if (connectionStatus == 'connected') {
        
        switch (status) {
            case 'terminating':
            case 'dead':
                components.push(
                    <Tooltip title={'Start'}>
                        <span>
                            <IconButton onClick={kernelConnect} color={'success'} size={'small'}>
                                <Iconify icon="bx:play" />
                            </IconButton>
                        </span>
                    </Tooltip>
                );
                break;
            case 'busy':
                components.push(
                    <Tooltip title={'Interrupt'}>
                        <span>
                            <IconButton onClick={shutdown} color={'error'} size={'small'}>
                                <Iconify icon="bx:stop" />
                            </IconButton>
                        </span>
                    </Tooltip>
                );
                // components.push(
                //     <Button
                //         onClick={resetKernel}
                //         startIcon={<Iconify icon="bx:reset" />}
                //         color={'secondary'}
                //         size={'small'}
                //     >
                //         Restart
                //     </Button>
                // );
                break;
            case 'unknown':
                components.push(
                    <Tooltip title={'Start'}>
                        <span>
                            <IconButton onClick={kernelConnect} color={'secondary'} size={'small'}>
                                <Iconify icon="codicon:debug-start" />
                            </IconButton>
                        </span>
                    </Tooltip>
                );
                // components.push(
                //     <Button onClick={kernelKill} startIcon={<Iconify icon="bx:cross" />} color={'error'} size={'small'}>
                //         Kill
                //     </Button>
                // );
                break;
            // case 'restarting':
            // case 'autorestarting':
            case 'idle':
                components.push(
                    // <Tooltip title={'Restart'}>
                    //     <span>
                    //         <IconButton onClick={kernelConnect} color={'secondary'} size={'small'}>
                    //             <Iconify icon="bx:reset" />
                    //         </IconButton>
                    //     </span>
                    // </Tooltip>

                    <Tooltip title={'Stop'}>
                        <span>
                            <IconButton onClick={interrupt} color={'secondary'} size={'small'}>
                                <Iconify icon="material-symbols:stop-outline" />
                            </IconButton>
                        </span>
                    </Tooltip>
                );
                // components.push(
                //     <Button onClick={kernelKill} startIcon={<Iconify icon="bx:cross" />} color={'error'} size={'small'}>
                //         Kill
                //     </Button>
                // );
                break;
        }
    }

    return (
        <Grid container flexWrap={'nowrap'} width={'auto'}>
            {components.map((node, i) => (
                <Grid key={i} item>
                    {node}
                </Grid>
            ))}
        </Grid>
    );
}

function ConnectionStatusIndicator() {
    const theme = useTheme();
    const { connectionStatus } = useKernelManager();

    let color = theme.palette.text.disabled;
    if (connectionStatus === 'disconnected') {
        color = theme.palette.error.main;
    } else if (connectionStatus === 'connecting') {
        color = theme.palette.info.main;
    } else if (connectionStatus === 'connected') {
        color = theme.palette.success.main;
    }

    return (
        <Tooltip title={connectionStatus || 'connection status'}>
            <Iconify icon={'bxs:circle'} sx={{ height: '1rem', width: '1rem' }} color={color} />
        </Tooltip>
    );
}
