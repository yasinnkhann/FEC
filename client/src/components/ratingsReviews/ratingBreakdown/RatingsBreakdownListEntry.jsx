import React from 'react';
import styled from 'styled-components';

const starPercentage = (obj, key) => {
  if (obj) {
    let total = 0;
    for (const star in obj) {
      total += Number(obj[star]);
    }
    if (isNaN((Number(obj[key]) / total).toFixed(2))) {
      return 0;
    }
    return (Number(obj[key]) / total).toFixed(2) * 100;
  }
};

export default function RatingsBreakdownListEntry({
  rating,
  ratings,
  sortByStar,
}) {
  return (
    <StarBarContainer aria-hidden='true' onClick={() => sortByStar(rating)}>
      <StarNumber>
        {rating} {rating === 1 ? 'star' : 'stars'}
      </StarNumber>

      <StarBar>
        <StarBarShading starPercentage={starPercentage(ratings, rating)} />
      </StarBar>
      <StarCount>{ratings[rating]}</StarCount>
    </StarBarContainer>
  );
}

const StarBar = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  width: 8rem;
  background-color: rgba(232, 232, 232, 0.8);
  height: 0.5rem;
  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
  }
`;

// const StarBar = styled.div`
//   margin-left: 0.5rem;
//   margin-right: 0.5rem;
//   margin-top: 0.5rem;
//   width: 4rem;
//   background-color: rgba(232, 232, 232, 0.8);
//   height: 0.3rem;

//   @media (min-width: 640px) {
//     height: 0.4rem;
//     width: 6rem;
//   }

//   @media (min-width: 768px) {
//     width: 8rem;
//     height: 0.5rem;
//   }
// `;

const StarBarContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const StarNumber = styled.u`
  color: #fdf0d5;

  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
  }
`;

const StarCount = styled.u`
  color: #fdf0d5;

  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
    font-size: 0.75rem;
  }
`;

const StarBarShading = styled.div`
  background: #333baacc;
  height: 100%;
  border-radius: inherit;
  width: ${props => (props.starPercentage ? `${props.starPercentage}%` : '0')};
`;
