import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';
import QuestionsAnswers from './questionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import { TOKEN } from '../config.js';
import AppContext from '../AppContext.js';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle `
 @import url('https://fonts.googleapis.com/css2?family=Open+Sans');
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;
export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]); // For selecting the current product to be shown

  useEffect(() => {
    let clearId = setTimeout(() => {
      const getApi = async () => {
        try {

          // DO NOT REMOVE -> WILL BE OUR NEW MAIN API CALL
          // const res = await axios.get(
          //   'http://localhost:3000/api/products'
          // );

          // LEAVING FOR NOW SO AS TO NOT BREAK EVERYTHING LOL
          const res = await axios.get(
            'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
            {
              params: {
                page: 1,
                count: 200,
              },
              headers: {
                Authorization: `${TOKEN}`,
              },
            }
          );

          setProducts(res.data);
          setSelectedProduct(res.data[0]);
          setIsLoaded(true);
        } catch (err) {
          console.error(err);
        }
      };
      getApi();
    }, 1000);

    return () => clearTimeout(clearId);
  }, []);

  document.body.addEventListener('click', e => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    const element = e.srcElement.localName;
    const widgetData = e.path.slice(-6);
    const widget = widgetData[0].className;
    const date = new Date().toISOString();

    const sendClickData = async () => {
      try {
        const body = {
          element: element,
          widget: widget,
          time: date,
        };
        const res = await axios.post(
          'https://127.0.0.1:3000/interactions',
          body
        );
        // console.log(res);
      } catch (err) {
        console.error(err);
      }
    };

    sendClickData();
  });

  return (
    <Fragment>
      <GlobalStyles/>
      {isLoaded ? (
        <>
          <AppContext.Provider
            value={{
              productsContext: [products, setProducts],
              selectedProductContext: [selectedProduct, setSelectedProduct],
            }}
          >
            <Overview />
            <RelatedItems />
            <QuestionsAnswers />
            <RatingsReviews />
          </AppContext.Provider>
        </>
      ) : (
        <Loader
          type='Oval'
          color='blue'
          height={160}
          width={160}
          arialLabel='loading-indicator'
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </Fragment>
  );
}
