import axios, { AxiosResponse } from 'axios';
import { IMediaData } from '../types/entry';

// TODO subjectinQ nicht bei japanese
// TODO rate limit 100 per minute

const hasNewerVolume = async (entry: IMediaData) => {
  if (!entry.media.title.english) return '';

  let res = await axios.get<Data>(createURL(entry));
  if (isPresent(res, entry)) return res.data.items[0].volumeInfo.previewLink;

  res = await axios.get<Data>(createURL(entry, true));
  if (isPresent(res, entry)) return res.data.items[0].volumeInfo.previewLink;

  res = await axios.get<Data>(createURL(entry, false, true));
  if (isPresent(res, entry)) return res.data.items[0].volumeInfo.previewLink;

  res = await axios.get<Data>(createURL(entry, true, true));
  if (isPresent(res, entry)) return res.data.items[0].volumeInfo.previewLink;

  res = await axios.get<Data>(createURL(entry, true, true));
  if (isPresent(res, entry)) return res.data.items[0].volumeInfo.previewLink;

  res = await axios.get<Data>(createURL(entry, false, false, true));
  if (isPresent(res, entry)) return res.data.items[0].volumeInfo.previewLink;

  return '';
};

export default hasNewerVolume;

const isPresent = (res: AxiosResponse<Data, any>, entry: IMediaData) => {
  return (
    !!res.data?.items?.length &&
    res.data?.items.some(i =>
      new RegExp(
        ((entry.preordered ?? entry.progressVolumes) + 1).toString()
      ).test(i.volumeInfo.title)
    )
  );
};

const createURL = (
  entry: IMediaData,
  subjectInQ?: boolean,
  withoutQuotes?: boolean,
  shortenTitle?: boolean
) => {
  return `https://www.googleapis.com/books/v1/volumes?q="${
    (entry.preordered ?? entry.progressVolumes) + 1
  }${
    subjectInQ
      ? ` ${entry.media.format === 'NOVEL' ? 'Light Novel' : 'Manga'}`
      : ''
  }"+intitle:${
    (withoutQuotes ? '' : '"') +
    encodeURIComponent(
      entry.media.title.english.substring(0, shortenTitle ? 8 : undefined)
    ) +
    (withoutQuotes ? '' : '"')
  }+inauthor:${
    entry.media.staff.edges.find(edge => edge.role.includes('Story'))?.node.name
      .full
  }${
    !subjectInQ
      ? `+subject:${encodeURIComponent(
          entry.media.format !== 'NOVEL'
            ? '"Comics & Graphic Novels / Manga"'
            : '"Young Adult Fiction / Light Novel (Ranobe)"'
        )}`
      : ''
  }&showPreorders=true&fields=items(volumeInfo/title,volumeInfo/previewLink)&orderBy=relevance`;
};

export interface Data {
  items: Item[];
}

export interface Item {
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  seriesInfo: SeriesInfo;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}

export interface SeriesInfo {
  kind: string;
  bookDisplayNumber: string;
  volumeSeries: VolumeSeries[];
}

export interface VolumeSeries {
  seriesId: string;
  seriesBookType: string;
  orderNumber: number;
}
