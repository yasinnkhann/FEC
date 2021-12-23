import React, { useContext } from 'react';
import QuestionsContext from './QuestionsContext.js';
import Question from './Question.jsx';
import { dummyQs } from './dummyQuestions.js';

export default function Questions() {
  // CONTEXT
  const { questionsData, setQuestionsData } = useContext(QuestionsContext);

  const mappedQs = questionsData?.results?.map(question => (
    <Question key={question.question_id} questionObj={question} />
  ));

  return (
    <div className='questionsContainer'>
      {mappedQs}
    </div>
  );
}
