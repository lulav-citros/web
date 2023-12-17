import { forwardRef, useCallback, useState } from 'react';
import MuiMarkdown, { codeBlockThemes } from 'mui-markdown';

// @mui
import {
    Slide,
    Dialog,
    Button,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Stack,
    Typography,
    IconButton,
    Tooltip,
    Link,
    Box,
    Tabs,
    Tab,
    Divider,
    Input,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import Iconify from 'src/components/iconify';
import Code from 'src/components/code/Code';
import FoxgloveIcon from 'src/assets/icons/foxgloveIcon';
import { foxgloveSocketFGBFromBucket, foxgloveSocketFromBucket } from 'src/components/data-browser/utils';
import router from 'next/router';
import { Else, If, Then } from 'react-if';

// ----------------------------------------------------------------------

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    disabled?: boolean;
    batchRunId: string;
    sid: string;
};

export default function FoxgloveDialog({ batchRunId, sid, disabled = false }: Props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onClickEventHandler = useCallback(() => {
        foxgloveSocketFGBFromBucket(batchRunId, sid);
    }, [batchRunId, sid]);

    const [currentTab, setCurrentTab] = useState(router.query.tab || 'ros-bridge');
    const [foxglovePort, setFoxglovePort] = useState(8765);
    const [rosbridgePort, setRosbridgePort] = useState(9090);

    return (
        <>
            {/* <Tooltip title="Run batch from terminal." placement="top"> */}
            <IconButton
                disabled={disabled}
                sx={{ p: 0 }}
                onClick={() => {
                    setOpen(true);
                }}
            >
                <FoxgloveIcon disabled={disabled}></FoxgloveIcon>
            </IconButton>
            {/* </Tooltip> */}

            <Dialog
                maxWidth="sm"
                fullWidth={true}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="help-integrate-new-repo-title"
                aria-describedby="help-integrate-new-repo-description"
            >
                <DialogTitle id="help-integrate-new-repo-title">
                    Open Foxglove connection to similation
                </DialogTitle>

                <DialogContent>
                    {/* <Stack>asd</Stack> */}

                    <Tabs
                        value={currentTab}
                        onChange={(event, newValue) => {
                            setCurrentTab(newValue);
                            // router.push(
                            //     {
                            //         pathname: router.pathname,
                            //         query: { ...router.query, tab: newValue },
                            //     },
                            //     undefined,
                            //     { shallow: true }
                            // );
                        }}
                        aria-label="basic tabs example"
                    >
                        <Tab
                            key="ros-bridge"
                            value="ros-bridge"
                            label="ros bridge"
                            icon={<Iconify icon="tabler:cloud-data-connection" />}
                        />
                        <Tab
                            key="foxglove-bridge"
                            value="foxglove-bridge"
                            label="foxglove bridge"
                            icon={<Iconify icon="tabler:cloud-data-connection" />}
                        />
                    </Tabs>
                    <Divider></Divider>
                    <If condition={currentTab === 'ros-bridge'}>
                        <Then>
                            <Box key="ros-bridge" sx={{ mt: 1 }}>
                                <Typography>
                                    Connect to a ROS 1 or ROS 2 system using the Rosbridge WebSocket protocol.
                                </Typography>
                            </Box>
                            <Box sx={{ p: '10px' }}>
                                <Typography>websocket port:</Typography>
                                <Stack direction="row">
                                    <Input
                                        type="number"
                                        onChange={(e) => {
                                            setRosbridgePort(parseInt(e.currentTarget.value));
                                            // console.log('rosbridgePort', rosbridgePort);
                                        }}
                                        // onFocus={this._handleFocus}
                                        // onBlur={this._handleBlur}
                                        value={rosbridgePort}
                                        // ref={(input) => {
                                        //     this._textInput = input;
                                        // }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            foxgloveSocketFromBucket(batchRunId, sid, rosbridgePort);
                                        }}
                                    >
                                        Connect
                                    </Button>
                                </Stack>
                            </Box>
                        </Then>
                        <Else>
                            <Box key="foxglove-bridge" sx={{ mt: 1 }}>
                                <Typography>
                                    Connect to a ROS 1, ROS 2, or custom system using the Foxglove WebSocket protocol.
                                    For ROS systems, be sure to first install the foxglove_bridge ROS package.
                                </Typography>

                                <Box sx={{ p: '10px' }}>
                                    <Typography>websocket port:</Typography>
                                    {/* <Input defaultValue={8765}></Input> */}
                                    <Stack direction="row">
                                        <Input
                                            type="number"
                                            onChange={(e) => {
                                                setFoxglovePort(parseInt(e.currentTarget.value));
                                                // console.log('foxglovePort', foxglovePort);
                                            }}
                                            // onFocus={this._handleFocus}
                                            // onBlur={this._handleBlur}
                                            value={foxglovePort}
                                            // ref={(input) => {
                                            //     this._textInput = input;
                                            // }}
                                        />
                                        {/* <Button type="submit">Connect</Button> */}
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                foxgloveSocketFGBFromBucket(batchRunId, sid, foxglovePort);
                                            }}
                                        >
                                            Connect
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </Else>
                    </If>
                    <Divider></Divider>
                    <Typography sx={{ pt: '5px' }}>
                        * its up to you to set up{' '}
                        <Link
                            href="https://docs.foxglove.dev/docs/connecting-to-data/frameworks/ros1/#rosbridge"
                            target="_blank"
                        >
                            rosbridge
                        </Link>{' '}
                        node /{' '}
                        <Link
                            href="https://docs.foxglove.dev/docs/connecting-to-data/frameworks/ros1/#foxglove-websocket"
                            target="_blank"
                        >
                            foxglove
                        </Link>{' '}
                        bridge node.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    {/* <Button variant="contained" onClick={handleClose}>
                        Done
                    </Button> */}
                </DialogActions>
            </Dialog>
        </>
    );
}
