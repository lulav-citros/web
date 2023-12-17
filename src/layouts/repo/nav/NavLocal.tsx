import { memo, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar } from '@mui/material';
import { bgBlur } from '../../../utils/cssStyles';
import { NavSectionHorizontalTab } from '../../../components/nav-section';
// import { NavSectionHorizontal } from '../../../components/nav-section';

type Props = {
    navConfigItems: any;
};

function NavLocal({ navConfigItems }: Props) {
    return (
        <Box
            // style={{ height: 24 }}
            sx={(theme) => ({
                paddingLeft: 3,
                // height: 0,
                ...bgBlur({
                    color: theme.palette.background.header,
                }),
            })}
        >
            <NavSectionHorizontalTab items={navConfigItems} />
        </Box>
    );
}

export default memo(NavLocal);
