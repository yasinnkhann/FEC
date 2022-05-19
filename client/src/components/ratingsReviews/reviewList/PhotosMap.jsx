import React, { lazy, Suspense } from 'react';

const PhotoMapEntry = lazy(() => import('./PhotoMapEntry.jsx'));

export default function PhotosMap({ photos }) {
  return (
    <>
      {photos.map(photo => (
        <Suspense key={photo.id} fallback={<div>Loading...</div>}>
          <PhotoMapEntry photo={photo} key={photo.id} />
        </Suspense>
      ))}
    </>
  );
}
