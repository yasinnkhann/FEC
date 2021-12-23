import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TOKEN } from '../../config.js';
import AppContext from '../../AppContext.js';

export default function QuestionsAnswers() {
  const { products, setProducts } = useContext(AppContext);

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

  return (
    <div>
      Hello from questions and answers!!!
      {/* {console.log('FROM QA: ', products)} */}
    </div>
  );
}
