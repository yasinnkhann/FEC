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
          <a href='#!'>
            <u>Yes</u>
          </a>
          {' '}
          <span className='questionContainer__question__rightSection__helpfulCount'>
            ({questionObj.question_helpfulness})
          </span>
          {' '}
          |
          {' '}
          <a href='#!'>
            <u>Add Answer</u>
          </a>
        </div>
      </div>
      <br />
      <div className='questionContainer__answerContainer'>
        <div className='questionContainer__answerContainer__answer'>
          <strong>A:</strong>
          <p className='questionContainer__answerContainer__answer__body'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi deleniti voluptas id itaque alias vel, dicta corrupti voluptatum quos iste nulla doloribus laudantium illo quae fuga molestiae consectetur dolor repellendus!
          </p>
        </div>
        <div className='questionContainer__answerContainer__details'>
          <span>
            by: Yasin, | Helpful? 
            {' '}
            <a href="#!">
              <u>Yes</u>
            </a>
            {' '}
            (2) | 
            {' '}
            <a href="#!"><u>Report</u></a>
          </span> 
        </div>
        <div className='questionContainer__answerContainer__photoContainer'>
          <p className='questionContainer__answerContainer__photoContainer__body'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores alias, dignissimos sed itaque unde inventore in distinctio exercitationem blanditiis molestiae vel illum eius minus repudiandae rem sequi pariatur nobis! Voluptas.
          </p>
          <br/>
          <div className='questionContainer__answerContainer__photoContainer__photos'>
            <img 
              className='questionContainer__answerContainer__photoContainer__photos__photo'
            />
          </div>
          <div className='questionContainer__answerContainer__photoContainer__details'>

          </div>
          <span>
            by: <strong>Seller</strong>, | Helpful? 
            {' '}
            <a href="#!">
              <u>Yes</u>
            </a> 
            {' '}
            (7) | 
            {' '}
            <a href="#!">
              <u>Report</u>
            </a>
          </span>
        </div>
        <hr style={{height: .5, borderColor: 'red'}}/> 
      </div>
    </div>
  );
}

