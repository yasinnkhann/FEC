import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import QuestionsContext from './QuestionsContext.js';

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

  // METHODS
  const increaseQuestionHelpfulCount = (e, questionObj) => {
    e.preventDefault();
    console.log(questionObj);
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
  };

  const increaseAnswerHelpfulCount = (e, answerObj) => {
    e.preventDefault();
    const keyId = answerObj.id;
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
          question.answers[keyId].helpfulness = incrementedCount;
          trackerCopy[keyId] = 'Incremented';
        }
      }
    }
    setQuestionsData({
      product_id: questionsData.product_id,
      results: questionsDataCopy,
    });
    setAnswerHelpfulTracker(trackerCopy);
  };

  const handleAnswerReported = (e, answerObj) => {
    e.preventDefault();
    const keyId = answerObj.id;
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
  };

  const handleMappedAnswers = answersObj => {
    return Object.keys(answersObj).map(key => {
      return (
        <AnswerPortion key={key}>
          <AnswerContainer>
            <strong>A:</strong>
            <AnswerBody>{answersObj[key].body}</AnswerBody>
          </AnswerContainer>
          <AnswerDetails>
            <span>
              By:{' '}
              {answersObj[key].answerer_name === 'Seller' ? (
                <strong>{answersObj[key].answerer_name}</strong>
              ) : (
                answersObj[key].answerer_name
              )}
              , <Moment format='MMMM Do YYYY'>{answersObj[key].date}</Moment> |
              Helpful?{' '}
              <a href=''>
                <u
                  onClick={e => increaseAnswerHelpfulCount(e, answersObj[key])}
                >
                  Yes
                </u>
              </a>{' '}
              ({answersObj[key].helpfulness}) |{' '}
              <a
                href=''
                onClick={e => handleAnswerReported(e, answersObj[key])}
              >
                <u>{answerReportedTracker[key] ? 'Reported' : 'Report'}</u>
              </a>
            </span>
          </AnswerDetails>
          {answersObj[key].photos.length > 0 && (
            <PhotoContainer>
              {/* <PhotoBody>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
              alias, dignissimos sed itaque unde inventore in distinctio
              exercitationem blanditiis molestiae vel illum eius minus
              repudiandae rem sequi pariatur nobis! Voluptas.
            </PhotoBody> */}
              {/* <br /> */}
              <Photos>
                {answersObj[key].photos.map((photoSrc, idx) => (
                  <img
                    key={idx}
                    src={photoSrc}
                    width='200'
                    height='200'
                    loading='lazy'
                  />
                ))}
              </Photos>
              {/* <PhotoDetails>
              <span>
                by: <strong>Seller</strong>, | Helpful?{' '}
                <a href=''>
                  <u>Yes</u>
                </a>{' '}
                (7) |{' '}
                <a href=''>
                  <u>Report</u>
                </a>
              </span>
            </PhotoDetails> */}
            </PhotoContainer>
          )}
        </AnswerPortion>
      );
    });
  };

  return (
    <Container>
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
          <a href=''>
            <u>Add Answer</u>
          </a>
        </QuestionRightSection>
      </QuestionPortion>
      <br />
      {handleMappedAnswers(questionObj.answers)}
      <hr style={{ height: 0.5, borderColor: 'red' }} />
    </Container>
  );
}

const Container = styled.div``;

const QuestionPortion = styled.div``;

const QuestionLeftSection = styled.div``;

const QuestionRightSection = styled.div``;

const QuestionBody = styled.h4``;

const QuestionHelpfulCount = styled.span``;

const AnswerPortion = styled.div``;

const AnswerContainer = styled.div``;

const AnswerBody = styled.p``;

const AnswerDetails = styled.div``;

const PhotoContainer = styled.div``;

const PhotoBody = styled.p``;

const Photos = styled.div``;

const PhotoDetails = styled.div``;
