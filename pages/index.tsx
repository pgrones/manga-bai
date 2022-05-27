import { Button, Center, Group, Image } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { initializeApollo } from '../apollo/client';
import popularMangaQuery, {
  PopularMangaQueryData
} from '../apollo/queries/popularManga';
import Layout from '../components/layout';
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
      <Group>
        {manga?.map(m => (
          <Image key={m.id} src={m.src} alt={m.title} />
        ))}
      </Group>
      <Center>
        <Button
          onClick={() =>
            window.open('/signin', 'Login with AniList', 'height=500,width=500')
          }
        >
          Login with AniList
        </Button>
      </Center>
    </Layout>
  );
};

export default LandingPage;

export const getStaticProps: GetStaticProps<{
  manga: { id: number; title: string; src: string }[];
}> = async () => {
  const apolloClient = initializeApollo();

  const manga = await apolloClient.query<PopularMangaQueryData>({
    query: popularMangaQuery
  });

  return {
    props: {
      manga: manga.data.Page.media.map(m => ({
        id: m.id,
        title: m.title.romaji,
        src: m.coverImage.large
      }))
    },
    revalidate: 60 * 60 * 24
  };
};
