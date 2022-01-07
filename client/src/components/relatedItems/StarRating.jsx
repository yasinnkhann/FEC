// Dependency imports
import React, { useState, useEffect, useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import styled from 'styled-components';
import axios from 'axios';

const URL = 'http://34.223.4.224:3000/api'

// STAR RATING
export default function StarRating({ product }) {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {

    const getReviewMetaData = async (id) => {
      await axios
        .get(`${URL}/reviews/meta`, {
          params: {
            product_id: id,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.data.ratings)
        .then((ratings) => getAverageRating(ratings))
        .then((avgRating) => setAverageRating(avgRating))
        .catch((err) => console.log(err));
    };

    if (product !== undefined) {
      getReviewMetaData(product.id);
    }

  }, []);



  const getAverageRating = (ratings) => {
    const ratingsArr = [...Object.values(ratings)];
    const totalRatings = ratingsArr.reduce(addNumRatings);
    const averageRating = totalRatings / 5;
    return averageRating;
  };

  const addNumRatings = (acc, next) => {
    return Number(acc) + Number(next);
  };

  // JSX
  return (
    <Stars className="star-rating">
      <Rating name="read-only" value={averageRating} precision={0.25} max={5} size="small" readOnly />
    </Stars>
  );
}

const Stars = styled.span`
  display: flex;
  font-family: Times;
  align-items: flex-start;
  margin-left: 4rem;
  padding-top: 1rem;
`;
