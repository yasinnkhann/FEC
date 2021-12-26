import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import QuestionsContext from './QuestionsContext.js';
import Question from './Question.jsx';
import { dummyQs } from './dummyQuestions.js';

export default function Questions() {
  // CONTEXT
  const { questionsData, setQuestionsData } = useContext(QuestionsContext);

  // STATE
  const [shouldRenderRemainingQs, setShouldRenderRemainingQuestions] =
    useState(false);

  const initialQs = questionsData?.results
    ?.slice(0, 4)
    .map(question => (
      <Question key={question.question_id} questionObj={question} />
    ));

  const handleRemainingQs = () => {
    setShouldRenderRemainingQuestions(true);
  };

  return (
    <Container>
      {initialQs?.length > 0 ? (
        initialQs
      ) : (
        <button>Submit a new question</button>
      )}
      {initialQs?.length > 0 && (
        <button onClick={handleRemainingQs}>More Answered Questions</button>
      )}
      {shouldRenderRemainingQs &&
        questionsData?.results
          ?.slice(4, questionsData?.results.length)
          .map(question => (
            <Question key={question.question_id} questionObj={question} />
          ))}
    </Container>
  );
}

const Container = styled.div``;
