import { Box, BoxProps } from '@mui/material';

export default function Main({ children, sx, ...other }: BoxProps) {
    // if (isNavHorizontal) {
    //     return (
    //         <Box
    //             component="main"
    //             sx={
    //                 {
    //                     //   pt: `${HEADER.H_MOBILE + SPACING}px`,
    //                     //   pb: `${HEADER.H_MOBILE + SPACING}px`,
    //                     //   ...(isDesktop && {
    //                     //     px: 2,
    //                     //     pt: `${HEADER.H_DASHBOARD_DESKTOP + 80}px`,
    //                     //     pb: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
    //                     //   }),
    //                 }
    //             }
    //         >
    //             {children}
    //         </Box>
    //     );
    // }

    return (
        <Box
            component="main"
            sx={{
                // flexGrow: 1,
                // py: `${HEADER.H_MOBILE}px`,
                // ...(isDesktop && {
                //     px: 2,
                //     py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
                //     width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
                //     ...(isNavMini && {
                //         width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
                //     }),
                // }),
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    );
}
