import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Circle } from 'better-react-spinkit';

const CharacteristicsRadioList = lazy(() =>
  import('./CharacteristicsRadioList.jsx')
);

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    const { productID } = this.props;
    this.state = {
      mouseOver: [0, 0, 0, 0, 0],
      isPostReqPending: false,
      product_id: productID,
      body: '',
      summary: '',
      name: '',
      email: '',
      recommend: null,
      rating: null,
      photos: '',
      characteristics: {},
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.characteristicsRadioClick = this.characteristicsRadioClick.bind(this);
    this.recommendRadioClick = this.recommendRadioClick.bind(this);
    this.starRadioClick = this.starRadioClick.bind(this);
    this.handleReviewData = this.handleReviewData.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handlePostReqPendingProxy = this.handlePostReqPendingProxy.bind(this);
  }

  onInputChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  minimumCharCount() {
    const { body } = this.state;
    if (body.length >= 50) {
      return 'Minimum character count reached';
    }
    if (body.length < 50) {
      return `Minimum required characters left: ${50 - body.length}`;
    }
  }

  characteristicsRadioClick(e) {
    const { characteristics } = this.state;
    this.setState({
      characteristics: {
        ...characteristics,
        [e.target.name]: Number(e.target.value),
      },
    });
  }

  recommendRadioClick(e) {
    this.setState({
      [e.target.name]: Boolean(e.target.value),
    });
  }

  starRadioClick(e) {
    this.setState({
      [e.target.name]: Number(e.target.value),
    });
  }

  handleReviewData(e) {
    const { rating } = this.state;
    const { recommend } = this.state;
    const { body } = this.state;
    const { email } = this.state;
    const { summary } = this.state;
    const { name } = this.state;
    const { reviewData } = this.props;

    if (rating === null || recommend === null) {
      alert('Please fill out all required (*) fields');
      e.preventDefault();
      return false;
    }
    // body check
    if (body.length < 50 || body.length > 1000) {
      alert('Review body must be at least 50 characters');
      e.preventDefault();
      return false;
    }
    // email check
    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ) ||
      email.length > 60 ||
      email.length === 0
    ) {
      alert("Please make sure email is in proper format ex. 'hello@hello.com");
      e.preventDefault();
      return false;
    }
    // summary check
    if (summary.length > 60) {
      alert('Summary must be 60 characters or less');
      e.preventDefault();
      return false;
    }
    // name check
    if (name.length > 60 || name.length === 0) {
      alert('Name must be filled in and 60 characters or less');
      e.preventDefault();
      return false;
    }
    this.handlePostReqPendingProxy(true);
    reviewData(this.state);
  }

  handleFileUpload(e) {
    this.setState({
      photos: e.target.files,
    });
  }

  handlePostReqPendingProxy(bool) {
    this.props.handlePostReqPending(bool);
  }

  render() {
    const { mouseOver } = this.state;
    const { summary } = this.state;
    const { name } = this.state;
    const { email } = this.state;
    const { metaData } = this.props;

    return (
      <ReviewForm onSubmit={this.handleReviewData} id='reviewForm'>
        <Header>Tell us about this product!</Header>
        <ReqFieldsContainer>
          (<Asterisk>*</Asterisk> Required fields)
        </ReqFieldsContainer>
        <OverallRecContainer>
          <OverallContainer>
            <OverallHeader>
              <Asterisk>*</Asterisk> Overall
            </OverallHeader>
            <StarContainer>
              <QualityContainer>
                {mouseOver[0] === 1 ? (
                  <StarIcon
                    className='fa fa-star'
                    aria-hidden='true'
                    onMouseEnter={() => {
                      this.setState({ mouseOver: [1, 0, 0, 0, 0] });
                    }}
                    onClick={() => {
                      this.setState({
                        rating: 1,
                        mouseOver: [1, 0, 0, 0, 0],
                      });
                    }}
                  >
                    <Quality>Poor</Quality>
                  </StarIcon>
                ) : (
                  <StarIcon
                    className='fa fa-star-o'
                    onMouseEnter={() => {
                      this.setState({ mouseOver: [1, 0, 0, 0, 0] });
                    }}
                  >
                    <Quality>Poor</Quality>
                  </StarIcon>
                )}
              </QualityContainer>
              <QualityContainer>
                {mouseOver[1] === 1 ? (
                  <StarIcon
                    className='fa fa-star'
                    aria-hidden='true'
                    onMouseEnter={() => {
                      this.setState({ mouseOver: [1, 1, 0, 0, 0] });
                    }}
                    onClick={() => {
                      this.setState({
                        rating: 2,
                        mouseOver: [1, 1, 0, 0, 0],
                      });
                    }}
                  >
                    <Quality>Fair</Quality>
                  </StarIcon>
                ) : (
                  <StarIcon
                    className='fa fa-star-o'
                    onMouseEnter={() => {
                      this.setState({ mouseOver: [1, 1, 0, 0, 0] });
                    }}
                  >
                    <Quality>Fair</Quality>
                  </StarIcon>
                )}
              </QualityContainer>
              <QualityContainer>
                {mouseOver[2] === 1 ? (
                  <StarIcon
                    className='fa fa-star'
                    aria-hidden='true'
                    onMouseEnter={() => {
                      this.setState({ mouseOver: [1, 1, 1, 0, 0] });
                    }}
                    onClick={() => {
                      this.setState({
                        rating: 3,
                        mouseOver: [1, 1, 1, 0, 0],
                      });
                    }}
                  >
                    <Quality>Average</Quality>
                  </StarIcon>
                ) : (
                  <StarIcon
                    className='fa fa-star-o'
                    onMouseEnter={() => {
                      this.setState({ mouseOver: [1, 1, 1, 0, 0] });
                    }}
                  >
                    <Quality>Average</Quality>
                  </StarIcon>
                )}
              </QualityContainer>
              <QualityContainer>
                {mouseOver[3] === 1 ? (
                  <StarIcon
                    className='fa fa-star'
                    aria-hidden='true'
                    onMouseEnter={() => {
                      this.setState({ mouseOver: [1, 1, 1, 1, 0] });
                    }}
                    onClick={() => {
                      this.setState({
                        rating: 4,
                        mouseOver: [1, 1, 1, 1, 0],
                      });
                    }}
                  >
                    <Quality>Good</Quality>
                  </StarIcon>
                ) : (
                  <StarIcon
                    className='fa fa-star-o'
                    onMouseEnter={() => {
                      this.setState({ mouseOver: [1, 1, 1, 1, 0] });
                    }}
                  >
                    <Quality>Good</Quality>
                  </StarIcon>
                )}
              </QualityContainer>
              <QualityContainer>
                {mouseOver[4] === 1 ? (
                  <StarIcon
                    className='fa fa-star'
                    aria-hidden='true'
                    onKeyUp={this.handleKeyUp}
                    onClick={() => {
                      this.setState({
                        rating: 5,
                        mouseOver: [1, 1, 1, 1, 1],
                      });
                    }}
                  >
                    <Quality>Great</Quality>
                  </StarIcon>
                ) : (
                  <StarIcon
                    className='fa fa-star-o'
                    onMouseEnter={() => {
                      this.setState({ mouseOver: [1, 1, 1, 1, 1] });
                    }}
                  >
                    <Quality>Great</Quality>
                  </StarIcon>
                )}
              </QualityContainer>
            </StarContainer>
          </OverallContainer>
          <RecContainer>
            <RecHeader>
              <Asterisk>*</Asterisk> Would you recommend this product?
            </RecHeader>
            <RecChoices>
              <input
                type='radio'
                id='yes'
                name='recommend'
                value
                onClick={this.recommendRadioClick}
              />
              <Label htmlFor='yes'>Yes</Label>
              <input
                type='radio'
                id='no'
                name='recommend'
                value={false}
                onClick={this.recommendRadioClick}
              />
              <Label htmlFor='no'>No</Label>
            </RecChoices>
          </RecContainer>
        </OverallRecContainer>
        <Suspense fallback={<div>Loading...</div>}>
          <CharacteristicsRadioList
            metaData={metaData}
            characteristicsRadioClick={this.characteristicsRadioClick}
          />
        </Suspense>
        <SummaryContainer>
          <Label htmlFor='summary'>Review Summary (optional): </Label>
          <TextArea
            id='summaryInput'
            type='text'
            value={summary}
            name='summary'
            onChange={this.onInputChange}
            placeholder='Example: Best purchase ever!'
          />
        </SummaryContainer>
        <NameContainer>
          <Label htmlFor='name'>
            <b>
              <Asterisk>* </Asterisk>Your Name:{' '}
            </b>
          </Label>
          <NameInput
            type='text'
            name='name'
            value={name}
            onChange={this.onInputChange}
            placeholder='Example: jacky101!'
          />
          <br />
        </NameContainer>
        <ReviewContainer>
          <Label htmlFor='body'>
            <b>
              <Asterisk>* </Asterisk>Your Review:{' '}
            </b>
          </Label>
          <TextArea
            type='text'
            value={this.state.body}
            name='body'
            onChange={this.onInputChange}
            placeholder='What did you like/dislike about the product?'
          />
          <br />
          <small>{this.minimumCharCount()}</small>
        </ReviewContainer>
        <UploadContainer>
          <UploadText>
            Upload photos (optional)
            {this.state.photos && (
              <ImagesContainer>
                {[...this.state.photos].map(thumbnail => (
                  <UploadedImg
                    key={uuidv4()}
                    src={URL.createObjectURL(thumbnail)}
                    alt='uploaded photo'
                    loading='lazy'
                  />
                ))}
              </ImagesContainer>
            )}
          </UploadText>

          <UploadLabel htmlFor='uploadInput'>+ Add photos</UploadLabel>
          <UploadBtn
            type='file'
            id='uploadInput'
            name='images'
            multiple
            accept='image/*'
            onChange={this.handleFileUpload}
          />
        </UploadContainer>
        <EmailContainer>
          <Label htmlFor='email'>
            <b>
              <Asterisk>* </Asterisk> Email:{' '}
            </b>
          </Label>
          <EmailInput
            type='text'
            name='email'
            value={email}
            onChange={this.onInputChange}
            placeholder='georgeWashington@gmail.com'
          />
          <br />
        </EmailContainer>
        <SubmitContainer>
          <SubmitBtn
            className='submitReview'
            type='button'
            onClick={this.handleReviewData}
          >
            <b>Submit Review</b>
          </SubmitBtn>
        </SubmitContainer>
        {this.props.isPostReqPending && (
          <Circle
            color='fuchsia'
            size={100}
            style={{ position: 'absolute', top: '40%', right: '45%' }}
          />
        )}
      </ReviewForm>
    );
  }
}

export default WriteReview;

const ReviewForm = styled.form``;

const Header = styled.h3`
  text-align: center;
`;

const ReqFieldsContainer = styled.div`
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const Asterisk = styled.strong`
  color: red;
`;

const OverallRecContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 0.5rem;
`;

const OverallContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecContainer = styled.div`
  margin: 1rem 0;
`;

const OverallHeader = styled.p`
  text-align: center;
`;

const StarContainer = styled.div`
  text-align: center;
  display: flex;
`;

const QualityContainer = styled.div`
  display: flex;
  margin-left: 0.75rem;
`;

const StarIcon = styled.span``;

const Quality = styled.p`
  font-family: 'Roboto', sans-serif;
`;

const RecHeader = styled.p`
  text-align: center;
`;

const RecChoices = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
`;

const SummaryContainer = styled.div`
  margin: 0 3.5rem;
  padding-bottom: 1rem;
`;

const NameContainer = styled.div`
  margin: 0 3.5rem;
  padding-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-right: 1rem;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 4rem;
`;

const NameInput = styled.input`
  width: 60%;
`;

const ReviewContainer = styled.div`
  margin: 0 3.5rem;
`;

const UploadContainer = styled.div`
  margin: 1rem 3.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
`;

const UploadBtn = styled.input`
  margin-left: 0.5rem;
  display: none;
`;

const UploadLabel = styled.label`
  background-color: #38062b;
  color: #fdf0d5;
  padding: 0.3rem;
  border-radius: 6px;
  cursor: pointer;
`;

const EmailContainer = styled.div`
  margin: 0 3.5rem;
`;

const EmailInput = styled.input`
  width: 60%;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const UploadText = styled.span`
  margin-right: 0.5rem;
`;

const SubmitBtn = styled.button`
  padding: 0.5rem 0.75rem;
	border-radius 6px;
	border: none;
	background: #38062B;
	color: #fdf0d5;
	cursor: pointer;
  `;

const ImagesContainer = styled.div`
  margin-top: 0.5rem;
`;

const UploadedImg = styled.img`
  height: 3rem;
  width: 3rem;
  border: 1px solid #000;
  margin: 0.3rem;
`;
