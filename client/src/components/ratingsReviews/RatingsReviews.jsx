/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AppContext from '../../AppContext.js';
import { TOKEN } from '../../config.js';

import ReviewList from './reviewList/ReviewList.jsx';
import WriteReview from './writeReviews/WriteReview.jsx';
import RatingBreakdown from './ratingBreakdown/RatingBreakdown.jsx';
import ProductBreakdown from './productBreakdown/ProductBreakdown.jsx';
import SortOptions from './sortOptions/SortOption.jsx';



export default function RatingsReviews() {
  const { products, setProducts } = useContext(AppContext);
  const [ratingAndReviews, setRatingAndReviews] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get(
          'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/',
          {
            params: {
              // page: 1,
              count: 50,
              // sort: 'newest',
              product_id: 40344
            },
            headers: {
              Authorization: `${TOKEN}`,
            }
          }
        );
        console.log('Rate and Review API Data:', res.data);
        setRatingAndReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getApi();
  }, []);

  return (
    <div>
      <p>Hello from ratings and reviews!</p>
      {/* {console.log('from Product from APP:', products[0]?.id)} */}
      {/* {console.log('from RatingAndReviews:', ratingAndReviews)} */}
      <div>
        {/* <Reviews data={this.state.ratingAndReviews}/> */}
      </div>
    </div>
  );
}


