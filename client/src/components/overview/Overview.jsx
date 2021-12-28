import React, { useEffect} from 'react';
import { TOKEN } from '../../config.js';
import axios from 'axios';

export default function Overview() {
  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get(
          'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
          {
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        // console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getApi();
  }, []);
  return <div>Hello from Overview!</div>;
}
