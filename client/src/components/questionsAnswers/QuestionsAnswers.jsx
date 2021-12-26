import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { TOKEN } from '../../config.js';
import AppContext from '../../AppContext.js';
import QuestionsContext from './QuestionsContext.js';
import Questions from './Questions.jsx';
import SearchBar from './Search.jsx';

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
              // product_id: 40344,
              product_id: products[8]?.id,
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
        {/* {console.log('PRODUCTS FROM QA: ', products)} */}
        {console.log('QUESTIONS DATA: ', questionsData)}
        <QATitle>QUESTIONS &#38; ANSWERS</QATitle>
        <SearchBar />
        <Questions />
      </QuestionsContext.Provider>
    </div>
  );
}

const QATitle = styled.h3``;
