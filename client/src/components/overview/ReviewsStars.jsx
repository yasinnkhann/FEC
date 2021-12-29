import React, { useContext } from 'react';
import ReviewsContext from './ReviewsContext.js';
import styled from 'styled-components';
import { forEach } from 'lodash';

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
export default function ReviewsStars() {
  const { reviewsData, setreviewsData } = useContext(ReviewsContext);
  const count = Object.keys(reviewsData.ratings).length;
  const starsAverage = () => {
    var sum = 0;
    var arr = Object.values(reviewsData.ratings);
    for (var i = 0; i < arr.length; i++) {
      sum += Number(arr[i]);
    }
    // console.log((sum / count) * 20);
  };
  // console.log('STARSRATINGSRESULTS', );
  return (
    <div>
      <Reviews>Read All {count} Reviews</Reviews>
      {starsAverage()}
    </div>
  );
}
