import React, { useState } from 'react';
import { ImageHoverPreview } from './ImageHoverPreview';
import { ImageOff } from 'lucide-react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  size?: number;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  src, 
  alt,
  size = 40
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!src) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-md"
        style={{ width: size, height: size }}
      >
        <ImageOff className="w-4 h-4 text-gray-400" />
      </div>
    );
  }

  if (imageError) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-md"
        style={{ width: size, height: size }}
      >
        <ImageOff className="w-4 h-4 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-md object-cover cursor-zoom-in"
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        onError={() => setImageError(true)}
        loading="lazy"
      />
      {showPreview && !imageError && (
        <ImageHoverPreview src={src} alt={alt} />
      )}
    </div>
  );
};