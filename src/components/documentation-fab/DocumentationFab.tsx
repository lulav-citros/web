import { Link, Fab, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import Iconify from '../iconify/Iconify';

const fabStyle: SxProps<Theme> = {
    position: 'fixed',
    bottom: (theme) => theme.spacing(2),
    left: (theme) => theme.spacing(2),
};

export default function DocumentationFab() {
    return (
        <Link href="https://citros.io/doc/" target="_blank">
            <Fab sx={fabStyle} variant="circular" color="success" size="small">
                <Iconify icon="fluent-mdl2:documentation" />
            </Fab>
        </Link>
    );
}
