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
    let clearId = setTimeout(() => {
      const getApi = async () => {
        try {
          const res = await axios.get(
            'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
            {
              params: {
                // page: 1,
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
          'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/interactions',
          body,
          {
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
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
