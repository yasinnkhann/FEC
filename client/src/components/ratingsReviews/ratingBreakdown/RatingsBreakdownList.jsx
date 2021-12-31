import React from 'react';
// import styled from 'styled-components';
import RatingsBreakdownListEntry from './RatingsBreakdownListEntry.jsx';

export default function RatingsBreakdownList({ metaData, sortByStar }) {
  return (
    <div style={gridLayout}>
      {
        ([5, 4, 3, 2, 1])
          .map((rating) => (
            <RatingsBreakdownListEntry
              rating={rating}
              ratings={metaData.ratings}
              totalRating={metaData.ratings[rating] || 0}
              sortByStar={sortByStar}
              key={rating}
            />
          ))
      }
    </div>
  );
}

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'minwidth(5, 1fr) 50px',
  margin: 'auto',
};