import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext.js';
import { TOKEN } from '../../config.js';
import Carousel from './Carousel.jsx';
import axios from 'axios';

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

export default function RelatedItems() {
  const { products, setProducts } = useContext(AppContext);

  useEffect(() => {
    const getQa = async () => {
      try {
        const questionsAndAnswers = await axios.get(
          `${URL}products`,
          {
            params: {
              // page: 1,
              count: 20,
              // sort: 'newest',
              // product_id: null
            },
            headers: {
              Authorization: `${TOKEN}`,
            }
          }
        );
        return questionsAndAnswers;
      } catch (err) {
        console.error(err);
      }
    };
  }, []);

  return (
    <div className="related-items-and-comparison">
      This is the Related Items Section
      <Carousel />
    </div>
  );
}
