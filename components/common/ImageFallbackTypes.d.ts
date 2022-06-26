import { ImageProps, StaticImageData } from 'next/image';

export type StaticImport = { default: StaticImageData } | StaticImageData;

export interface ImageFallbackProps extends ImageProps {
  alt: string;
  fallBackSrc: string;
}
