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
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [useFilteredData, setUseFilteredData] = useState(false);

  // CONTEXT
  const { productsContext, selectedProductContext } = useContext(AppContext);

  const [products, setProducts] = productsContext;

  // METHODS
  const handleSearchQuery = query => {
    setUseFilteredData(true);
    if (query.length < 2) {
      setFilteredQuestions(questionsData.results);
    } else {
      const questionsCopy = [...questionsData.results];
      const questionsFiltered = questionsCopy.filter(question =>
        question.question_body.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredQuestions(questionsFiltered);
    }
  };

  useEffect(() => {
    const getQs = async () => {
      try {
        const res = await axios.get(
          'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
          {
            params: {
              // product_id: 40347,
              product_id: products[54]?.id,
              // page: 1,
              count: 20,
            },
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        setQuestionsData(res.data);
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    getQs();
  }, []);

  return (
    <div className='qaWidget'>
      <QATitle>QUESTIONS &#38; ANSWERS</QATitle>

      {isLoaded && (
        <>
          <QuestionsContext.Provider
            value={{
              questionsData,
              setQuestionsData,
              useFilteredData,
              setUseFilteredData,
            }}
          >
            <Search handleChange={handleSearchQuery} />
            <Questions
              questionsData={questionsData.results}
              filteredData={filteredQuestions}
            />
          </QuestionsContext.Provider>
        </>
      )}
      {/* {console.log('PRODUCTS FROM QA: ', products)} */}
      {/* {console.log('QUESTIONS DATA: ', questionsData)} */}
    </div>
  );
}

const QATitle = styled.h3``;
