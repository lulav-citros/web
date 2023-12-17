// next
import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { CustomAvatar } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
    transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
    }),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
    const { user } = useAuthContext();

    return (
        // <NextLink >
        <Link component={NextLink} href={PATH_DASHBOARD.user.account} passHref underline="none" color="inherit">
            <StyledRoot>
                <CustomAvatar src={user?.photo} alt={user?.username} name={user?.username} />

                <Box sx={{ ml: 2, minWidth: 0 }}>
                    <Typography variant="subtitle2" noWrap>
                        {user?.organization.name}
                    </Typography>
                    <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                        {user?.organization.type == 'MANAGE' ? 'MANAGE' : ''}
                    </Typography>

                    <Typography variant="subtitle2" noWrap>
                        {user?.username}
                    </Typography>

                    <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                        {user?.role}
                    </Typography>
                </Box>
            </StyledRoot>
        </Link>
        // </NextLink>
    );
}
