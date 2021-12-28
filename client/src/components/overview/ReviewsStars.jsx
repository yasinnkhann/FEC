import React, {useContext} from 'react';
import ReviewsContext from './ReviewsContext.js';
import styled from 'styled-components';


const Reviews = styled.span `
  cursor: pointer;
  text-decoration: underline;
  margin-left: 3rem;
`;

export default function ReviewsStars() {
  const {reviewsData, setreviewsData} = useContext(ReviewsContext);
  //console.log('STARSRATINGSRESULTS', reviewsData);
  return (
    <Reviews>
      Read All Reviews
    </Reviews>
  );
}