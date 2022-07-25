import React, { useState, useContext, lazy, Suspense } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QuestionsContext from './QuestionsContext.js';
import { serverURL } from '../../config.js';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Answer = lazy(() => import('./Answer.jsx'));
const AddAnswer = lazy(() => import('./AddAnswer.jsx'));

export default function Question({ questionObj }) {
  // CONTEXT
  const { questionsData, setQuestionsData } = useContext(QuestionsContext);

  // STATE
  const [
    hasQuestionHelpfulCountIncremented,
    setHasQuestionHelpfulCountIncremented,
  ] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [hasQuestionBeenReported, setHasQuestionBeenReported] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // METHODS
  const increaseQuestionHelpfulCount = async (e, questionObj) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasQuestionHelpfulCountIncremented) {
      try {
        const body = {};
        const res = await axios.put(`${serverURL}/qa/question/helpful`, body, {
          params: {
            question_id: questionObj.question_id,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Q HELPFUL PUT RES: ', res);

        const questionsDataCopy = [...questionsData.results];
        let incrementedCount = questionObj.question_helpfulness + 1;
        for (let i = 0; i < questionsDataCopy.length; i++) {
          let question = questionsDataCopy[i];
          for (let key in question) {
            if (question[key] === questionObj.question_id) {
              question.question_helpfulness = incrementedCount;
              setHasQuestionHelpfulCountIncremented(true);
            }
          }
        }
        setQuestionsData({
          product_id: questionsData.product_id,
          results: questionsDataCopy,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleQuestionsReported = async (e, questionObj) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasQuestionBeenReported) {
      const body = {};
      try {
        const res = await axios.put(`${serverURL}/qa/question/report`, body, {
          params: {
            question_id: questionObj.question_id,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Q REPORTED PUT RES: ', res);

        const questionsDataCopy = [...questionsData.results];
        const idx = questionsDataCopy.findIndex(
          question => question.question_id === questionObj.question_id
        );
        questionsDataCopy[idx].reported = true;
        setQuestionsData({
          product_id: questionsData.product_id,
          results: questionsDataCopy,
        });
        setHasQuestionBeenReported(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openAnsModal = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowAnswerModal(true);
  };

  const renderQ = () => {
    return (
      <QuestionPortion onClick={() => setIsExpanded(!isExpanded)}>
        <QuestionLeftSide>
          <QuestionBodySec>Q: {questionObj.question_body}</QuestionBodySec>{' '}
        </QuestionLeftSide>
        <QuestionRightSide>
          <QuestionHelpfulSec>
            Helpful?{' '}
            <a
              href=''
              onClick={e => increaseQuestionHelpfulCount(e, questionObj)}
              style={{ color: 'green' }}
            >
              <u>Yes</u>
            </a>{' '}
            ({questionObj.question_helpfulness})&nbsp;|&nbsp;
          </QuestionHelpfulSec>{' '}
          <QuestionReportedSec>
            <a
              href=''
              onClick={e => handleQuestionsReported(e, questionObj)}
              style={{ color: 'red' }}
            >
              <u>{questionObj.reported ? 'Reported' : 'Report'}</u>
            </a>
            &nbsp;|&nbsp;
          </QuestionReportedSec>
          <AddAnswerSec>
            {' '}
            <a href='' onClick={openAnsModal} style={{ color: 'dodgerblue' }}>
              {' '}
              <u>Add Answer</u>
            </a>
          </AddAnswerSec>
          {(isExpanded && <StyledExpandLessIcon />) || <StyledExpandMoreIcon />}
        </QuestionRightSide>
      </QuestionPortion>
    );
  };

  return (
    <Container>
      {renderQ()}
      {isExpanded && (
        <>
          <hr />
          <Suspense fallback={<></>}>
            <Answer questionObj={questionObj} />
          </Suspense>
        </>
      )}
      {showAnswerModal && (
        <>
          <Suspense fallback={<></>}>
            <AddAnswer
              closeModal={() => setShowAnswerModal(false)}
              question={questionObj}
            />
          </Suspense>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: #fdf0d5;
  color: #38062b;
  margin-top: 1rem;
  box-shadow: 1px 1px 10px #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  position: relative;
`;

const QuestionPortion = styled.div`
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    font-size: 1rem;
    flex-direction: row;
  }
`;

const QuestionLeftSide = styled.div`
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const QuestionRightSide = styled.div`
  display: flex;
  place-content: stretch flex-end;
  -webkit-box-pack: end;
  justify-content: flex-start;

  @media (min-width: 768px) {
    display: flex;
    -webkit-align-content: stretch;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    align-items: flex-start;
  }
`;

const QuestionBodySec = styled.span`
  font-weight: bold;
`;

const QuestionHelpfulSec = styled.span``;

const QuestionReportedSec = styled.span``;

const AddAnswerSec = styled.span`
  margin-right: 3rem;
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  &&& {
    color: #38062b;
    font-size: 2.5rem;
    position: absolute;
    right: 0;
    top: 0.5rem;
  }

  @media (min-width: 768px) {
    &&& {
      top: 0.3rem;
    }
  }
`;

const StyledExpandLessIcon = styled(ExpandLessIcon)`
  &&& {
    color: #38062b;
    font-size: 2.5rem;
    position: absolute;
    right: 0;
    top: 0.5rem;
  }

  @media (min-width: 768px) {
    &&& {
      top: 0.3rem;
    }
  }
`;
