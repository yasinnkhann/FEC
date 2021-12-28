import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';
import QuestionsAnswers from './questionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import { TOKEN } from '../config.js';
import AppContext from '../AppContext.js';

export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get(
          'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
          {
            params: {
              // page: 1,
              count: 10,
            },
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        // console.log('PRODUCTS DATA:', res.data);
        setProducts(res.data);
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
          <AppContext.Provider value={{ products, setProducts }}>
            <Overview />
            <QuestionsAnswers />
            <RelatedItems />
            <RatingsReviews />
          </AppContext.Provider>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Fragment>
  );
}
