import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';
import QuestionsAnswers from './questionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import { TOKEN } from '../config.js';
import AppContext from '../AppContext.js';
import Loader from 'react-loader-spinner';

export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]); // For selecting the current product to be shown

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get(
          'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
          {
            params: {
              // page: 1,
              count: 2000,
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
  }, []);

  return (
    <Fragment>
      {isLoaded ? (
        <>
          <AppContext.Provider value={{
            productsContext: [products, setProducts],
            selectedProductContext: [selectedProduct, setSelectedProduct]}}
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
          color='green'
          height={160}
          width={160}
          arialLabel='loading-indicator'
        />
      )}
    </Fragment>
  );
}
