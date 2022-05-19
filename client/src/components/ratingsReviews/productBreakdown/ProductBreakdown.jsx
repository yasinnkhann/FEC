import React, { lazy, Suspense } from 'react';

const ProductBreakdownEntry = lazy(() => import('./ProductBreakdownEntry'));

export default function ProductBreakdown({ metaData }) {
  const { characteristics } = metaData;

  return (
    <>
      {characteristics &&
        Object.entries(characteristics).map(characteristic => (
          <Suspense key={characteristic[1].id} fallback={<div>Loading...</div>}>
            <ProductBreakdownEntry
              characteristic={characteristic}
              key={characteristic[1].id}
            />
          </Suspense>
        ))}
    </>
  );
}
