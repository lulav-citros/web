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

export default function NewRepoDialogs() {
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
                <Iconify icon={'ri:git-repository-line'} />
                New repository
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
                <DialogTitle id="help-integrate-new-repo-title">
                    Add new repo to CITROS using{' '}
                    <Link href="https://citros.io/doc/docs_cli" target="_blank">
                        {' '}
                        CLI tool
                    </Link>
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2}>
                        <Typography paragraph>
                            Download and{' '}
                            <Link href="https://citros.io/doc/docs_cli/overview/cli_install" target="_blank">
                                install CiTROS
                            </Link>{' '}
                            command line tool
                        </Typography>
                        <Code language="bash">python -m pip install citros</Code>
                        <Typography paragraph>Go to your repo folder</Typography>
                        <Code language="bash">cd /path/to/repo</Code>

                        <Typography paragraph>
                            Please {' '}
                            <Link
                                href="https://citros.io/doc/docs_cli/commands/cli_commands#command-login"
                                target="_blank"
                            >
                                authenticate
                            </Link>{' '}
                            citros package.
                        </Typography>
                        <Code language="bash">citros login</Code>
                        <Typography paragraph>
                            {' '}
                            <Link
                                href="https://citros.io/doc/docs_cli/commands/cli_commands/#command-init"
                                target="_blank"
                            >
                                Sync
                            </Link>{' '}
                            your repo to CiTROS
                        </Typography>
                        <Code language="bash">citros init</Code>
                        <Typography variant="body2" paragraph>
                            * your code is not being uploaded to CITROS at any time. only the metadata about the repo.
                        </Typography>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
