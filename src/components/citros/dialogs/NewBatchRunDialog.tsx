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
    IconButton,
    Tooltip,
    Link,
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

export default function NewBatchRunDialog() {
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
            <Tooltip title="Run batch from terminal." placement='top'>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} sx={{p:0 }}>
                <Iconify icon={'tabler:terminal'}  />                
            </Button>
            </Tooltip>
            {/* <IconButton color="primary" onClick={handleClickOpen}>
                <Iconify icon={'tabler:terminal'} sx={{ mr: 1 }} />
            </IconButton> */}

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
                <DialogTitle id="help-integrate-new-repo-title">Run a new simulation batch using CITROS 
                <Link href='https://citros.io/doc/docs_cli' target="_blank"> CLI tool</Link>
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2}>
                        <Typography paragraph>To run a new batch run please go to your repo directory</Typography>
                        <Code language="bash">cd /path/to/repo</Code>

                        <Typography paragraph>Authenticate citros package.</Typography>
                        <Code language="bash">citros login</Code>

                        <Typography paragraph>Run the simulation with -r flag so it will start run in the cloud.</Typography>
                        <Code language="bash">citros run -r</Code>
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
