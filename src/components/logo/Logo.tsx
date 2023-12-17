import { m } from 'framer-motion';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import { BoxProps, Link } from '@mui/material';
import { textGradient } from 'src/utils/cssStyles';

const StyledGradientText = styled(m.h1)<{ size?: string }>(({ theme, size }) => ({
    ...textGradient(
        `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
    ),
    backgroundSize: size === 'small' ? '200%' : '400%',
    fontFamily: 'lato',
    fontWeight: 300,
    fontSize: size === 'small' ? '2rem' : '4rem',
    // fontSize: `${64 / 16}rem`,
    textAlign: 'center',
    lineHeight: 1,
    // padding: 0,
    marginTop: 0,
    marginBottom: 0,
    // letterSpacing: 8,
    // [theme.breakpoints.up('md')]: {
    //   fontSize: `${96 / 16}rem`,
    // },
}));

export interface LogoProps extends BoxProps {
    disabledLink?: boolean;
    size?: 'small' | string;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({ disabledLink = false, size = 'large', sx, ...other }, ref) => {
    const logo = (
        <StyledGradientText
            size={size}
            animate={{ backgroundPosition: '200% center' }}
            transition={{
                repeatType: 'reverse',
                ease: 'linear',
                duration: 20,
                repeat: Infinity,
            }}
        >
            CITROS
        </StyledGradientText>
    );

    if (disabledLink) {
        return <>{logo}</>;
    }

    return (
        <Link component={NextLink} href="/" passHref underline="none">
            {logo}
        </Link>
    );
});

export default Logo;
