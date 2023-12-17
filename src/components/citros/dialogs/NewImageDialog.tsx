
import { forwardRef, useState } from 'react';
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
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import Iconify from 'src/components/iconify';
import Code from 'src/components/code/Code';

// ----------------------------------------------------------------------

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewImageDialog() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

    const authenticateCommand = 'citros authenticate ' + accessToken;
    // console.log("authenticateCommand", authenticateCommand);

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                <Iconify icon={'teenyicons:docker-outline'} sx={{mr:1}} />
                Upload Image
            </Button>

            <Dialog
                // sx={{backgroundColor: 'rgb(57 74 92 / 80%)'}}
                // sx={{'box-shadow':'0px 0px 20px 10px rgb(0 0 0 / 24%)'}}
                maxWidth="sm"
                fullWidth={true}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="help-integrate-new-repo-title"
                aria-describedby="help-integrate-new-repo-description"
            >
                <DialogTitle id="help-integrate-new-repo-title">Upload new image to CITROS</DialogTitle>

                <DialogContent>
                    <Stack spacing={2}>                        

                        <Typography paragraph>Download and install CiTROS command line tool</Typography>

                        <Code language="bash">python -m pip install citros</Code>

                        <Typography paragraph>Go to your repo folder</Typography>
                        <Code language="bash">cd /path/to/repo</Code>

                        <Typography paragraph>Please authenticate citros package.</Typography>
                        <Code language="bash">citros login</Code>
                        {/* <Code language="bash">{authenticateCommand || 'ERROR: dont have access token.'}</Code> */}

                        <Typography paragraph>Upload your new image to CiTROS</Typography>
                        <Code language="bash">citros docker-build-push</Code>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    {/* <Button color="inherit" onClick={handleClose}>
            Disagree
          </Button> */}

                    <Button variant="contained" onClick={handleClose}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
