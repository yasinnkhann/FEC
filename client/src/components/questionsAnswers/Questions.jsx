import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import QuestionsContext from './QuestionsContext.js';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';

export default function Questions({ questionsData, filteredData }) {
  // CONTEXT
  const { useFilteredData, setUseFilteredData } = useContext(QuestionsContext);

  // STATE
  const [remainingQsList, setRemainingQsList] = useState([]);
  const [remainingQsCount, setRemainingQsCount] = useState(0);
  const [isRemainingQsBtnShown, setIsRemainingQsBtnShown] = useState(true);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  // VARIABLES
  let initialQs, remainingQs;

  if (!useFilteredData) {
    initialQs = questionsData
      ?.slice(0, 4)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ))
      .sort(
        (a, b) =>
          b.props.questionObj.question_helpfulness -
          a.props.questionObj.question_helpfulness
      );
    remainingQs = questionsData
      ?.slice(4)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ))
      .sort(
        (a, b) =>
          b.props.questionObj.question_helpfulness -
          a.props.questionObj.question_helpfulness
      );
  } else {
    initialQs = filteredData
      ?.slice(0, 4)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ))
      .sort(
        (a, b) =>
          b.props.questionObj.question_helpfulness -
          a.props.questionObj.question_helpfulness
      );
    remainingQs = filteredData
      ?.slice(4)
      .map(question => (
        <Question key={question.question_id} questionObj={question} />
      ))
      .sort(
        (a, b) =>
          b.props.questionObj.question_helpfulness -
          a.props.questionObj.question_helpfulness
      );
  }

  const showRemainingQsCondition =
    (questionsData.length !== 0 && !useFilteredData) ||
    (filteredData.length !== 0 && useFilteredData);

  const showMoreAnsweredQsCondition =
    (questionsData?.length > 4 && !useFilteredData) ||
    (filteredData.length !== 0 && useFilteredData);

  // METHODS
  const handleRemainingQs = remainingQs => {
    const remainingQsCopy = [...remainingQs];
    // console.log('remainingQsCopy: ', remainingQsCopy);
    // console.log(
    //   'remainingQs: ',
    //   remainingQsCopy[0]?.props?.questionObj?.answers
    // );

    let newEndPos = remainingQsCount + 2;
    // if pos exists
    if (remainingQsCopy.indexOf(newEndPos) !== -1) {
      const newRemainingQs = remainingQsCopy.slice(remainingQsCount, newEndPos);
      setRemainingQsCount(newEndPos);
      setRemainingQsList(newRemainingQs);
      setIsRemainingQsBtnShown(true);
      // if pos does not exist
    } else {
      setRemainingQsCount(0);
      setRemainingQsList(remainingQs);
      setIsRemainingQsBtnShown(false);
    }
    return;
  };

  return (
    <Container>
      {initialQs?.length > 0 && initialQs}
      {showMoreAnsweredQsCondition && isRemainingQsBtnShown ? (
        <MoreAnsweredQsBtn onClick={() => handleRemainingQs(remainingQs)}>
          More Answered Questions
        </MoreAnsweredQsBtn>
      ) : null}
      {remainingQsList?.length > 0 && showRemainingQsCondition
        ? remainingQsList
        : null}
      <CreateNewQBtn onClick={() => setShowQuestionModal(true)}>
        Submit a new question
      </CreateNewQBtn>
      {showQuestionModal && (
        <AddQuestion closeModal={() => setShowQuestionModal(false)} />
      )}
      {/* {console.log('INITIAL QS: ', initialQs)}
      {console.log('REMAINING QS: ', remainingQs)}
      {console.log('FILTERED DATA: ', filteredData)} */}
      {console.log('QUESTIONS DATA: ', questionsData)}
    </Container>
  );
}

const Container = styled.div`
  /* overflow-y: scroll; */
  max-height: 100vh;
  /* overflow-y: hidden; */
`;

const MoreAnsweredQsBtn = styled.button``;

const CreateNewQBtn = styled.button``;
