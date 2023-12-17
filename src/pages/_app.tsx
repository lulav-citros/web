// i18n
import '../locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useEffect, useState } from 'react';
// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
// redux
import { Provider as ReduxProvider } from 'react-redux';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// redux
import { store } from '../redux/store';
// utils
import createEmotionCache from '../utils/createEmotionCache';
// theme
import ThemeProvider from '../theme';
// locales
import ThemeLocalization from '../locales';
// components
import { StyledChart } from '../components/chart';
import ProgressBar from '../components/progress-bar';
import SnackbarProvider from '../components/snackbar';
import { MotionLazyContainer } from '../components/animate';
import { ThemeSettings, SettingsProvider } from '../components/settings';

// Check our docs
// https://docs.minimals.cc/authentication/ts-version

import { AuthProvider } from '../auth/JwtContext';
// import { AuthProvider } from '../auth/Auth0Context';
// import { AuthProvider } from '../auth/FirebaseContext';
// import { AuthProvider } from '../auth/AwsCognitoContext';

import { CITROS_API_URL } from '../config';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

function isClient() {
    return typeof window !== 'undefined';
}

type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
    Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
    const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

    const getLayout = Component.getLayout ?? ((page) => page);

    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url: any) => {
            window.gtag('config', 'G-MBRH1G897B', {
                page_path: url,
            });
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    // const httpLink = createHttpLink({
    //   uri: CITROS_API_URL
    // });

    const httpLink = new HttpLink({
        uri: CITROS_API_URL,
    });

    const splitLink = isClient()
        ? split(
              ({ query }) => {
                  const definition = getMainDefinition(query);
                  return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
              },
              new GraphQLWsLink(
                  createClient({
                      url: CITROS_API_URL as string,
                  })
              ),
              httpLink
          )
        : httpLink;

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('accessToken');
        // return the headers to the context so httpLink can read them
        if (token) {
            // console.log("Client - authonticated :)");
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            };
        } else {
            console.log('Client - NOT! authonticated');
            return headers;
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(splitLink),
        cache: new InMemoryCache(),
    });

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <AuthProvider>
                <ApolloProvider client={client}>
                    <ReduxProvider store={store}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <SettingsProvider>
                                <MotionLazyContainer>
                                    <ThemeProvider>
                                        <ThemeSettings>
                                            <ThemeLocalization>
                                                <SnackbarProvider>
                                                    <StyledChart />
                                                    <ProgressBar />
                                                    {getLayout(<Component {...pageProps} />)}
                                                </SnackbarProvider>
                                            </ThemeLocalization>
                                        </ThemeSettings>
                                    </ThemeProvider>
                                </MotionLazyContainer>
                            </SettingsProvider>
                        </LocalizationProvider>
                    </ReduxProvider>
                </ApolloProvider>
            </AuthProvider>
        </CacheProvider>
    );
}
