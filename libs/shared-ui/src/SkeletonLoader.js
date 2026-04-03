'use client';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Removed the interface block entirely
export default function SkeletonLoader({ 
  count = 1, 
  height, 
  width, 
  circle = false, 
  className = '',
  containerClassName = '' 
}) {
  return (
    <SkeletonTheme 
      baseColor="#1a1a1a" 
      highlightColor="#262626"
      duration={1.5}
    >
      <Skeleton 
        count={count} 
        height={height} 
        width={width} 
        circle={circle} 
        className={className}
        containerClassName={containerClassName}
      />
    </SkeletonTheme>
  );
}