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

  const [selectedProduct, setSelectedProduct] = selectedProductContext;

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
              product_id: selectedProduct?.id,
              // product_id: products[345]?.id,
              // page: 1,
              count: 100,
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
  }, [selectedProduct]);

  return (
    <QAWidget>
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
            <h3>QUESTIONS &#38; ANSWERS</h3>
            <Search handleChange={handleSearchQuery} />
            <Questions
              questionsData={questionsData.results}
              filteredData={filteredQuestions}
            />
          </QuestionsContext.Provider>
        </>
      )}
      {/* {console.log('PRODUCTS FROM QA: ', products)}
      {console.log('QUESTIONS DATA: ', questionsData)} */}
    </QAWidget>
  );
}

const QAWidget = styled.div``;
