import React from 'react';

export default function Question() {
  return (
    <div className='question'>
      <h4 className='questionBody'>Q: {questionObj.question_body}</h4>
      <span className='questionHelpful'>
        Helpful?
        <a href='#!'>
          <u>Yes</u>
        </a>
        <span className='questionHelpfulCount'>
          ({questionObj.question_helpfulness})
        </span>{' '}
        |
        <a className='addAnswer' href='#!'>
          <u>Add Answer</u>
        </a>
      </span>
      {/* <hr  style={{height: .5, borderColor : 'red'}}/> */}
    </div>
  );
}
