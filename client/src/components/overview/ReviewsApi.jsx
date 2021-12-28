import React, { useState, useEffect, useContext } from 'react';
import { TOKEN } from '../../config.js';
import axios from 'axios';
import ReviewsContext from './ReviewsContext.js';
import ReviewsStars from './ReviewsStars.jsx';

export default function Reviews() {
  const [reviewsData, setreviewsData] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get(
          'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta',
          {
            params: {
              product_id: 40344,
            },
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        setreviewsData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getReviews();
  }, []);
  return (
    <ReviewsContext.Provider value={{reviewsData, setreviewsData}}>
      <ReviewsStars/>
    </ReviewsContext.Provider>
  );
}