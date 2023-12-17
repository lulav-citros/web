import { useMemo, useState } from 'react';

// @mui
import {
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

interface CommitDialogProps {
    loading?: boolean;
    branch: string;
    open: boolean;
    onSave: (title: string, message: string) => void;
    onCancel: () => void;
    filename?: string;
    committer: {
        email?: string;
    };
}

export function CommitDialog(props: CommitDialogProps) {
    const { loading, open, onSave, filename, onCancel, committer } = props;    
    return (
        <Dialog
            maxWidth="sm"
            fullWidth={true}
            open={open}
            keepMounted
            onClose={() => {
                onCancel();
            }}
        >
            <CommitDialogContent {...props} />
        </Dialog>
    );
}

function CommitDialogContent({ loading, onSave, filename, onCancel, committer, branch}: CommitDialogProps) {    
    const [commitMessage, setCommitMessage] = useState('Update ' + filename);
    const [extendedDescription, setExtendedDescription] = useState('');

    useMemo(() => {
        setCommitMessage('Update ' + filename)
    }, [filename])

    return (
        <>
            <DialogTitle sx={{ pb: 2 }}>Commit changes</DialogTitle>

            <DialogContent>
                <Stack spacing={1}>
                    <Typography paragraph sx={{ marginBottom: 0 }}></Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Commit message"
                        size="small"
                        value={commitMessage}
                        onChange={(e) => setCommitMessage(e.target.value)}
                    />

                    <TextField
                        sx={{ marginBottom: 2 }}
                        variant="outlined"
                        rows={6}
                        fullWidth
                        multiline
                        label="Extended description"
                        defaultValue="Add an optional extended description"
                        onChange={(e) => setExtendedDescription(e.target.value)}
                    />

                    {committer.email && (
                        <Stack spacing={1} direction="row">
                            <Typography paragraph>Commit email:</Typography>
                            <Chip variant="outlined" label={committer.email}></Chip>
                        </Stack>
                    )}
                    <Typography paragraph>Commit directly to the {branch} branch</Typography>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button color="inherit" onClick={onCancel}>
                    Cancel
                </Button>

                <Button
                    disabled={loading}
                    variant="contained"
                    onClick={() => {
                        onSave(commitMessage as string, extendedDescription as string);
                    }}
                    color="success"
                    endIcon={loading && <CircularProgress size={20} />}
                >
                    Commit changes
                </Button>
            </DialogActions>
        </>
    );
}
