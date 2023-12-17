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
    TextField,
    InputAdornment,
    Tooltip,
    IconButton,
    ListItemText,
    ListItemIcon,
    ListSubheader,
    ListItemButton,
    ListItemAvatar,
    ListItemButtonProps,
    ListItemSecondaryAction,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
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

type Props = {
    simulationId: string;
};

export default function RunTestSimulationDialogs({ simulationId }: Props) {
    const [open, setOpen] = useState(false);

    // console.log("simulationId", simulationId);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="success" onClick={handleClickOpen}>
                Run Simulation Locally
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
                aria-labelledby="help-integrate-new-project-title"
                aria-describedby="help-integrate-new-project-description"
            >
                <DialogTitle id="help-integrate-new-project-title">Add new project to CITROS</DialogTitle>

                <DialogContent>
                    <Stack spacing={2}>
                        <DialogContentText id="help-integrate-new-project-description">
                            To run the Simulation locally follow the next steps.
                        </DialogContentText>

                        {/* <Typography paragraph  >
            Download and install CiTROS command line tool
          </Typography>          

          <Code language='bash'>
            python -m pip install citros
          </Code> */}

                        <Typography paragraph>Go to your project folder</Typography>
                        <Code language="bash">cd /path/to/project</Code>

                        <Typography paragraph>Run the Simulation locally</Typography>
                        <Code language="bash">{'citros run ' + simulationId + ' '}</Code>
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
        </div>
    );
}
