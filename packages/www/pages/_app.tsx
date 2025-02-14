import App from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { Box } from "@theme-ui/components";
import { Reset, ThemeProvider } from "../lib/theme";
import { ApiProvider } from "../hooks/use-api";
import MarkdownProvider from "../lib/markdown-provider";
import "shaka-player/dist/controls.css"; /* Shaka player CSS import */
import "../css/reset.css";
import "../css/markdown.css";
import "../css/shaka.css";
import "keen-slider/keen-slider.min.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps }: any = this.props;

    return (
      <>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
            rel="stylesheet"
          />
          <title>Live Video Transcoding - Livepeer.com</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800"
            rel="stylesheet"
          />
        </Head>
        <>
          <ThemeProvider>
            <MarkdownProvider>
              <ApiProvider>
                <Box sx={{ minHeight: "100vh" }}>
                  <DefaultSeo {...SEO} />
                  <Reset />
                  <Component {...pageProps} />
                </Box>
              </ApiProvider>
            </MarkdownProvider>
          </ThemeProvider>
        </>
      </>
    );
  }
}
