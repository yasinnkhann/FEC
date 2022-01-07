import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AppContext from '../../AppContext.js';
import CloseIcon from '@material-ui/icons/Close';
import QuestionsContext from './QuestionsContext.js';
import { v4 as uuidv4 } from 'uuid';
import { cloudinaryInfo } from '../../config.js';
import Loader from 'react-loader-spinner';

const serverURL = 'http://34.223.4.224:80/api';

export default function AddAnswer({ closeModal, question }) {
  // CONTEXT
  const { productsContext, selectedProductContext } = useContext(AppContext);
  const { questionsData, setQuestionsData } = useContext(QuestionsContext);
  const [products, setProducts] = productsContext;
  const [selectedProduct, setSelectedProduct] = selectedProductContext;

  // STATE
  const [numOfImages, setNumOfImages] = useState(0);
  const [images, setImages] = useState('');
  const [addAnsData, setAddAnsData] = useState({
    yourAnswer: '',
    yourNickName: '',
    yourEmail: '',
  });
  const [isPostReqSubmitted, setIsPostReqSubmitted] = useState(false);

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
    setAddAnsData({ ...addAnsData, hasChanged: true, [name]: value });
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const handleFileUpload = e => {
    setNumOfImages(e.target.files.length);
    setImages(e.target.files);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (images.length > 5) {
      alert('Cannot upload files more than 5 files');
      setImages('');
      setNumOfImages(0);
      return;
    }
    const photoUrls = [];
    setIsPostReqSubmitted(true);

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('file', images[i]);
      formData.append('upload_preset', cloudinaryInfo.CLOUDINARY_UPLOAD_PRESET);
      // console.log('FORM DATA: ', ...formData);
      try {
        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryInfo.CLOUDINARY_NAME}/image/upload`,
          formData
        );
        console.log('UPLOAD RES: ', uploadRes);
        photoUrls.push(uploadRes.data.secure_url);
      } catch (err) {
        console.error(err);
      }
    }
    try {
      const body = {
        body: addAnsData.yourAnswer,
        name: addAnsData.yourNickName,
        email: addAnsData.yourEmail,
        photos: photoUrls,
      };
      const res = await axios.post(`${serverURL}/qa/answer`, body, {
        params: {
          question_id: question.question_id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsPostReqSubmitted(false);

      console.log('SUBMIT RES: ', res);
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
        <UpperContent>
          <Content onSubmit={handleSubmit}>
            <h2>Submit your Answer</h2>
            <h4>
              {selectedProduct.name}: {question.question_body}
            </h4>
            <label htmlFor='yourAnswer'>
              Your Answer<span style={{ color: 'red' }}>* </span>
            </label>
            <br />
            <textarea
              style={{
                verticalAlign: 'top',
                margin: '0px',
                resize: 'none',
              }}
              name='yourAnswer'
              value={addAnsData.yourAnswer}
              onChange={handleChange}
              id='yourAnswer'
              cols='45'
              rows='6'
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
            <br />
            <input
              name='yourNickName'
              value={addAnsData.yourNickName}
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
            <br />
            <span>
              For privacy reasons, do not use your full name or email address.
            </span>
            <br />
            <label htmlFor='yourEmail'>
              Your Email<span style={{ color: 'red' }}>* </span>
            </label>
            <br />
            <input
              name='yourEmail'
              value={addAnsData.yourEmail}
              onChange={handleChange}
              type='email'
              id='yourEmail'
              maxLength='60'
              placeholder='Example: jack@email.com'
              required
              onInvalid={e =>
                e.target.setCustomValidity(
                  'You must enter a valid email address'
                )
              }
              onInput={e => e.target.setCustomValidity('')}
            />
            <br />
            <span>For authentication reasons, you will not be emailed.</span>
            <br />
            <br />
            <label htmlFor='uploadInput'>Upload Photos: (Max: 5) </label>
            <br />
            {numOfImages <= 5 && (
              <>
                <input
                  type='file'
                  id='uploadInput'
                  name='images'
                  multiple
                  accept='image/*'
                  onChange={handleFileUpload}
                />
                {images && (
                  <ImagesContainer>
                    {[...images].map(thumbnail => (
                      <img
                        key={uuidv4()}
                        src={URL.createObjectURL(thumbnail)}
                        alt='uploaded photo'
                        style={{
                          height: '50px',
                          width: '50px',
                          border: '1px solid #000',
                          margin: '5px',
                        }}
                      />
                    ))}
                  </ImagesContainer>
                )}
              </>
            )}
            <br />
            <SubmitBtn type='submit'>Submit Answer</SubmitBtn>
            <CloseBtn onClick={handleCloseModal}>
              <XIcon />
            </CloseBtn>
            {isPostReqSubmitted && (
              <Loader
                type='Oval'
                color='blue'
                height={100}
                width={100}
                arialLabel='loading-indicator'
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
          </Content>
        </UpperContent>
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
  overflow-y: auto;
`;

const Content = styled.form`
  padding: 0.2rem 1.2rem;
`;

const UpperContent = styled.div`
  background: #fdf0d5;
  width: 40rem;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.25);
  position: relative;
  border-radius: 6px;
  overflow-y: auto;

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

  input {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 98.5%;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #000;
    padding: 0px 8px;
  }

  input[type='file'] {
    margin-top: 5px;
    margin-bottom: 5px;
    width: auto;
    height: auto;
    border-radius: 4px;
    border: none;
    padding: 0px 0px;
  }

  textarea {
    width: 100%;
  }
`;

const ImagesContainer = styled.div``;

const XIcon = styled(CloseIcon)`
  && {
    color: #38062b;
    font-size: 2rem;
  }
`;

const CloseBtn = styled.button`
  cursor: pointer;
  top: 0rem;
  right: 0rem;
  position: absolute;
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
`;

const SubmitBtn = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
	padding: 8px 12px;
	border-radius 6px;
	border: none;
	background: #38062B;
	color: #B1A9AC;
	cursor: pointer;
`;
