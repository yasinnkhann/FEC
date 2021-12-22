import React, { useEffect } from 'react';
import axios from 'axios';
import ProductDetail from './productDetail/ProductDetail.jsx';
import QuestionsAnswers from './questionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import { TOKEN } from '../config.js'

export default function App() {

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
          headers: {
            'Authorization': TOKEN
          }
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getApi();
  }, []);

  return (
    <div>
      <ProductDetail />
      <QuestionsAnswers />
      <RatingsReviews />
      <RelatedItems />
    </div>
  );
}
