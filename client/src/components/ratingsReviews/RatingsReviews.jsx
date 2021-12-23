import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TOKEN } from '../../config.js';
import AppContext from '../../AppContext.js';

export default function RatingsReviews() {
  const { products, setProducts } = useContext(AppContext);

  //TODO: Will focus on this part
  // useEffect(() => {
  // const getApi = async () => {
  //   try {
  //     const res = await axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
  //       headers: {
  //         'Authorization': `${TOKEN}`
  //       }
  //     });
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  //   getApi();
  // }, []);

  return (
    <div>
      <p>Hello from ratings and reviews!!TESTING!!</p>
      {console.log('from Rating and Reviews', products)}
    </div>
  );
}

