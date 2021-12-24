import React from 'react';
import styled from 'styled-components';

export default function Question({ questionObj }) {
  return (
    <Container>
      <QuestionPortion>
        <QuestionLeftSection>
          <QuestionBody>Q: {questionObj.question_body}</QuestionBody>
        </QuestionLeftSection>
        <QuestionRightSection>
          <span>Helpful?</span>{' '}
          <a href='#!'>
            <u>Yes</u>
          </a>{' '}
          <QuestionHelpfulCount>
            ({questionObj.question_helpfulness})
          </QuestionHelpfulCount>{' '}
          <a href='#!'>
            <u>Add Answer</u>
          </a>
        </QuestionRightSection>
      </QuestionPortion>
      <br />
      <AnswerPortion>
        <AnswerContainer>
          <strong>A:</strong>
          <AnswerBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            deleniti voluptas id itaque alias vel, dicta corrupti voluptatum
            quos iste nulla doloribus laudantium illo quae fuga molestiae
            consectetur dolor repellendus!
          </AnswerBody>
        </AnswerContainer>
        <AnswerDetails>
          <span>
            by: Yasin, | Helpful?{' '}
            <a href='#!'>
              <u>Yes</u>
            </a>{' '}
            (2) |{' '}
            <a href='#!'>
              <u>Report</u>
            </a>
          </span>
        </AnswerDetails>
        <PhotoContainer>
          <PhotoBody>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
            alias, dignissimos sed itaque unde inventore in distinctio
            exercitationem blanditiis molestiae vel illum eius minus repudiandae
            rem sequi pariatur nobis! Voluptas.
          </PhotoBody>
          <br />
          <Photos>
            <img />
            <img />
          </Photos>
          <PhotoDetails>
            <span>
              by: <strong>Seller</strong>, | Helpful?{' '}
              <a href='#!'>
                <u>Yes</u>
              </a>{' '}
              (7) |{' '}
              <a href='#!'>
                <u>Report</u>
              </a>
            </span>
          </PhotoDetails>
        </PhotoContainer>
        <hr style={{ height: 0.5, borderColor: 'red' }} />
      </AnswerPortion>
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
