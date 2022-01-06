import React, { useContext } from 'react';
import ReviewsContext from './ReviewsContext.js';
import styled from 'styled-components';
import { forEach } from 'lodash';
import Rating from '@material-ui/lab/Rating';

const Reviews = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: #38062B;
  font-style: italic;
  /* margin-left: 3rem; */
`;
//silver #adadad
//blue #849a9a
//dark #072636
//red #3c0225
const Stars = styled.div`
  display: inline-block;
  font-family: Times;
  /* margin-left: 4rem; */
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
  //console.log('STARSRATINGSRESULTS', reviewsData.ratings);
  return (
    <div>
      {totalReviews() ? (
        <>
          <Reviews>
            <a href="#route">Read All {totalReviews()} Reviews</a>
          </Reviews>
          <div>
            <Stars>
              <Rating name="read-only" value={average()} precision={0.25} max={5} size="large" readOnly />
            </Stars>
          </div>
        </>
      ) : null}
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
