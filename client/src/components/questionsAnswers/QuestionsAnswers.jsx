import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TOKEN } from '../../config.js';
import AppContext from '../../AppContext.js';
import QuestionsContext from './QuestionsContext.js';
import Questions from './Questions.jsx';

export default function QuestionsAnswers() {
  // STATE
  const [questionsData, setQuestionsData] = useState([]);

  // CONTEXT
  const { products, setProducts } = useContext(AppContext);

  useEffect(() => {
    const getQs = async () => {
      try {
        const res = await axios.get(
          'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
          {
            params: {
              product_id: 40344,
              // product_id: products[0]?.id,
              // page: 1,
              // count: 1,
            },
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        setQuestionsData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getQs();
  }, [products]);

  return (
    <div className='qaWidget'>
      <QuestionsContext.Provider value={{ questionsData, setQuestionsData }}>
        {/* {console.log('FROM QA: ', products)} */}
        {console.log('QUESTIONS DATA: ', questionsData)}
        <h3>QUESTIONS & ANSWERS</h3>
        <Questions />
      </QuestionsContext.Provider>
    </div>
  );
}
