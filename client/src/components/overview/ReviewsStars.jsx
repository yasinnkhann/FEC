import React, { useContext } from 'react';
import ReviewsContext from './ReviewsContext.js';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';

const Reviews = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: #38062b;
  font-style: italic;
`;

const Stars = styled.div`
  display: inline-block;
  font-family: Times;
  padding-top: 1rem;
`;

export default function ReviewsStars() {
  const { reviewsData, setreviewsData } = useContext(ReviewsContext);
  const totalReviews = () => {
    let count = 0;
    Object.entries(reviewsData.ratings)
      .map(([key, value]) => {
        return [parseInt(key), parseInt(value)];
      })
      .forEach(([key, value]) => {
        count += value;
      });
    return count;
  };
  const average = () => {
    let count = 0;
    let sum = 0;
    Object.entries(reviewsData.ratings)
      .map(([key, value]) => {
        return [parseInt(key), parseInt(value)];
      })
      .forEach(([key, value]) => {
        count += value;
        sum += key * value;
      });
    return sum / count;
  };
  return (
    <div>
      {totalReviews() ? (
        <>
          <Reviews>
            <a href='#route'>Read All {totalReviews()} Reviews</a>
          </Reviews>
          <div>
            <Stars>
              <Rating
                name='read-only'
                value={average()}
                precision={0.25}
                max={5}
                size='large'
                readOnly
              />
            </Stars>
          </div>
        </>
      ) : null}
    </div>
  );
}
