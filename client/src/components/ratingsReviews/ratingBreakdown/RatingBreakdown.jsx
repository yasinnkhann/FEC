import React, { useContext } from 'react';
import styled from 'styled-components';
import { forEach } from 'lodash';
import Rating from '@material-ui/lab/Rating';
import RatingsBreakdownList from './RatingsBreakdownList.jsx';
import StarFilterEntry from './StarFilterEntry.jsx';

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(1 1fr)',
  gridTemplateRows: 'minwidth(6 1fr) 100px',
  alignItems: 'center',
};

const recommendedAvgStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '10px',
  color: '#FDF0D5',
};

const avgRatingSpacing = {
  gridColumn: '1',
  gridRow: '2',
  fontSize: '40px',
  textAlign: 'center',
};

const clearStarFilterStyle = {
  display: 'flex',
  marginBottom: '5px',
  justifyContent: 'center',
  cursor: 'pointer',
};

const starFilterStyle = {
  display: 'flex',
  marginBottom: '10px',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const filtersContainer = {
  display: 'flex',
  marginBottom: '10px',
  justifyContent: 'center',
};

const Stars = styled.div`
  display: inline-block;
  font-family: Times;
  margin-left: 0rem;
  padding-top: 1rem;
`;

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
  const total = Number(obj.false) + Number(obj.true);
  const result = Number(obj.true) / total;

  if (isNaN(result.toFixed(2) * 100)) {
    return 0;
  }
  return result.toFixed(2) * 100;
};

const RatingBreakdown = props => {
  const { ratings } = props.metaData;
  const { recommended } = props.metaData;
  const { sortByStar } = props;
  const { starSort } = props;
  const { clearStarFilter } = props;
  return (
    <div style={gridLayout}>
      <div style={avgRatingSpacing}>{averageRating(ratings).toFixed(1)}</div>

      <div
        style={{
          gridColumn: '1',
          gridRow: '3',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Stars>
            <Rating
              name='read-only'
              value={averageRating(ratings)}
              precision={0.25}
              max={5}
              size='large'
              readOnly
            />
          </Stars>
        </div>
      </div>

      <div
        style={{
          gridColumn: '1',
          gridRow: '4',
          color: '#B1A9AC',
          textAlign: 'center',
        }}
      >
        <div style={recommendedAvgStyle}>{`${recommendedAverage(
          recommended
        )}% of reviews recommend this product`}</div>
      </div>

      <div
        style={{
          gridColumn: '1',
          gridRow: '5',
        }}
      >
        <div style={filtersContainer}>
          {starSort.length > 0 && (
            <div>
              <div style={starFilterStyle}>
                {starSort
                  .sort((a, b) => b - a)
                  .map(star => (
                    <StarFilterEntry
                      star={star}
                      sortByStar={sortByStar}
                      key={star}
                    />
                  ))}
              </div>
              <div
                style={clearStarFilterStyle}
                aria-hidden='true'
                onClick={clearStarFilter}
              >
                <u style={{ color: '#B1A9AC', fontSize: '13px' }}>
                  Clear Star Review Filter
                </u>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          gridColumn: '1',
          gridRow: '6',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RatingsBreakdownList
            metaData={props.metaData}
            sortByStar={sortByStar}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingBreakdown;
