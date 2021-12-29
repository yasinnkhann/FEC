// Dependency imports
import React, { useContext } from 'react';
import styled from 'styled-components';
import { forEach } from 'lodash';

// Context imports
import ReviewsContext from '../overview/ReviewsContext.js';

// STAR RATING
export default function StarRating() {

  // CONTEXT
  const {reviewsData, setreviewsData} = useContext(ReviewsContext);

  // HELPER FUNCTIONS
  const totalReviews = () => {
    let count = 0;
    Object.entries(reviewsData.ratings).map(([key, value]) => {
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
    Object.entries(reviewsData.ratings).map(([key, value]) => {
      return [parseInt(key), parseInt(value)];
    })
      .forEach(([key, value]) => {
        count += value;
        sum += (key * value);
      });
    return (sum / count);
  };

  const av = average();

  // JSX
  return (
    <h5>★★★★★</h5>
  );
}

// STYLE
const Reviews = styled.span`
  cursor: pointer;
  text-decoration: underline;
  margin-left: 3rem;
`;
const Stars = styled.span `
  display: inline-block;
  font-family: Times;

  &::before {
    content: '★★★★★';
   background: linear-gradient(90deg)
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;