import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';

const RatingsBreakdownListEntry = lazy(() =>
  import('./RatingsBreakdownListEntry.jsx')
);

export default function RatingsBreakdownList({ metaData, sortByStar }) {
  return (
    <RatingBreakdownList>
      {metaData?.ratings &&
        Object.keys(metaData?.ratings)
          .reverse()
          .map(rating => (
            <Suspense key={rating} fallback={<div>Loading...</div>}>
              <RatingsBreakdownListEntry
                rating={rating}
                ratings={metaData?.ratings}
                totalRating={metaData?.ratings?.rating || 0}
                sortByStar={sortByStar}
                key={rating}
              />
            </Suspense>
          ))}
    </RatingBreakdownList>
  );
}

const RatingBreakdownList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
