import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import StylesContext from './StylesContext';
import ExpandedView from './ExpandedView.jsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ArrowUpward } from '@material-ui/icons';
import { ArrowDownward } from '@material-ui/icons';

const MainImgContainer = styled.div`
  position: relative;
  grid-column-start: 1;
  grid-column-end: 2;
  height: 650px;
  width: 600px;
`;
const MainImage = styled.img`
 width: 100%;
 height: 100%;
 object-fit: cover:
 padding: 2rem;
 position: relative;
 cursor: zoom-in;
`;

const ThumbnailContainer = styled.div`
  z-index: 1;
  width: 50px;
  max-height: 420px;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  left: 20px;
  top: 60px;
`;
const Down = styled.button`
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
`;
const Up = styled.button`
  position: absolute;
  left: 50%;
  top: -35px;
  transform: translateX(-50%);
  margin-bottom: 1rem;
`;
const Left = styled.button`
  z-index: 1;
  left: 90px;
  position: absolute;
  top: 50%;
`;
const Right = styled.button`
  right: 1rem;
  z-index: 1;
  position: absolute;
  top: 50%;
`;
const ThumbnailImage = styled.img`
  border: ${props => (props.selected ? '3px solid black' : null)};
  width: 100%;
  height: 50px;
  object-fit: cover;
`;

// const ExpandedImageContainer = styled.img `
// width: 600px;
// background-repeat: no-repeat;
// background-position: ${(props) => (props.selected ? handleMouseMove() : '0% 0%')};

// &&:hover {
//   opacity: 0;
// }
// `;

// const ExpandedImage = styled.img `
//   display: block;
//   width: 100%;
//   pointer-events: none;
// `;
// const ExpandedContainer = styled.div `
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   width: 100vw;
// `;

// class Zoom extends Component {
//   state = {
//     backgroundImage: `url(${src})`,
//     backgroundPosition: '0% 0%'
//   }

//   handleMouseMove = e => {
//     const { left, top, width, height } = e.target.getBoundingClientRect()
//     const x = (e.pageX - left) / width * 100
//     const y = (e.pageY - top) / height * 100
//     this.setState({ backgroundPosition: `${x}% ${y}%` })
//   }

//   render = () =>
//     <figure onMouseMove={this.handleMouseMove} style={this.state}>
//       <img src={src} />
//     </figure>
// }

// ReactDOM.render(<Zoom />, document.getElementById('root'))

export default function ImageGallery() {
  const { stylesDataContent, currentStyleContent } = useContext(StylesContext);
  const [stylesData, setstylesData] = stylesDataContent;
  const [currentStyle, setCurrentStyle] = currentStyleContent;
  const [currentPage, setcurrentPage] = useState(0);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [modalOpen, setmodalOpen] = useState(false);

  useEffect(() => {
    setcurrentIndex(0);
    setcurrentPage(0);
  }, [currentStyle]);

  const renderPhoto = () => {
    return getItemsForPage(currentPage).map((photo, index) => {
      const imageRendered =
        photo.thumbnail_url[0] === 'h' ? photo.thumbnail_url : photo.url;
      return (
        <ThumbnailImage
          selected={
            currentStyle.photos[currentIndex].thumbnail_url ===
            photo.thumbnail_url
          }
          src={imageRendered}
          key={photo.thumbnail_url}
          onClick={() =>
            currentPage === 0
              ? setcurrentIndex(index)
              : setcurrentIndex(7 * currentPage + index)
          }
        ></ThumbnailImage>
      );
    });
  };

  const getItemsForPage = () => {
    const numberOfItemsToShow = 7;
    const start = currentPage * numberOfItemsToShow;
    const end = (currentPage + 1) * numberOfItemsToShow;
    return currentStyle.photos.slice(start, end);
  };
  // const handleMouseMove = (e) => {
  //   const { left, top, width, height } = e.target.getBoundingClientRect();
  //   const x = (e.pageX - left) / width * 100;
  //   const y = (e.pageY - top) / height * 100;
  //   setbackgroundPosition(`${x}% ${y}%`);
  // };

  const getpage = newindex => {
    const min = currentPage * 7;
    const max = currentPage * 7 + 7 || 7;
    if (newindex >= max) {
      setcurrentPage(currentPage + 1);
    }

    if (newindex < min) {
      setcurrentPage(currentPage - 1);
    }
    setcurrentIndex(newindex);
  };

  // const renderModal = () => {

  // };
  return (
    <MainImgContainer>
      <ThumbnailContainer>
        {currentPage !== 0 && (
          <Up onClick={() => setcurrentPage(currentPage - 1)}>
            <ArrowUpward />
          </Up>
        )}
        {renderPhoto()}
        {getItemsForPage().length === 7 && (
          <Down onClick={() => setcurrentPage(currentPage + 1)}>
            <ArrowDownward />
          </Down>
        )}
      </ThumbnailContainer>

      {currentIndex > 0 && (
        <Left onClick={() => getpage(currentIndex - 1)}>
          <ChevronLeftIcon size='large' />
        </Left>
      )}
      {currentIndex < currentStyle.photos.length - 1 && (
        <Right onClick={() => getpage(currentIndex + 1)}>
          <ChevronRightIcon />
        </Right>
      )}
      <MainImage
        src={currentStyle.photos[currentIndex].url}
        onClick={() => setmodalOpen(true)}
      ></MainImage>
      <ExpandedView
        open={modalOpen}
        close={() => setmodalOpen(false)}
        photo={currentStyle.photos[currentIndex].url}
      />
    </MainImgContainer>
  );
}
