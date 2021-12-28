import React, { useState, useEffect, useContext } from 'react';
import { TOKEN } from '../../config.js';
import axios from 'axios';
import StylesContext from './StylesContext.js';
import AppContext from '../../AppContext.js';
import Thumbnails from './Thumbnails.jsx';

export default function Styles() {
  const [stylesData, setstylesData] = useState([]);
  const { products, setProducts } = useContext(AppContext);
  useEffect(() => {
    const getStyles = async () => {
      try {
        const res = await axios.get(
          `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${40344}/styles`,
          {
            params: {
              product_id: 40344,
            },
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        setstylesData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getStyles();
  }, [products]);

  return (
    <StylesContext.Provider value={{stylesData, setstylesData}}>
      <Thumbnails/>
    </StylesContext.Provider>
  );
}
// useEffect(() => {
//   const getQs = async () => {
//     try {
//       const res = await axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', {
//         params: {
//           product_id: 40344,
//           page: 1,
//           count: 5
//         },
//         headers: {
//           'Authorization': `${TOKEN}`
//         }
//       });
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   getQs();
// }, []);