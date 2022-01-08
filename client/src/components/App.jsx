import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';
import QuestionsAnswers from './questionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import AppContext from '../AppContext.js';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import { serverURL } from '../config.js';

const Body = styled.div`
  font-family: 'Open Sans';
  font-style: normal;
  background: #38062b;
  background: linear-gradient(
    0deg,
    rgba(56, 6, 43, 1) 10%,
    rgba(177, 169, 172, 1) 51%,
    rgba(253, 240, 213, 1) 100%
  );
`;

const HeaderDiv = styled.div`
  background-color: #38062b;
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
`;
const PageName = styled.div`
  float: left;
  color: #fdf0d5;
  text-align: center;
  font-family: 'Questrial', sans-serif;
  padding: 20px 20px;
  font-size: 35px;
  letter-spacing: 4.5px;
  text-transform: uppercase;
  margin-left: 1rem;
`;
const Routes = styled.a`
  float: right;
  color: #fdf0d5;
  text-align: center;
  font-family: 'Lobster Two', cursive;
  padding: 20px 20px;
  font-size: 20px;
  &:hover {
    color: #b1a9ac;
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
          const res = await axios.get(`${serverURL}/products`);

          setProducts(res.data);
          setSelectedProduct(res.data[0]);
          setIsLoaded(true);
        } catch (err) {
          console.error(err);
        }
      };
      getApi();
    }, 400);

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
        const res = await axios.post(`${serverURL}/interactions`, body, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (err) {
        console.error(err);
      }
    };

    sendClickData();
  });

  return (
    <Body>
      <HeaderDiv>
        <PageName>Slink</PageName>
        <Routes href='#ratings-reviews'>Ratings &#38; Reviews</Routes>
        <Routes href='#questions-answers'>Questions &#38; Answers</Routes>
        <Routes href='#related-items'>Related Items</Routes>
        <Routes href='#product-overview'>Product Overview</Routes>
      </HeaderDiv>
      <Fragment>
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
            color='#38062B'
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
    </Body>
  );
}
