import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import AddAnswer from './AddAnswer.jsx';
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
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  // METHODS
  const increaseQuestionHelpfulCount = (e, questionObj) => {
    e.preventDefault();
    //console.log(questionObj);
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

  const openAnswerModal = e => {
    e.preventDefault();
    setShowAnswerModal(true);
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
          <a href='' onClick={openAnswerModal}>
            <u>Add Answer</u>
          </a>
        </QuestionRightSection>
      </QuestionPortion>
      <br />
      {Object.keys(questionObj.answers)
        .map(key => (
          <AnswerPortion key={key}>
            <AnswerContainer>
              <strong>A:</strong>
              <AnswerBody>{questionObj.answers[key].body}</AnswerBody>
            </AnswerContainer>
            <AnswerDetails>
              <span>
                by:{' '}
                {questionObj.answers[key].answerer_name === 'Seller' ? (
                  <strong>{questionObj.answers[key].answerer_name}</strong>
                ) : (
                  questionObj.answers[key].answerer_name
                )}
                ,{' '}
                <Moment format='MMMM Do YYYY'>
                  {questionObj.answers[key].date}
                </Moment>{' '}
                | Helpful?{' '}
                <a href=''>
                  <u
                    onClick={e =>
                      increaseAnswerHelpfulCount(e, questionObj.answers[key])
                    }
                  >
                    Yes
                  </u>
                </a>{' '}
                ({questionObj.answers[key].helpfulness}) |{' '}
                <a
                  href=''
                  onClick={e =>
                    handleAnswerReported(e, questionObj.answers[key])
                  }
                >
                  <u>{answerReportedTracker[key] ? 'Reported' : 'Report'}</u>
                </a>
              </span>
            </AnswerDetails>
            {questionObj.answers[key].photos.length > 0 && (
              <PhotoContainer>
                {/* <PhotoBody>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
              alias, dignissimos sed itaque unde inventore in distinctio
              exercitationem blanditiis molestiae vel illum eius minus
              repudiandae rem sequi pariatur nobis! Voluptas.
            </PhotoBody> */}
                {/* <br /> */}
                <Photos>
                  {questionObj.answers[key].photos.map((photoSrc, idx) => (
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
        ))
        .sort(
          (a, b) =>
            questionObj.answers[b.key].helpfulness -
            questionObj.answers[a.key].helpfulness
        )}
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

const AnswerPortion = styled.div``;

const AnswerContainer = styled.div``;

const AnswerBody = styled.p``;

const AnswerDetails = styled.div``;

const PhotoContainer = styled.div``;

const PhotoBody = styled.p``;

const Photos = styled.div``;

const PhotoDetails = styled.div``;
