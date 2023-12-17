import * as React from 'react';
// next
import Document, { Html, Head, Main, NextScript } from 'next/document';
// @emotion
import createEmotionServer from '@emotion/server/create-instance';
// utils
import createEmotionCache from '../utils/createEmotionCache';
// theme
import palette from '../theme/palette';
import { version } from '../../package.json';

// ----------------------------------------------------------------------

export default class MyDocument extends Document {
    render() {
        const gtag = `https://www.googletagmanager.com/gtag/js?id=G-MBRH1G897B`;

        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="manifest" href="/manifest.json" />

                    {/* PWA primary color */}
                    <meta name="theme-color" content={palette('light').primary.main} />

                    {/* Favicon */}
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

                    {/* Fonts */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Barlow:wght@900&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
                        rel="stylesheet"
                    />

                    {/* Emotion */}
                    <meta name="emotion-insertion-point" content="" />
                    {(this.props as any).emotionStyleTags}

                    {/* Meta */}
                    <meta
                        name="description"
                        content="CITROS platform for robotics validation can help customers improve efficiency, accuracy, cost savings, collaboration, scalability, and compliance."
                    />
                    <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
                    <meta name="author" content="CITROS" />
                    <meta name="version" content={version} />

                    {/* Google Analytics Measurement ID*/}
                    <script async src={gtag} />
                    {/* Inject the GA tracking code with the Measurement ID */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-MBRH1G897B', {
                                page_path: window.location.pathname
                                });
                            `,
                        }}
                    />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();

    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);

    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};
