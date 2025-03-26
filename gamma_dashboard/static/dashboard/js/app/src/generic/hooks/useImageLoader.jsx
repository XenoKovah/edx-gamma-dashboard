import { useState, useEffect } from 'react';

export const useImageLoader = (imageUrl, fallbackUrl) => {
  const [src, setSrc] = useState(fallbackUrl);

  useEffect(() => {
    if (!imageUrl) {
      setSrc(fallbackUrl);
      return;
    }
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setSrc(imageUrl);
    img.onerror = () => setSrc(fallbackUrl);
  }, [imageUrl, fallbackUrl]);

  return src;
};
