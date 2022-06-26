import Head from 'next/head';
import { FC } from 'react';
import { MetaTagsProps } from './metaTagsTypes';

const MetaTags: FC<MetaTagsProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@Alzariel" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://mangabai.com/logo.webp" />

      <meta property="og:site_name" content="Manga Bai" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://mangabai.com" />
      <meta property="og:image" content="https://mangabai.com/logo.webp" />
    </Head>
  );
};

export default MetaTags;
