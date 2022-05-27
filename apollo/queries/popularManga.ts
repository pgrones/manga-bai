import { gql } from '@apollo/client';

const popularMangaQuery = gql`
  query {
    Page(perPage: 9) {
      media(type: MANGA, sort: [TRENDING_DESC, POPULARITY_DESC]) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

export default popularMangaQuery;

export interface PopularMangaQueryData {
  Page: Page;
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
  large: string;
}
