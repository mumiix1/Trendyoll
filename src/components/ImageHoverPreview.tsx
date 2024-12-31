import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageHoverPreviewProps {
  src: string;
  alt: string;
}

export const ImageHoverPreview: React.FC<ImageHoverPreviewProps> = ({ src, alt }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <ImageOff className="w-8 h-8" />
            <p>Failed to load image</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/50">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl max-h-[80vh]">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
    </div>
  );
};