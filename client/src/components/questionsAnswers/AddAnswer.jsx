import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AppContext from '../../AppContext.js';
import CloseIcon from '@material-ui/icons/Close';
import QuestionsContext from './QuestionsContext.js';
import { v4 as uuidv4 } from 'uuid';

export default function AddAnswer({ closeModal, question }) {
  // CONTEXT
  const { products } = useContext(AppContext);
  const { questionsData } = useContext(QuestionsContext);

  // STATE
  const [numOfImages, setNumOfImages] = useState(0);
  const [images, setImages] = useState('');
  const [formData, setFormData] = useState({
    yourAnswer: '',
    yourNickName: '',
    yourEmail: '',
  });

  // VARIABLES
  const specifiedProduct = products.filter(
    product => Number(product.id) === Number(questionsData.product_id)
  );

  // METHODS
  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, hasChanged: true, [name]: value });
  };

  const handleFileUpload = e => {
    setNumOfImages(e.target.files.length);
    setImages(e.target.files);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('images', images);

    for (const key of Object.keys(images)) {
      formData.append('images', images[key]);
    }

    try {
      const res = await axios.post(
        'http://localhost:3000/api/qa/uploads',
        formData
      );
      console.log('RES: ', res);
      closeModal();
    } catch (err) {
      console.error(err);
      alert('Cannot upload files more than 5 files');
      setNumOfImages(0);
    }
  };

  return (
    <Fragment>
      <Overlay>
        <Content onSubmit={handleSubmit}>
          <h2>Submit your Answer</h2>
          <h4>
            {specifiedProduct[0].name}: {question.question_body}
          </h4>
          <label htmlFor='yourAnswer'>
            Your Answer<span style={{ color: 'red' }}>* </span>
          </label>
          <textarea
            name='yourAnswer'
            value={formData.yourAnswer}
            onChange={handleChange}
            id='yourAnswer'
            cols='45'
            rows='10'
            maxLength='1000'
            required
            onInvalid={e =>
              e.target.setCustomValidity('You must enter a valid answer')
            }
            onInput={e => e.target.setCustomValidity('')}
          ></textarea>
          <br />
          <br />
          <label htmlFor='yourNickName'>
            What is your nickname<span style={{ color: 'red' }}>* </span>
          </label>
          <input
            name='yourNickName'
            value={formData.yourNickName}
            onChange={handleChange}
            type='text'
            id='yourNickName'
            maxLength='60'
            placeholder='Example: jack543!'
            required
            onInvalid={e =>
              e.target.setCustomValidity('You must enter a valid nickname')
            }
            onInput={e => e.target.setCustomValidity('')}
          />
          <br />
          <span>
            - For privacy reasons, do not use your full name or email address.
          </span>
          <br />
          <br />
          <label htmlFor='yourEmail'>
            Your Email<span style={{ color: 'red' }}>* </span>
          </label>
          <input
            name='yourEmail'
            value={formData.yourEmail}
            onChange={handleChange}
            type='email'
            id='yourEmail'
            maxLength='60'
            placeholder='Example: jack@email.com'
            required
            onInvalid={e =>
              e.target.setCustomValidity('You must enter a valid email address')
            }
            onInput={e => e.target.setCustomValidity('')}
          />
          <br />
          <span>- For authentication reasons, you will not be emailed.</span>
          <br />
          <br />
          <label htmlFor='uploadInput'>Upload Photos: (Max: 5) </label>
          <br />
          {numOfImages <= 4 && (
            <>
              <input
                type='file'
                id='uploadInput'
                name='images'
                multiple
                accept='image/*'
                onChange={handleFileUpload}
              />
              {images &&
                [...images].map(thumbnail => (
                  <img
                    key={uuidv4()}
                    src={URL.createObjectURL(thumbnail)}
                    alt='uploaded photo'
                    style={{
                      height: '75px',
                      border: '1px solid #000',
                      margin: '5px',
                    }}
                  />
                ))}
            </>
          )}
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
  -webkit-overflow-scrolling: 'touch';
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