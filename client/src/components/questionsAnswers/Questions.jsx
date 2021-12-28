import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import QuestionsContext from './QuestionsContext.js';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';

export default function Questions({ questionsData, filteredData }) {
  // CONTEXT
  const { useFilteredData, setUseFilteredData } = useContext(QuestionsContext);

  // STATE
  const [showRemainingQs, setShowRemainingQs] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  // VARIABLES
  let initialQs, remainingQs;
  if (!useFilteredData) {
    initialQs = questionsData
      ?.slice(0, 4)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ));
    remainingQs = questionsData
      ?.slice(4, questionsData?.length)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ));
  } else {
    initialQs = filteredData
      ?.slice(0, 4)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ));
    remainingQs = questionsData
      ?.slice(4, questionsData?.length)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ));
  }

  return (
    <Container>
      {initialQs?.length > 0 ? (
        initialQs
      ) : (
        <SubmitNewQBtn onClick={() => setShowQuestionModal(true)}>
          Submit a new question
        </SubmitNewQBtn>
      )}
      {questionsData?.length > 4 && !showRemainingQs ? (
        <MoreAnsweredQsBtn onClick={() => setShowRemainingQs(true)}>
          More Answered Questions
        </MoreAnsweredQsBtn>
      ) : null}
      {showRemainingQs && filteredData.length !== 0 ? remainingQs : null}
      {showQuestionModal && (
        <AddQuestion closeModal={() => setShowQuestionModal(false)} />
      )}
    </Container>
  );
}

const Container = styled.div``;

const SubmitNewQBtn = styled.button``;

const MoreAnsweredQsBtn = styled.button``;
