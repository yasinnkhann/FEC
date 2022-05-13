import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';
import QuestionsAnswers from './questionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import AppContext from '../AppContext.js';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { serverURL } from '../config.js';

const MasterContainer = styled.div`
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

const Header = styled.header`
  background-color: #38062b;
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  float: left;
  color: #fdf0d5;
  text-align: center;
  font-family: 'Questrial', sans-serif;
  padding: 1.25rem 1rem 1.25rem 0rem;
  font-size: 1.5rem;
  letter-spacing: 4.5px;
  text-transform: uppercase;
  margin-left: 1rem;
  cursor: pointer;
  &:hover {
    color: gold;
  }
  @media (min-width: 640px) {
    font-size: 2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
`;

const Routes = styled.p`
  font-family: 'Lobster Two', cursive;
  float: right;
  color: #fdf0d5;
  margin: 0 1rem;
  font-size: 1rem;
  align-self: center;
  text-decoration: underline;
  text-underline-offset: 1px;
  cursor: pointer;
  &:hover {
    color: gold;
  }
  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.75rem;
  }
`;

export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

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
        await axios.post(`${serverURL}/interactions`, body, {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToRelatedItems = () => {
    window.scrollTo({
      top: document.getElementById('related-items').offsetTop - 100,
      behavior: 'smooth',
    });
  };

  const scrollToQA = () => {
    window.scrollTo({
      top: document.getElementById('questions-answers').offsetTop - 100,
      behavior: 'smooth',
    });
  };

  const scrollToRR = () => {
    window.scrollTo({
      top: document.getElementById('ratings-reviews').offsetTop - 60,
      behavior: 'smooth',
    });
  };

  return (
    <MasterContainer>
      <Header>
        <Logo onClick={scrollToTop}>Slink</Logo>
        <Nav>
          <Routes onClick={scrollToTop}>Product Overview</Routes>
          <Routes onClick={scrollToRelatedItems}>Related Items</Routes>
          <Routes onClick={scrollToQA}>Questions &#38; Answers</Routes>
          <Routes onClick={scrollToRR}>Ratings &#38; Reviews</Routes>
        </Nav>
      </Header>
      <>
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
      </>
    </MasterContainer>
  );
}
