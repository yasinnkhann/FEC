import React from 'react';

export default function Question({ questionObj }) {
  return (
    <div className='questionContainer'>
      <div className='questionContainer__question'>
        <div className='questionContainer__question__leftSection'>
          <h4>Q: {questionObj.question_body}</h4>
        </div>
        <div className='questionContainer__question__rightSection'>
          <span>Helpful?</span>
          {' '}
          <a href='#!'><u>Yes</u></a>
          {' '}
          <span className='questionContainer__question__rightSection__helpfulCount'>
            ({questionObj.question_helpfulness})
          </span>
          {' '}
          |
          {' '}
          <a href='#!'><u>Add Answer</u></a>
        </div>
      </div>
    </div>
  );
}
{ /* <hr  style={{height: .5, borderColor : 'red'}}/> */ }

