import { ImageProps, StaticImageData } from "next/legacy/image";

export type StaticImport = { default: StaticImageData } | StaticImageData;

export interface ImageFallbackProps extends ImageProps {
  alt: string;
  fallBackSrc: string;
}
