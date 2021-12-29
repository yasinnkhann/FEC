import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AppContext from '../../AppContext.js';
import CloseIcon from '@material-ui/icons/Close';
import QuestionsContext from './QuestionsContext.js';
import { TOKEN } from '../../config.js';

export default function AddQuestion({ closeModal, question }) {
  // CONTEXT
  const { products } = useContext(AppContext);
  const { questionsData } = useContext(QuestionsContext);

  // STATE
  const [formData, setFormData] = useState({
    yourQuestion: '',
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
        'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
        body,
        {
          headers: {
            Authorization: `${TOKEN}`,
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
        <Content onSubmit={handleSubmit}>
          <h2>Ask Your Question</h2>
          <h4>About the {specifiedProduct[0].name}</h4>
          <label htmlFor='yourQuestion'>
            Your Question<span style={{ color: 'red' }}>* </span>
          </label>
          <textarea
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
