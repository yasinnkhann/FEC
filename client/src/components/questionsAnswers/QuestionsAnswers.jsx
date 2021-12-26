import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { TOKEN } from '../../config.js';
import AppContext from '../../AppContext.js';
import QuestionsContext from './QuestionsContext.js';
import Questions from './Questions.jsx';
import Search from './Search.jsx';

export default function QuestionsAnswers() {
  // STATE
  const [questionsData, setQuestionsData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [useFilteredData, setUseFilteredData] = useState(false);

  // CONTEXT
  const { products, setProducts } = useContext(AppContext);

  // METHODS
  const handleSearchQuery = query => {
    setUseFilteredData(true);
    if (query.length < 2) {
      setFilteredQuestions(questionsData.results);
    } else {
      const questionsCopy = [...questionsData.results];
      const refinedQuestions = questionsCopy.filter(question =>
        question.question_body.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredQuestions(refinedQuestions);
    }
  };

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
        setLoadingStatus(true);
      } catch (err) {
        console.error(err);
      }
    };

    getQs();
  }, [products]);

  return (
    <div className='qaWidget'>
      <QuestionsContext.Provider
        value={{
          questionsData,
          setQuestionsData,
          useFilteredData,
          setUseFilteredData,
        }}
      >
        {/* {console.log('PRODUCTS FROM QA: ', products)} */}
        {console.log('QUESTIONS DATA: ', questionsData)}
        <QATitle>QUESTIONS &#38; ANSWERS</QATitle>
        {loadingStatus && (
          <>
            <Search handleChange={handleSearchQuery} />
            <Questions
              questionsData={questionsData.results}
              filteredData={filteredQuestions}
            />
            {/* <Questions questionsData={filteredQuestions} /> */}
          </>
        )}
      </QuestionsContext.Provider>
    </div>
  );
}

const QATitle = styled.h3``;
