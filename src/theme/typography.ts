// ----------------------------------------------------------------------

export function remToPx(value: string) {
    return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
    return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm),
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md),
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg),
        },
    };
}

// ----------------------------------------------------------------------

// const FONT_PRIMARY = 'Public Sans, sans-serif'; // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font
const FONT_PRIMARY = 'Lato'; // Google Font

const typography = {
    fontFamily: FONT_PRIMARY,
    fontWeightRegular: 300,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
        fontWeight: 700,
        lineHeight: 64 / 48,
        fontSize: pxToRem(30),
        ...responsiveFontSizes({ sm: 30, md: 30, lg: 30 }),
    },
    h2: {
        fontWeight: 700,
        lineHeight: 64 / 48,
        fontSize: pxToRem(27),
        ...responsiveFontSizes({ sm: 27, md: 27, lg: 27 }),
    },
    h3: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(24),
        ...responsiveFontSizes({ sm: 24, md: 24, lg: 24 }),
    },
    h4: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(20),
        ...responsiveFontSizes({ sm: 20, md: 20, lg: 20 }),
    },
    h5: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(18),
        ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
    },
    h6: {
        fontWeight: 700,
        lineHeight: 28 / 18,
        fontSize: pxToRem(16),
        // ...responsiveFontSizes({ sm: 16, md: 16, lg: 16 }),
    },
    subtitle1: {
        fontWeight: 600,
        lineHeight: 1.5,
        fontSize: pxToRem(16),
    },
    subtitle2: {
        fontWeight: 600,
        lineHeight: 22 / 14,
        fontSize: pxToRem(14),
    },
    body1: {
        lineHeight: 1.5,
        fontSize: pxToRem(16),
    },
    body2: {
        lineHeight: 22 / 14,
        fontSize: pxToRem(14),
    },
    caption: {
        lineHeight: 1.5,
        fontSize: pxToRem(12),
    },
    overline: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(12),
        textTransform: 'uppercase',
    },
    button: {
        fontWeight: 700,
        lineHeight: 24 / 14,
        fontSize: pxToRem(14),
        textTransform: 'capitalize',
    },
    logo: {
        fontWeight: 700,
        lineHeight: 24 / 14,
        fontSize: pxToRem(14),
        textTransform: 'capitalize',
    },
} as const;

export default typography;
