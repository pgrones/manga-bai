import axios, { AxiosResponse } from 'axios';
import { delay } from '../helper/onboardingHelper';
import { IMediaData } from '../types/entry';

let rateLimit = 0;
setInterval(() => {
  rateLimit = 0;
}, 1000 * 60);

const japaneseNumbers = new Map<string, string>(
  Array.from(Array(10).keys()).map(i => [
    i.toString(),
    String.fromCharCode(0xff10 + i)
  ])
);

/**
 * Check if we can find new volumes through the google books API
 * The API is not great, so we try a few different queries
 */
const hasNewerVolume = async (entry: IMediaData) => {
  const title = entry.media.title[entry.preorderLanguage ?? 'english'];
  if (!title) return false;

  rateLimit++;
  if (rateLimit > 70) await delay(1000 * (rateLimit - 70) * 2);

  let res = await axios.get<Data>(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${title} ${
      (entry.preordered ?? entry.progressVolumes) + 1
    }&maxResults=40&fields=items(volumeInfo/title,selfLink)`
  );

  if (isPresent(res, entry, title)) return true;

  rateLimit++;
  if (rateLimit > 70) await delay(1000 * (rateLimit - 70) * 2);

  // Order by newest helps sometimes
  res = await axios.get<Data>(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${title} ${
      (entry.preordered ?? entry.progressVolumes) + 1
    }&maxResults=40&orderBy=newest&fields=items(volumeInfo/title,selfLink)`
  );

  if (isPresent(res, entry, title)) return true;

  // Sometimes the search doesn't include the volume number, but the volume itself does
  // therefore we're gonna look up the first few entries directly
  const selfLinks =
    res.data.items
      ?.slice(0, 3)
      .filter(i =>
        new RegExp(
          `^([^0-9${Array.from(japaneseNumbers.values()).join('')}]*)$`
        ).test(i.volumeInfo.title)
      )
      .map(i => i.selfLink) ?? [];

  for (const link of selfLinks) {
    rateLimit++;
    if (rateLimit > 70) await delay(1000 * (rateLimit - 70) * 2);

    const directRes = await axios.get<Item>(link + '?projection=lite');

    if (
      isPresent(
        { ...directRes, data: { items: [directRes.data] } },
        entry,
        title
      )
    )
      return true;
  }

  rateLimit++;
  if (rateLimit > 70) await delay(1000 * (rateLimit - 70) * 2);

  // Shorten the title to the first Kanji after 5 characters
  // The API works better with full words and Kanji usually indicate the start of a new word
  const shortTitleLastIndex =
    entry.preorderLanguage !== 'native'
      ? -1
      : title
          .split('')
          .findIndex(
            (s, i) =>
              i > 5 &&
              s.codePointAt(0)! >= 0x4e00 &&
              s.codePointAt(0)! <= 0x9faf
          );

  // Sometimes the right results come back when the search term is shorter
  if (shortTitleLastIndex >= 0) {
    res = await axios.get<Data>(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title.substring(
        0,
        shortTitleLastIndex
      )} ${
        (entry.preordered ?? entry.progressVolumes) + 1
      }&maxResults=40&fields=items(volumeInfo/title,selfLink)`
    );
    if (isPresent(res, entry, title)) return true;
  }

  rateLimit++;
  if (rateLimit > 70) await delay(1000 * (rateLimit - 70) * 2);

  // Remove particles
  if (shortTitleLastIndex - 1 >= 0) {
    res = await axios.get<Data>(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title.substring(
        0,
        shortTitleLastIndex - 1
      )} ${
        (entry.preordered ?? entry.progressVolumes) + 1
      }&maxResults=40&fields=items(volumeInfo/title,selfLink)`
    );
    if (isPresent(res, entry, title)) return true;
  }

  rateLimit++;
  if (rateLimit > 70) await delay(1000 * (rateLimit - 70) * 2);

  // Fuck it, just search everything, maybe we're lucky
  res = await axios.get<Data>(
    `https://www.googleapis.com/books/v1/volumes?q=${title} ${
      (entry.preordered ?? entry.progressVolumes) + 1
    }&maxResults=40&fields=items(volumeInfo/title,selfLink)`
  );
  if (isPresent(res, entry, title)) return true;

  return false;
};

export default hasNewerVolume;

// A new volume is available when...
const isPresent = (
  res: AxiosResponse<Data, any>,
  entry: IMediaData,
  title: string
) => {
  // Some Kana with Dakuten are written as two unicode characters
  // Here we create a version with the character as a single unicode character
  // In order for the regex to read the title correctly
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

  // There is a volume available if
  const result =
    // There is data at all
    !!res.data?.items?.length &&
    res.data?.items.some(i =>
      // and the data has the correct volume number in the title
      new RegExp(regex, 'i').test(i.volumeInfo.title)
    );

  return result;
};

export interface Data {
  items?: Item[];
}

export interface Item {
  volumeInfo: VolumeInfo;
  selfLink: string;
}

export interface VolumeInfo {
  title: string;
}
