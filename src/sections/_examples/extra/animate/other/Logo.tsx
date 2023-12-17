import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// components
import { varPath } from '../../../../../components/animate';
import { useSettingsContext } from '../../../../../components/settings';
// ----------------------------------------------------------------------

export default function Logo() {
    const theme = useTheme();
    const PRIMARY_LIGHT = theme.palette.primary.light;
    const PRIMARY_MAIN = theme.palette.primary.main;
    const PRIMARY_DARK = theme.palette.primary.dark;

    const { themeMode } = useSettingsContext();

    const logo_link = themeMode == 'light' ? '/logo/logo-black.png' : '/logo/logo-white.png';

    const logo = <Box component="img" src={logo_link} sx={{ width: 240, height: 240 }} />;

    return <>{logo}</>;
}
