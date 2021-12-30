// Dependency imports
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// API imports
import { TOKEN } from '../../config.js';

// STAR RATING
export default function StarRating({ product }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (product) { getReviewMetaData(product.id); }
  }, []);

  const getReviewMetaData = async (id) => {
    await axios.get(
      'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta',
      {
        params: {
          product_id: id
        },
        headers: {
          Authorization: `${TOKEN}`,
        },
      }
    )
      .then(res => console.log(res))
      .then(ratings => console.log(ratings))
      .catch(err => console.log(err))
  };

  // JSX
  return (
    <div className="rating">
    </div>
  );
}