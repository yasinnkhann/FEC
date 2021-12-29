import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Moment from 'react-moment';
import AddAnswer from './AddAnswer.jsx';
import QuestionsContext from './QuestionsContext.js';
import { TOKEN } from '../../config.js';

export default function Question({ questionObj }) {
  // CONTEXT
  const { questionsData, setQuestionsData } = useContext(QuestionsContext);

  // STATE
  const [answerHelpfulTracker, setAnswerHelpfulTracker] = useState({});
  const [
    hasQuestionHelpfulCountIncremented,
    setHasQuestionHelpfulCountIncremented,
  ] = useState(false);
  const [answerReportedTracker, setAnswerReportedTracker] = useState({});
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [hasQuestionBeenReported, setHasQuestionBeenReported] = useState(false);

  // METHODS
  useEffect(() => {
    const getAnswers = async () => {
      try {
        const res = await axios.get(
          `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionObj.question_id}/answers`,
          {
            // params: {
            //   page: 1,
            //   count: 1,
            // },
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        setAnswers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAnswers();
  }, []);

  const increaseQuestionHelpfulCount = async (e, questionObj) => {
    e.preventDefault();
    try {
      const body = {};
      const res = await axios.put(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionObj.question_id}/helpful`,
        body,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      console.log('Q HELPFUL PUT RES: ', res);

      const questionsDataCopy = [...questionsData.results];
      let incrementedCount = questionObj.question_helpfulness + 1;
      for (let i = 0; i < questionsDataCopy.length; i++) {
        let question = questionsDataCopy[i];
        for (let key in question) {
          if (
            question[key] === questionObj.question_id &&
            !hasQuestionHelpfulCountIncremented
          ) {
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
  };

  const increaseAnswerHelpfulCount = async (e, answerObj) => {
    e.preventDefault();
    try {
      const body = {};
      const res = await axios.put(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerObj.answer_id}/helpful`,
        body,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      console.log('ANS HELPFUL PUT RES: ', res);

      const keyId = answerObj.answer_id;
      const trackerCopy = Object.assign({}, answerHelpfulTracker);
      const questionsDataCopy = [...questionsData.results];
      let incrementedCount = answerObj.helpfulness + 1;
      for (let i = 0; i < questionsDataCopy.length; i++) {
        let question = questionsDataCopy[i];
        for (let key in question) {
          if (
            question[key] === questionObj.question_id &&
            !trackerCopy.hasOwnProperty([keyId])
          ) {
            answerObj.helpfulness = incrementedCount;
            trackerCopy[keyId] = 'Incremented';
          }
        }
      }
      setQuestionsData({
        product_id: questionsData.product_id,
        results: questionsDataCopy,
      });
      setAnswerHelpfulTracker(trackerCopy);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuestionsReported = async (e, questionObj) => {
    e.preventDefault();
    const body = {};
    try {
      const res = await axios.put(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionObj.question_id}/report`,
        body,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      console.log('Q REPORTED PUT RES: ', res);

      const questionsDataCopy = [...questionsData.results];
      const idx = questionsDataCopy.findIndex(
        question => question.question_id === questionObj.question_id
      );
      if (!hasQuestionBeenReported) {
        questionsDataCopy[idx].reported = true;
        setQuestionsData({
          product_id: questionsData.product_id,
          results: questionsDataCopy,
        });
        setHasQuestionBeenReported(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerReported = async (e, answerObj) => {
    e.preventDefault();
    try {
      const body = {};
      const res = await axios.put(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerObj.answer_id}/report`,
        body,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      console.log('ANS REPORTED PUT RES: ', res);

      const keyId = answerObj.answer_id;
      const trackerCopy = Object.assign({}, answerReportedTracker);
      const questionsDataCopy = [...questionsData.results];
      for (let i = 0; i < questionsDataCopy.length; i++) {
        let question = questionsDataCopy[i];
        for (let key in question) {
          if (
            question[key] === questionObj.question_id &&
            !trackerCopy.hasOwnProperty([keyId])
          ) {
            trackerCopy[keyId] = 'Reported';
          }
        }
      }
      setQuestionsData({
        product_id: questionsData.product_id,
        results: questionsDataCopy,
      });
      setAnswerReportedTracker(trackerCopy);
    } catch (err) {
      console.error(err);
    }
  };

  const openAnswerModal = e => {
    e.preventDefault();
    setShowAnswerModal(true);
  };

  // VARIABLES
  const sellerAnswers = answers?.results?.filter(
    answer => answer.answerer_name === 'Seller'
  );

  const orderedAnswers = answers?.results
    ?.sort((a, b) => b.helpfulness - a.helpfulness)
    ?.filter(answer => answer.answerer_name !== 'Seller');

  const finalAnswers = sellerAnswers?.concat(orderedAnswers);

  const mappedAnswers = finalAnswers?.map(answer => (
    <AnswerPortion key={answer?.answer_id}>
      <AnswerContainer>
        <strong>A:</strong>
        <AnswerBody>{answer?.body}</AnswerBody>{' '}
      </AnswerContainer>
      <AnswerDetails>
        <span>
          by:{' '}
          {answer?.answerer_name === 'Seller' ? (
            <strong>{answer?.answerer_name}</strong>
          ) : (
            answer?.answerer_name
          )}
          , <Moment format='MMMM Do YYYY'>{answer?.date}</Moment> | Helpful?{' '}
          <a href=''>
            <u onClick={e => increaseAnswerHelpfulCount(e, answer)}>Yes</u>
          </a>{' '}
          ({answer?.helpfulness}) |{' '}
          <a href='' onClick={e => handleAnswerReported(e, answer)}>
            <u>
              {answerReportedTracker[answer?.answer_id] ? 'Reported' : 'Report'}
            </u>
          </a>
        </span>
      </AnswerDetails>
      {answer?.photos.length > 0 && (
        <PhotoContainer>
          <Photos>
            {answer?.photos?.map((photoSrc, idx) => (
              <img
                key={idx}
                src={photoSrc.url}
                width='200'
                height='200'
                loading='lazy'
              />
            ))}
          </Photos>
        </PhotoContainer>
      )}
    </AnswerPortion>
  ));

  return (
    <Container>
      {console.log('SELLERS: ', sellerAnswers)}
      {console.log('ORDERED: ', orderedAnswers)}
      {console.log('FINAL: ', finalAnswers)}
      {/* {console.log('NO SELLERS: ', noSellerArr)} */}
      {/* {console.log('ANS ARR: ', ansArr)} */}
      <QuestionPortion>
        <QuestionLeftSection>
          <QuestionBody>Q: {questionObj.question_body}</QuestionBody>
        </QuestionLeftSection>
        <QuestionRightSection>
          <span>Helpful?</span>{' '}
          <a
            href=''
            onClick={e => increaseQuestionHelpfulCount(e, questionObj)}
          >
            <u>Yes</u>
          </a>{' '}
          <QuestionHelpfulCount>
            ({questionObj.question_helpfulness})
          </QuestionHelpfulCount>{' '}
          <QuestionReportStatus>
            |{' '}
            <a href='' onClick={e => handleQuestionsReported(e, questionObj)}>
              <u>{questionObj.reported ? 'Reported' : 'Report'}</u>
            </a>
            {' | '}
          </QuestionReportStatus>
          <a href='' onClick={openAnswerModal}>
            <u>Add Answer</u>
          </a>
        </QuestionRightSection>
      </QuestionPortion>
      <br />
      {mappedAnswers}
      <hr style={{ height: 0.5, borderColor: 'red' }} />
      {showAnswerModal && (
        <AddAnswer
          closeModal={() => setShowAnswerModal(false)}
          question={questionObj}
        />
      )}
    </Container>
  );
}

const Container = styled.div``;

const QuestionPortion = styled.div``;

const QuestionLeftSection = styled.div``;

const QuestionRightSection = styled.div``;

const QuestionBody = styled.h4``;

const QuestionHelpfulCount = styled.span``;

const QuestionReportStatus = styled.span``;

const AnswerPortion = styled.div``;

const AnswerContainer = styled.div``;

const AnswerBody = styled.p``;

const AnswerDetails = styled.div``;

const PhotoContainer = styled.div``;

const Photos = styled.div``;
