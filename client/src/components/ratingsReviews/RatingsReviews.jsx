import React, { useEffect } from 'react';
import axios from 'axios';
import { TOKEN } from '../../config.js';

export default function RatingsReviews() {
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
    </div>
  );
}

