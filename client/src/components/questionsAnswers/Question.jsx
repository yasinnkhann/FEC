import React from 'react';

export default function Question({ questionObj }) {
  return (
    <div className='question'>
      <h4 className='question__body'>Q: {questionObj.question_body}</h4>
      <span className='question__helpful'>
        Helpful?
        <a href='#!'>
          <u>Yes</u>
        </a>
        <span className='question__helpfulCount'>
          ({questionObj.question_helpfulness})
        </span>{' '}
        |
        <a className='question__addAnswer' href='#!'>
          <u>Add Answer</u>
        </a>
      </span>
      {/* <hr  style={{height: .5, borderColor : 'red'}}/> */}
    </div>
  );
}
