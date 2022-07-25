import React, { useContext, lazy, Suspense } from 'react';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import ReviewsContext from '../RatingsContext.js';

const RatingsBreakdownList = lazy(() => import('./RatingsBreakdownList.jsx'));

export default function RatingBreakdown({
  metaData,
  sortByStar,
  clearStarFilter,
}) {
  const { ratings, recommended } = metaData;
  const { showClearFilter } = useContext(ReviewsContext);

  const averageRating = obj => {
    let wholeTotal = 0;
    let responseTotal = 0;
    for (const star in obj) {
      wholeTotal += Number(obj[star]) * Number(star);
      responseTotal += Number(obj[star]);
    }
    const result = wholeTotal / responseTotal;
    if (isNaN((Math.round(result * 4) / 4).toFixed(1))) {
      return 0;
    }
    return Number(result.toFixed(1));
  };

  const recommendedAverage = obj => {
    const total = Number(obj?.false) + Number(obj?.true);
    const result = Number(obj?.true) / total;

    if (isNaN(result.toFixed(2) * 100)) {
      return 0;
    }
    return result.toFixed(2) * 100;
  };

  return (
    <>
      <AvgRatingHeader>{averageRating(ratings).toFixed(1)}</AvgRatingHeader>
      <Stars>
        <Star
          name='read-only'
          value={averageRating(ratings)}
          precision={0.25}
          max={5}
          size='large'
          readOnly
        />
      </Stars>

      <RecommendedAvgLine>{`${recommendedAverage(
        recommended
      )}% of reviews recommend this product`}</RecommendedAvgLine>

      {showClearFilter && (
        <ClearFilterContainer>
          <ClearFilterBtn onClick={() => clearStarFilter()}>
            CLEAR FILTER
          </ClearFilterBtn>
        </ClearFilterContainer>
      )}
      <Suspense fallback={<></>}>
        <RatingsBreakdownList metaData={metaData} sortByStar={sortByStar} />
      </Suspense>
    </>
  );
}

const RecommendedAvgLine = styled.p`
  display: flex;
  justify-content: center;
  color: #fdf0d5;
  text-align: center;

  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
    padding: 0 3rem;
  }
`;

const AvgRatingHeader = styled.div`
  font-size: 2rem;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Stars = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: center;
`;

const ClearFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
`;

const ClearFilterBtn = styled.button`
  border: none;
  background-color: #fdf0d5;
  padding: 0.2rem;
  border-radius: 2px;
`;

const Star = styled(Rating)`
  &&& {
    font-size: 1.2rem;
  }

  @media (min-width: 640px) {
    &&& {
      font-size: 1.8rem;
    }
  }
`;
