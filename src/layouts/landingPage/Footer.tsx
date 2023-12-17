// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Box, Grid, Link, Stack, Divider, Container, Typography, IconButton } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
// import { _socials } from '../../_mock/arrays';
// components
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------
export const _socials = [
    {
        value: 'linkedin',
        name: 'Linkedin',
        icon: 'eva:linkedin-fill',
        color: '#007EBB',
        path: 'https://www.linkedin.com/company/lulav-space/',
    },
    {
        value: 'discord',
        name: 'Discord',
        icon: 'ic:baseline-discord',
        color: '#7289da',
        path: 'https://discord.gg/bRGrDPfe',
    },
];

const LINKS = [
    {
        headline: 'CITROS',
        children: [
            { name: 'About us', href: PATH_PAGE.about },            
            { name: 'Documentation', href: PATH_PAGE.documentation },
            { name: 'Contact us', href: PATH_PAGE.contact },
            { name: 'FAQs', href: PATH_PAGE.faqs },
        ],
    },
    {
        headline: 'Legal',
        children: [
            { name: 'Terms and Condition', href: PATH_PAGE.termsOfService },
            { name: 'Privacy Policy', href: PATH_PAGE.privacyPolicy },
        ],
    },
    {
        headline: 'Contact',
        children: [
            { name: 'support@citros.io', href: '#' },
            { name: 'Israeal, 43 Haazmaut, Haifa', href: '#' },
        ],
    },
];

// ----------------------------------------------------------------------

export default function Footer() {
    const { pathname } = useRouter();

    // const isHome = pathname === '/';
    const isHome = false;

    const simpleFooter = (
        <Box
            component="footer"
            sx={{
                py: 5,
                textAlign: 'center',
                position: 'relative',
                bgcolor: 'background.default',
            }}
        >
            <Container>
                <Logo sx={{ mb: 1, mx: 'auto' }} />

                <Typography variant="caption" component="div">
                    © All rights reserved
                    <br /> made by &nbsp;
                    <Link href="https://citros.io/"> citros.io </Link>
                </Typography>
            </Container>
        </Box>
    );

    const mainFooter = (
        <Box
            component="footer"
            sx={{
                position: 'relative',
                bgcolor: 'background.default',
            }}
        >
            <Divider />

            <Container sx={{ pt: 10 }}>
                <Grid
                    container
                    justifyContent={{
                        xs: 'center',
                        md: 'space-between',
                    }}
                    sx={{
                        textAlign: {
                            xs: 'center',
                            md: 'left',
                        },
                    }}
                >
                    <Grid item xs={12} sx={{ mb: 3 }}>
                        <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
                    </Grid>

                    <Grid item xs={8} md={3}>
                        <Typography variant="body2" sx={{ pr: { md: 5 } }}>
                            Cloud-based robotics development platform that empowers engineers to build better robots
                            faster, with streamlined data management, powerful analysis tools, and automated reporting.
                        </Typography>

                        <Stack
                            spacing={1}
                            direction="row"
                            justifyContent={{ xs: 'center', md: 'flex-start' }}
                            sx={{
                                mt: 5,
                                mb: { xs: 5, md: 0 },
                            }}
                        >
                            {_socials.map((social) => (
                                <Link href={social.path} target="_blank" key={social.name}>
                                    <IconButton>
                                        <Iconify icon={social.icon} />
                                    </IconButton>
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Stack spacing={5} justifyContent="space-between" direction={{ xs: 'column', md: 'row' }}>
                            {LINKS.map((list) => (
                                <Stack key={list.headline} spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
                                    <Typography component="div" variant="overline">
                                        {list.headline}
                                    </Typography>

                                    {list.children.map((link) => (
                                        // <NextLink key={link.name} href={link.href} passHref>
                                        <Link
                                            component={NextLink}
                                            key={link.name}
                                            href={link.href}
                                            underline="none"
                                            passHref
                                            color="inherit"
                                            variant="body2"
                                        >
                                            {link.name}
                                        </Link>
                                        // </NextLink>
                                    ))}
                                </Stack>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>

                <Typography
                    variant="caption"
                    component="div"
                    sx={{
                        mt: 2,
                        pb: 5,
                        textAlign: { xs: 'center', md: 'left' },
                    }}
                >
                    © 2021. All rights reserved
                </Typography>
            </Container>
        </Box>
    );

    return isHome ? simpleFooter : mainFooter;
}
