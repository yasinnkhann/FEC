import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AppContext from '../../AppContext.js';
import CloseIcon from '@material-ui/icons/Close';
import QuestionsContext from './QuestionsContext.js';
import { v4 as uuidv4 } from 'uuid';
import { cloudinaryInfo } from '../../config.js';
import { serverURL } from '../../config.js';
import { Circle } from 'better-react-spinkit';

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
            <YourAnswer
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
            ></YourAnswer>
            <br />
            <br />
            <label htmlFor='yourNickName'>
              What is your nickname<span style={{ color: 'red' }}>* </span>
            </label>
            <br />
            <YourNickname
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
            <YourEmail
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
            <UploadLabel htmlFor='uploadInput'>Upload Photos</UploadLabel>
            <MaxPhotosLine>(Max: 5) </MaxPhotosLine>
            <br />
            {numOfImages <= 5 && (
              <>
                <UploadBtn
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
                      <UploadedImg
                        key={uuidv4()}
                        src={URL.createObjectURL(thumbnail)}
                        alt='uploaded photo'
                        loading='lazy'
                      />
                    ))}
                  </ImagesContainer>
                )}
              </>
            )}
            <SubmitBtnContainer>
              <SubmitBtn type='submit'>Submit Answer</SubmitBtn>
            </SubmitBtnContainer>
            <CloseBtn onClick={handleCloseModal}>
              <XIcon />
            </CloseBtn>
            {isPostReqSubmitted && (
              <Circle
                color='fuchsia'
                size={100}
                style={{ position: 'absolute', top: '40%', right: '45%' }}
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
`;

const ImagesContainer = styled.div`
  margin-top: 1rem;
`;

const XIcon = styled(CloseIcon)`
  && {
    color: red;
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

const SubmitBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
	padding: 0.5rem 0.75rem;
	border-radius 6px;
	border: none;
	background: #38062B;
	color: #fdf0d5;
	cursor: pointer;
`;

const UploadBtn = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  background-color: #38062b;
  color: #fdf0d5;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
`;

const MaxPhotosLine = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
`;

const YourAnswer = styled.textarea`
  vertical-align: top;
  margin: 0;
  resize: none;
  width: 100%;
`;

const YourNickname = styled.input`
  margin: 0.3rem 0;
  width: 100%;
  height: 2rem;
  border-radius: 4px;
  border: 1px solid #000;
  padding: 0 0.5rem;
`;

const YourEmail = styled.input`
  margin: 0.3rem 0;
  width: 100%;
  height: 2rem;
  border-radius: 4px;
  border: 1px solid #000;
  padding: 0 0.5rem;
`;

const UploadedImg = styled.img`
  height: 3rem;
  width: 3rem;
  border: 1px solid #000;
  margin: 0.3rem;
`;
