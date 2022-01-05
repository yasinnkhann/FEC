import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import StylesContext from './StylesContext';
//import ExpandedView from './ExpandedView.jsx';
import AppContext from '../../AppContext';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ArrowUpward} from '@material-ui/icons';
import {ArrowDownward} from '@material-ui/icons';
import {PortalWithState} from 'react-portal';

const ModalContainer = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: 1000px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const ModalBody = styled.section `
  background-color: rgb(220, 245, 253);
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  overflow: auto;
  display: flex;
  justify-content: center;
`;
const ModalImg = styled.img `
  width: 1000px;
  height: 1000px;
`;
// background-position: ${(props) => (props.position)};
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
const Left = styled.button `
z-index: 1;
left: 90px;
position: absolute;
top: 50%;
`;
const Right = styled.button `
right: 1rem;
z-index: 1;
position: absolute;
top: 50%;
`;
const LeftExpand = styled.button `
z-index: 3;
left: 90px;
top: 50%;
`;
const RightExpand = styled.button `
right: 3rem;
z-index: 3;
top: 50%;
`;
const ThumbnailImage = styled.img`
  border: ${(props) => (props.selected ? '3px solid black' : null)};
  width: 100%;
  height: 50px;
  object-fit: cover;
`;
const ThumbnailExpandedImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid;
  object-fit: cover;
`;
const ThumbnailExpandedContainer = styled.div`
  z-index: 1;
  bottom: 0;
  max-height: 420px;
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: space-evenly;
  padding: 0.5rem;
  border-top-right-radius:  10px;
  border-top-left-radius: 10px;
`;


export default function ImageGallery() {
  const { stylesDataContent, currentStyleContent } = useContext(StylesContext);
  const [stylesData, setstylesData] = stylesDataContent;
  const [currentStyle, setCurrentStyle] = currentStyleContent;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setmodalOpen] = useState(false);
  const { selectedProductContext } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = selectedProductContext;

  useEffect(() => {
    setCurrentIndex(0);
    setCurrentPage(0);
  }, [currentStyle, selectedProduct]);

  useEffect(() => {
    const mainEl = document.querySelector('main');

    if (modalOpen) {
      if (mainEl) {
        mainEl.style.filter = 'blur(3px)';
      }
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (mainEl) {
        mainEl.style.filter = 'none';
      }
    };
  }, [modalOpen]);

  const renderPhoto = () => {
    return getItemsForPage(currentPage).map((photo, index) => {
      const imageRendered = photo?.thumbnail_url ? photo?.thumbnail_url[0] === 'h' ? photo?.thumbnail_url : photo?.url : null;
      console.log('FROM RENDER PHOTO: ', currentIndex);
      return (
        <ThumbnailImage
          selected={currentStyle.photos[currentIndex].thumbnail_url === photo.thumbnail_url}
          src={imageRendered}
          key={photo.thumbnail_url}
          onClick={() => currentPage === 0 ? setCurrentIndex(index) : setCurrentIndex(7 * currentPage + index)}
        ></ThumbnailImage>
      );
    });
  };
  console.log(currentStyle);
  const renderExpandedPhotos = () => {
    return currentStyle.photos.map((photo, index) => {
      const imageExpandRendered = photo?.thumbnail_url ? photo?.thumbnail_url[0] === 'h' ? photo?.thumbnail_url : photo?.url : null;
      return (
        <ThumbnailExpandedImage
          onClick={() => setCurrentIndex(index)}
          src={imageExpandRendered}
          key={photo.thumbnail_url}
        ></ThumbnailExpandedImage>
      );
    });
  };

  const renderPortal = ({ portal }) => {
    return portal(
      <div>
        <ModalContainer onClick={(e) => {
          setmodalOpen(false);
          console.log('I am container bitch');
        }}>
          <ModalBody
            // onMouseMove={() => console.log('I am body')}
            onClick = {(e) => {
              e.stopPropagation();
              console.log('I am body');
            }}>
            <ModalImg
              // onMouseMove={() => console.log('I am image')}
              src={currentStyle.photos[currentIndex].url}
            ></ModalImg>
            <ThumbnailExpandedContainer>
              <LeftExpand onClick={(e) => {
                e.stopPropagation();
                { currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : null; }
              }}><ChevronLeftIcon/>
              </LeftExpand>
              {renderExpandedPhotos()}
              <RightExpand onClick={(e) => {
                { currentIndex < currentStyle.photos.length - 1 ? setCurrentIndex(currentIndex + 1) : null; }
              }}><ChevronRightIcon/></RightExpand>
            </ThumbnailExpandedContainer>
          </ModalBody>
        </ModalContainer>
      </div>
    );
  };



  const getItemsForPage = () => {
    const numberOfItemsToShow = 7;
    const start = currentPage * numberOfItemsToShow;
    const end = (currentPage + 1) * numberOfItemsToShow;
    return currentStyle.photos.slice(start, end);
  };



  const getpage = (newindex) => {
    const min = currentPage * 7;
    const max = (currentPage * 7) + 7 || 7;
    if (newindex >= max) {
      setCurrentPage(currentPage + 1);
    }

    if (newindex < min) {
      setCurrentPage(currentPage - 1);

    }
    setCurrentIndex(newindex);
  };

  // const renderModal = () => {

  // };
  return (
    <MainImgContainer>
      <ThumbnailContainer>
        {currentPage !== 0 &&
        <Up onClick={() => setCurrentPage(currentPage - 1)}><ArrowUpward/></Up>
        }
        {renderPhoto()}
        {getItemsForPage().length === 7 &&
        <Down onClick={() => setCurrentPage(currentPage + 1)}><ArrowDownward/></Down>
        }
      </ThumbnailContainer>

      {currentIndex > 0 &&
      <Left onClick={() => getpage(currentIndex - 1)}><ChevronLeftIcon size="large"/></Left>
      }
      {currentIndex < currentStyle.photos.length - 1 &&
      <Right onClick={() => getpage(currentIndex + 1)}><ChevronRightIcon/></Right>
      }
      <MainImage src={currentStyle.photos[currentIndex].url} onClick={() => setmodalOpen(true)}></MainImage>
      {modalOpen ? (
        <PortalWithState defaultOpen closeOnEsc onClose={close}>
          {renderPortal}
        </PortalWithState>
      ) : null}
      {/* <ExpandedView
        open = {modalOpen}
        close = {() => setmodalOpen(false)}
        photo = {currentStyle.photos[currentIndex].url}
        currentStyle = {currentStyle}
      /> */}
    </MainImgContainer>
  );
}






// const renderExpandedThumbs = () => {
//   currentStyle.photos.map((photo) => {
//     return (
//       <ExpandedThumb>{photo.thumbnail_url}</ExpandedThumb>
//     );
//   });
// };

// if (open) {
//   return (
//     <PortalWithState defaultOpen closeOnEsc onClose={close}>
//       {renderPortal}
//     </PortalWithState>
//   );
// } else {
//   return null;
// }