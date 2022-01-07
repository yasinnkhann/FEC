import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppContext from '../../AppContext.js';
import QuestionsContext from './QuestionsContext.js';
import Questions from './Questions.jsx';
import Search from './Search.jsx';
import styled from 'styled-components';

const serverURL = 'http://localhost:3000/api';

export default function QuestionsAnswers() {
  // STATE
  const [questionsData, setQuestionsData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [useFilteredData, setUseFilteredData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // CONTEXT
  const { productsContext, selectedProductContext } = useContext(AppContext);

  const [products, setProducts] = productsContext;

  const [selectedProduct, setSelectedProduct] = selectedProductContext;

  // METHODS
  const handleSearchQuery = query => {
    setSearchQuery(query);
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
          `${serverURL}/qa/questions`,
          {
            params: {
              product_id: selectedProduct?.id,
              // product_id: products[345]?.id,
              // page: 1,
              count: 20,
            },
            headers: {
              'Content-Type': 'application/json',
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
    <div className='questions-and-answers'>
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
            <QandAHeader>Questions &#38; Answers</QandAHeader>
            <Search handleChange={handleSearchQuery} />
            <Questions
              questionsData={questionsData.results}
              filteredData={filteredQuestions}
              searchQuery={searchQuery}
            />
          </QuestionsContext.Provider>
        </>
      )}
      {/* {console.log('PRODUCTS FROM QA: ', products)} */}
      {/* {console.log('QUESTIONS DATA: ', questionsData)} */}
    </div>
  );
}

const QandAHeader = styled.h3 `
   font-size: xx-large;
   text-align: center;
   padding-bottom: 1rem;
   font-family: 'Lobster Two', cursive;
   color: #FDF0D5;
`;