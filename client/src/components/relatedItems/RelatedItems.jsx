import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext.js';
import { TOKEN } from '../../config.js';
import Carousel from './Carousel.jsx';
import axios from 'axios';

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';



export default function RelatedItems() {
  const { products, setProducts } = useContext(AppContext);
  const [qa, setQa] = useState([]);

  useEffect(() => {
    const getQa = async () => {
      try {
        const res = await axios.get(
          `${URL}reviews/`,
          {
            params: {
              page: 1,
              count: 10,
              sort: 'newest',
              product_id: 40344
            },
            headers: {
              Authorization: `${TOKEN}`,
            }
          }
        );
        setQa(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getQa();
  }, []);

  return (
    <div className="related-items-and-comparison" >
      This is the Related Items Section
      <Carousel />
    </div>
  );
}
