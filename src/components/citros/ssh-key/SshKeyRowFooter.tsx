import { Box, Link, Typography } from '@mui/material';

type Props = {};

export function SshKeyRowFooter({}: Props) {
    return (
        <Box sx={{ mx: 5 }}>
            <Typography variant="body2" sx={{ py: 2, px: 3 }}>
                Check out our guide to{' '}
                <Link
                    href="https://citros.io/doc/docs/authentication/ssh/ssh_generate_key"
                    underline="hover"
                    target="_blank"
                >
                    generating SSH keys
                </Link>{' '}
                {/* or troubleshoot{' '} */}
                {/* <Link
                    href="https://citros.io/doc/docs_citros_web/authentication/troubleshooting/ts_passphrases"
                    underline="hover"
                    target="_blank"
                >
                    common SSH problems
                </Link> */}
            </Typography>
        </Box>
    );
}
