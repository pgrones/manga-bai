import { Button, Center, Stack } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { initializeApollo } from '../apollo/client';
import popularMangaQuery, {
  Media,
  PopularMangaQueryData
} from '../apollo/queries/popularManga';
import Features from '../components/landingPage/features';
import Heading from '../components/landingPage/heading';
import Layout from '../components/common/layout';
import { useUser } from '../lib/hooks/userProvider';

const LandingPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  manga
}) => {
  const { fullyAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (fullyAuthenticated === true) {
      router.push('/home');
    }
  }, [fullyAuthenticated]);

  return (
    <Layout>
      <Stack
        sx={theme => ({
          height: `calc(100vh - var(--mantine-header-height, 0px) - ${
            theme.spacing.md * 2
          }px)`
        })}
        py="xl"
        justify="space-between"
      >
        <Heading manga={manga} />
        <Features />
        <Center>
          <Button
            size="md"
            onClick={() =>
              window.open(
                '/signin',
                'Login with AniList',
                'height=500,width=500'
              )
            }
          >
            Login with AniList
          </Button>
        </Center>
      </Stack>
    </Layout>
  );
};

export default LandingPage;

export const getStaticProps: GetStaticProps<{
  manga: {
    id: number;
    title: string;
    src: string;
    transform: string;
    zIndex: number;
  }[];
}> = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<PopularMangaQueryData>({
    query: popularMangaQuery
  });

  const manga: { media: Media; transform: string; zIndex: number }[] = [];
  for (let i = 0; i < data.Page.media.length; i++) {
    const m = data.Page.media[i];
    const even = i % 2 === 0;
    const index = Math.ceil(i / 2);
    const zIndex = index && -index;
    const translate = index * -100;

    if (even) {
      manga.push({
        media: m,
        transform: `translateZ(${translate}px)`,
        zIndex
      });
    } else {
      manga.unshift({
        media: m,
        transform: `translateZ(${translate}px)`,
        zIndex
      });
    }
  }

  return {
    props: {
      manga: manga.map(m => ({
        id: m.media.id,
        title: m.media.title.romaji,
        src: m.media.coverImage.large,
        transform: m.transform,
        zIndex: m.zIndex
      }))
    },
    revalidate: 60 * 60 * 24
  };
};
