import React, { useEffect } from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';
import QuestionsAnswers from './questionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './ratingsReviews/RatingsReviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import { TOKEN } from '../config.js'

const App = () => {

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api', {
          headers: {
            'Authorization': `${TOKEN}`
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
      <Overview />
      <QuestionsAnswers />
      <RatingsReviews />
      <RelatedItems />
    </div>
  );
}

export default App;