import Image from "next/legacy/image";
import { FC, useEffect, useState } from 'react';
import { ImageFallbackProps, StaticImport } from './ImageFallbackTypes';

const ImageFallback: FC<ImageFallbackProps> = props => {
  const { src, fallBackSrc, alt, ...rest } = props;
  const [imageSrc, setImageSrc] = useState<string | StaticImport>(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imageSrc ? imageSrc : fallBackSrc}
      onError={() => setImageSrc(fallBackSrc)}
    />
  );
};

export default ImageFallback;
