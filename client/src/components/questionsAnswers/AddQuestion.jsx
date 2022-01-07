import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AppContext from '../../AppContext.js';
import CloseIcon from '@material-ui/icons/Close';
import QuestionsContext from './QuestionsContext.js';

const serverURL = 'http://localhost:3000/api';

export default function AddQuestion({ closeModal, question }) {
  // CONTEXT
  const { productsContext, selectedProductContext } = useContext(AppContext);
  const { questionsData, setQuestionsData } = useContext(QuestionsContext);
  const [products, setProducts] = productsContext;
  const [selectedProduct, setSelectedProduct] = selectedProductContext;

  // STATE
  const [formData, setFormData] = useState({
    yourQuestion: '',
    yourNickName: '',
    yourEmail: '',
  });

  // VARIABLES
  // const specifiedProduct = products.filter(
  //   product => Number(product.id) === Number(questionsData.product_id)
  // );

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

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const body = {
        body: formData.yourQuestion,
        name: formData.yourNickName,
        email: formData.yourEmail,
        product_id: Number(questionsData.product_id),
      };
      const res = await axios.post(
        `${serverURL}/qa/question`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('ADD Q POST RES: ', res);
    } catch (err) {
      console.error(err);
    }
    closeModal();
  };

  return (
    <Fragment>
      <Overlay>
        <UpperContent>
          <Content onSubmit={handleSubmit}>
            <h2>Ask Your Question</h2>
            {/* <h4>About the {specifiedProduct[0].name}</h4> */}
            <h4>About the {selectedProduct.name}</h4>

            <label htmlFor='yourQuestion'>
              Your Question<span style={{ color: 'red' }}>* </span>
            </label>
            <textarea
              style={{ verticalAlign: 'top', resize: 'none', margin: '0px' }}
              name='yourQuestion'
              value={formData.yourQuestion}
              onChange={handleChange}
              id='yourQuestion'
              cols='45'
              rows='10'
              maxLength='1000'
              required
              onInvalid={e =>
                e.target.setCustomValidity('You must enter a valid question')
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
              placeholder='Example: jackson11!'
              required
              onInvalid={e =>
                e.target.setCustomValidity('You must enter a valid nickname')
              }
              onInput={e => e.target.setCustomValidity('')}
            />
            <br />
            <span>
              For privacy reasons, do not use your full name or email address.
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
            <SubmitBtn type='submit'>Submit Question</SubmitBtn>
            <CloseBtn onClick={closeModal}>
              <XIcon />
            </CloseBtn>
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
  color: #38062b;
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

  textarea {
    width: 100%;
  }
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
