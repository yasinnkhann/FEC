import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';

const ReviewListEntry = lazy(() => import('./ReviewListEntry.jsx'));

export default function ReviewList({
  filteredReviewList,
  reviewEnd,
  handlePut,
  starSort,
  reviewCacheState,
  reviewCache,
}) {
  return (
    <ReviewsList>
      {starSort.length === 0 && (
        <>
          {filteredReviewList.results.slice(0, reviewEnd).map((review, key) => (
            <ReviewListEntry review={review} key={key} handlePut={handlePut} />
          ))}
        </>
      )}
      {starSort.length > 0 && (
        <>
          {reviewCache[reviewCacheState].results.map((review, key) =>
            starSort.map(star => {
              if (Number(star) === review.rating) {
                return (
                  <Suspense fallback={<></>}>
                    <ReviewListEntry
                      review={review}
                      key={key}
                      handlePut={handlePut}
                    />
                  </Suspense>
                );
              }
            })
          )}
        </>
      )}
    </ReviewsList>
  );
}

const ReviewsList = styled.ul`
  list-style-type: none;
`;
