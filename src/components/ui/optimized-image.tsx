
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { imageUtils } from '@/utils/performance';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  lazy?: boolean;
  fallback?: string;
  skeleton?: React.ReactNode;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  lazy = true,
  fallback = '/placeholder.svg',
  skeleton,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  const optimizedSrc = imageUtils.getOptimizedImageUrl(src, width, height, quality);

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(false);
  };

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={cn('bg-gray-200 animate-pulse', className)}
        style={{ width, height }}
      >
        {skeleton}
      </div>
    );
  }

  return (
    <div className="relative">
      {!isLoaded && !isError && (
        <div
          className={cn('absolute inset-0 bg-gray-200 animate-pulse', className)}
          style={{ width, height }}
        >
          {skeleton}
        </div>
      )}
      <img
        ref={imgRef}
        src={isError ? fallback : optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
};
