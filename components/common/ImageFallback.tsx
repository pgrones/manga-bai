import Image, { ImageProps, StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';

type StaticImport = { default: StaticImageData } | StaticImageData;

const ImageFallback: React.FC<
  ImageProps & { alt: string; fallBackSrc: string }
> = ({ src, fallBackSrc, alt, ...rest }) => {
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
