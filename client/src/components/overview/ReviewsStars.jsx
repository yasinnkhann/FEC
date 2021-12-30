import React, { useContext } from 'react';
import ReviewsContext from './ReviewsContext.js';
import styled from 'styled-components';
import { forEach } from 'lodash';

const Reviews = styled.span`
  cursor: pointer;
  text-decoration: underline;
  margin-left: 3rem;
`;
const Stars = styled.span`
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
  //console.log('STARSRATINGSRESULTS', reviewsData.ratings);
  return (
    <div>
      <Reviews>Read All {count} Reviews</Reviews>
      {starsAverage()}
    </div>
  );
}

// .stars:before {
//   content: '★★★★★';
//   /* content: '☆☆☆☆☆'; */
//   letter-spacing: 0;
//   background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
//   background-clip: text;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// }
