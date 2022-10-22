import axios, { AxiosResponse } from 'axios';
import { IMediaData } from '../types/entry';

// TODO rate limit 100 per minute

const japaneseNumbers = new Map<string, string>(
  Array.from(Array(10).keys()).map(i => [
    i.toString(),
    String.fromCharCode(0xff10 + i)
  ])
);

const hasNewerVolume = async (entry: IMediaData) => {
  // if (!entry.media.title.english) return false;
  const title = entry.media.title.userPreferred;

  let res = await axios.get<Data>(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${title} ${
      (entry.preordered ?? entry.progressVolumes) + 1
    }&maxResults=40&fields=items(volumeInfo/title)`
  );

  if (isPresent(res, entry)) return true;

  // Order by newest helps sometimes
  res = await axios.get<Data>(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${title} ${
      (entry.preordered ?? entry.progressVolumes) + 1
    }&maxResults=40&orderBy=newest`
  );

  if (isPresent(res, entry)) return true;

  const shortTitleLastIndex = title
    .split('')
    .findIndex(
      (s, i) =>
        i > 5 && s.codePointAt(0)! >= 0x4e00 && s.codePointAt(0)! <= 0x9faf
    );

  // Sometimes the right results come back when the search term is shorter
  if (shortTitleLastIndex >= 0) {
    res = await axios.get<Data>(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title.substring(
        0,
        shortTitleLastIndex
      )} ${(entry.preordered ?? entry.progressVolumes) + 1}&maxResults=40`
    );
    if (isPresent(res, entry)) return true;
  }

  // Remove particles
  if (shortTitleLastIndex - 1 >= 0) {
    res = await axios.get<Data>(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title.substring(
        0,
        shortTitleLastIndex - 1
      )} ${(entry.preordered ?? entry.progressVolumes) + 1}&maxResults=40`
    );
    if (isPresent(res, entry)) return true;
  }

  // Fuck it, just search everything, maybe we're lucky
  res = await axios.get<Data>(
    `https://www.googleapis.com/books/v1/volumes?q=${title} ${
      (entry.preordered ?? entry.progressVolumes) + 1
    }&maxResults=40`
  );
  if (isPresent(res, entry)) return true;

  return false;
};

export default hasNewerVolume;

// A new volume is available when...
const isPresent = (res: AxiosResponse<Data, any>, entry: IMediaData) => {
  const title = entry.media.title.userPreferred;

  let correctedTitle = '';
  for (let i = title.length - 1; i >= 0; i--) {
    const unicode = title.codePointAt(i)?.toString(16);
    if ((unicode === '3099' || unicode === '309a') && i - 1 >= 0) {
      correctedTitle += String.fromCharCode(
        title.codePointAt(i - 1)! + (unicode === '3099' ? 1 : 2)
      );
      i--;
    } else {
      correctedTitle += title[i];
    }
  }

  correctedTitle = correctedTitle.split('').reverse().join('');

  const regex =
    '(' +
    title +
    '|' +
    correctedTitle +
    ')(.{0,4}|.+Vol.*)(' +
    ((entry.preordered ?? entry.progressVolumes) + 1).toString() +
    '|' +
    ((entry.preordered ?? entry.progressVolumes) + 1)
      .toString()
      .replaceAll(/./g, match => japaneseNumbers.get(match)!) +
    ')';

  const result =
    // There is data at all
    !!res.data?.items?.length &&
    res.data?.items.some(i =>
      // The data has the correct volume number in the title
      new RegExp(regex).test(i.volumeInfo.title)
    );

  if (result)
    console.log(
      title + ((entry.preordered ?? entry.progressVolumes) + 1),
      res.data?.items.find(i =>
        // The data has the correct volume number in the title
        new RegExp(regex).test(i.volumeInfo.title)
      )?.volumeInfo.title
    );

  return result;
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
