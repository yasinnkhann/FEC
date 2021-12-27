import React, { Fragment, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../../AppContext.js';
import QuestionsContext from './QuestionsContext.js';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

export default function AddAnswer({ closeModal, question }) {
  // CONTEXT
  const { products } = useContext(AppContext);
  const { questionsData } = useContext(QuestionsContext);

  // STATE
  const [imageFilesList, setImageFilesList] = useState([]);
  const [image, setImage] = useState('');

  // VARIABLES
  const specifiedProduct = products.filter(
    product => Number(product.id) === Number(questionsData.product_id)
  );

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  // METHODS
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const res = await axios.post(
        'http://localhost:3000/api/upload',
        formData,
        config
      );
      console.log('RES: ', res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = e => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  return (
    <Fragment>
      <Overlay>
        <Content
          // method='POST'
          // action='/api/upload'
          // enctype='multipart/form-data'
          onSubmit={handleSubmit}
        >
          <h2>Submit your Answer</h2>
          <h4>
            {specifiedProduct[0].name}: {question.question_body}
          </h4>
          <label htmlFor='yourAnswer'>Your Answer:</label>
          <textarea
            name='yourAnswer'
            id='yourAnswer'
            cols='45'
            rows='10'
            maxLength='1000'
          ></textarea>
          <br />
          <br />
          <label htmlFor='yourNickName'>Your Answer: </label>
          <input
            type='text'
            id='yourNickName'
            maxLength='60'
            placeholder='Example: jack543!'
          />
          <br />
          <span>
            - For privacy reasons, do not use your full name or email address.
          </span>
          <br />
          <br />
          <label htmlFor='yourEmail'>Your Email: </label>
          <input
            type='text'
            id='yourEmail'
            maxLength='60'
            placeholder='Example: jack@email.com'
          />
          <br />
          <span>- For authentication reasons, you will not be emailed.</span>
          <br />
          <br />
          <label htmlFor='uploadInput'>Upload Photos: (Max: 5) </label>
          <br />
          <input
            type='file'
            id='uploadInput'
            name='image'
            // multiple
            accept='image/*'
            onChange={handleFileUpload}
            // disabled={imageFilesList.length >= 5 ? true : false}
          ></input>
          <br />
          <br />
          <SubmitBtn type='submit'>Submit Answer</SubmitBtn>
          <CloseBtn onClick={closeModal}>
            <CloseIcon />
          </CloseBtn>
        </Content>
      </Overlay>
    </Fragment>
  );
}

const Overlay = styled.div`
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.form`
  background: white;
  width: 50rem;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  position: relative;
  padding-left: 35px;
  padding-bottom: 35px;
`;

const CloseBtn = styled.button`
  cursor: pointer;
  top: 1.5rem;
  right: 1.5rem;
  position: absolute;
  width: 3rem;
  height: 3rem;
`;

const SubmitBtn = styled.button``;
