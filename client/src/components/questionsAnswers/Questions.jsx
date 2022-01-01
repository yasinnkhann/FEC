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
    (questionsData?.length > 4 && filteredData.length !== 0 && useFilteredData);

  // METHODS
  const handleRemainingQs = remainingQs => {
    const remainingQsCopy = [...remainingQs];
    // console.log('remainingQsCopy: ', remainingQsCopy);
    // console.log(
    //   'remainingQs: ',
    //   remainingQsCopy[0]?.props?.questionObj?.answers
    // );

    let newEndPos = remainingQsCount + 2;
    console.log('INITAL REMAING QS: ', initialRemainingQs);

    // if pos exists
    if (remainingQsCopy[newEndPos]) {
      const newRemainingQs = remainingQsCopy.slice(remainingQsCount, newEndPos);
      setRemainingQsCount(newEndPos);
      setRemainingQsList(initialRemainingQs.concat(newRemainingQs));
      setInitialRemainingQs(initialRemainingQs.concat(newRemainingQs));
      setIsRemainingQsBtnShown(true);
      // if pos does not exist
    } else {
      setRemainingQsCount(0);
      setRemainingQsList(remainingQsCopy);
      setIsRemainingQsBtnShown(false);
      setInitialRemainingQs([]);
    }
    return;
  };

  return (
    <Container>
      {initialQs?.length > 0 && initialQs}

      {remainingQsList?.length > 0 && showRemainingQsCondition
        ? remainingQsList
        : null}

      {showMoreAnsweredQsCondition && isRemainingQsBtnShown ? (
        <MoreAnsweredQsBtn onClick={() => handleRemainingQs(remainingQs)}>
          More Answered Questions
        </MoreAnsweredQsBtn>
      ) : null}

      <SubmitNewQBtn onClick={() => setShowQuestionModal(true)}>
        Submit a new question
      </SubmitNewQBtn>

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
  max-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-between;
  text-align: left;
`;

const MoreAnsweredQsBtn = styled.button`
  margin-top: 1rem;
	padding: 8px 12px;
	border-radius 6px;
	border: none;
	background: #000;
	color: #fff;
	cursor: pointer;
  margin-left: 43%;
`;

const SubmitNewQBtn = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
	padding: 8px 12px;
	border-radius 6px;
	border: none;
	background: #000;
	color: #fff;
	cursor: pointer;
  margin-left: 44%;
`;
