import React, { useState, useContext, Suspense, lazy } from 'react';
import styled from 'styled-components';
import QuestionsContext from './QuestionsContext.js';

const Question = lazy(() => import('./Question.jsx'));
const AddQuestion = lazy(() => import('./AddQuestion.jsx'));

export default function Questions({
  questionsData,
  filteredData,
  searchQuery,
}) {
  // CONTEXT
  const { useFilteredData, setUseFilteredData } = useContext(QuestionsContext);

  // STATE
  const [remainingQsList, setRemainingQsList] = useState([]);
  const [remainingQsCount, setRemainingQsCount] = useState(0);
  const [isRemainingQsBtnShown, setIsRemainingQsBtnShown] = useState(true);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [initialRemainingQs, setInitialRemainingQs] = useState([]);

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
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <Question key={question.question_id} questionObj={question} />
          </Suspense>
        </>
      ))
      .sort(
        (a, b) =>
          b.props.questionObj.question_helpfulness -
          a.props.questionObj.question_helpfulness
      );
    remainingQs = filteredData
      ?.slice(4)
      .map(question => (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <Question key={question.question_id} questionObj={question} />
          </Suspense>
        </>
      ))
      .sort(
        (a, b) =>
          b.props.questionObj.question_helpfulness -
          a.props.questionObj.question_helpfulness
      );
  }

  const showRemainingQsCondition =
    (!useFilteredData && remainingQsList?.length > 0) ||
    (useFilteredData &&
      remainingQsList?.length > 0 &&
      filteredData.length === questionsData.length &&
      searchQuery.length === 0);

  const moreAnsweredQsBtnCondition =
    (!useFilteredData && questionsData?.length > 4) ||
    (useFilteredData &&
      questionsData?.length > 4 &&
      filteredData.length !== 0 &&
      searchQuery.length === 0);

  // METHODS
  const handleRemainingQs = () => {
    const remainingQsCopy = [...remainingQs];

    let newEndPos = remainingQsCount + 2;

    if (remainingQsCopy[newEndPos]) {
      const newRemainingQs = remainingQsCopy.slice(remainingQsCount, newEndPos);
      setRemainingQsCount(newEndPos);
      setRemainingQsList(initialRemainingQs.concat(newRemainingQs));
      setInitialRemainingQs(initialRemainingQs.concat(newRemainingQs));
      setIsRemainingQsBtnShown(true);
    } else {
      setRemainingQsCount(0);
      setRemainingQsList(remainingQsCopy);
      setIsRemainingQsBtnShown(false);
      setInitialRemainingQs([]);
    }
  };

  return (
    <Container>
      {initialQs?.length > 0 && initialQs}

      {showRemainingQsCondition ? remainingQsList : null}

      {moreAnsweredQsBtnCondition && isRemainingQsBtnShown ? (
        <MoreAnsweredQsBtn onClick={() => handleRemainingQs()}>
          More Answered Questions
        </MoreAnsweredQsBtn>
      ) : null}

      <SubmitNewQBtn onClick={() => setShowQuestionModal(true)}>
        Submit a new question
      </SubmitNewQBtn>

      {showQuestionModal && (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <AddQuestion closeModal={() => setShowQuestionModal(false)} />
          </Suspense>
        </>
      )}
      {/* {console.log('INITIAL QS: ', initialQs)}
      {console.log('REMAINING QS: ', remainingQs)}
      {console.log('FILTERED DATA: ', filteredData)} */}
      {/* {console.log('QUESTIONS DATA: ', questionsData)} */}
    </Container>
  );
}

const Container = styled.div`
  overflow-y: auto;
  padding: 0rem 1rem;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 10px;
  }
`;

const MoreAnsweredQsBtn = styled.button`
  margin-top: 1rem;
	padding: 8px 12px;
	border-radius 6px;
	border: none;
  background-color: #38062b;
	color: #fdf0d5;
	cursor: pointer;
  margin-left: 43%;
`;

const SubmitNewQBtn = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
	padding: 8px 12px;
	border-radius 6px;
	border: none;
	background-color: #fdf0d5;
	color: #38062b;
	cursor: pointer;
  margin-left: 44%;
`;
