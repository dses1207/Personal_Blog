import '@/styles/globals.css';
import '@/styles/prism-vsc-dark-plus.css';
import '@/styles/prism-plus.css';
import 'nprogress/nprogress.css';
import '@/styles/nprogress-custom.scss';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';
import { useEffect } from 'react';

import LayoutWrapper from '@/components/LayoutWrapper';
import { siteConfigs } from '@/configs/siteConfigs';

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Integrate nprogress
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <ThemeProvider attribute="class">
      {/* <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head> */}
      <DefaultSeo
        titleTemplate={`%s | ${siteConfigs.titleShort}`}
        defaultTitle={siteConfigs.title}
        description={siteConfigs.description}
        canonical={siteConfigs.fqdn}
        openGraph={{
          title: siteConfigs.title,
          description: siteConfigs.description,
          url: siteConfigs.fqdn,
          images: [
            {
              url: siteConfigs.bannerUrl,
            },
          ],
          site_name: siteConfigs.title,
          type: 'website',
        }}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: siteConfigs.logoPath,
          },
          {
            rel: 'alternate',
            type: 'application/rss+xml',
            href: '/feed.xml',
          },
          {
            rel: 'alternate',
            type: 'application/atom+xml',
            href: '/atom.xml',
          },
        ]}
      />

      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
