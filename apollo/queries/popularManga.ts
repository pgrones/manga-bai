import { gql } from '@apollo/client';

const popularMangaQuery = gql`
  query getPopularManga {
    popularManga: Page(perPage: 9) {
      media(type: MANGA, sort: [TRENDING_DESC, POPULARITY_DESC]) {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

export default popularMangaQuery;

export interface PopularMangaQueryData {
  popularManga: Page;
}

export interface Page {
  media: Media[];
}

export interface Media {
  id: number;
  title: Title;
  coverImage: Image;
}

export interface Title {
  romaji: string;
}

export interface Image {
  extraLarge: string;
}
