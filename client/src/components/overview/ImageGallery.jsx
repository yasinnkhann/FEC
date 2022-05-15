import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import StylesContext from './StylesContext';
import AppContext from '../../AppContext';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ArrowUpward } from '@material-ui/icons';
import { ArrowDownward } from '@material-ui/icons';
import { PortalWithState } from 'react-portal';

const MainImgContainer = styled.div`
  grid-area: mainImg;
  position: relative;
  height: 41rem;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 4px solid #38062b;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 2);
  margin-left: 1rem;
  position: relative;
  cursor: zoom-in;
`;

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
`;
const ModalBody = styled.section`
  background-color: black;
  margin: auto;
  border-radius: 4px;
  position: relative;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`;

const ThumbnailContainer = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 5%;
  left: calc(0% + 1.5rem);
  align-items: center;
`;

const ThumbnailImage = styled.img`
  border: ${props => (props.selected ? '3px solid #38062B' : null)};
  width: 3.125rem;
  height: 3.125rem;
  object-fit: cover;
  margin: 0.5rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 8);
`;

const Down = styled.button`
  color: #fdf0d5;
  background-color: #38062b;
  width: 3.125rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 1rem;
`;
const Up = styled.button`
  color: #fdf0d5;
  background-color: #38062b;
  width: 3.125rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 1rem;
`;
const Left = styled.button`
  z-index: 1;
  left: calc(0% + 6rem);
  position: absolute;
  top: 50%;
  color: #fdf0d5;
  background-color: #38062b;
  border: none;
  border-radius: 1rem;
`;
const Right = styled.button`
  z-index: 1;
  color: #fdf0d5;
  background-color: #38062b;
  position: absolute;
  top: 50%;
  right: 0%;
  border: none;
  border-radius: 1rem;
`;
const ModalImg = styled.img`
  height: calc(100vh - 6rem);
  width: 40vw;
`;

const LeftExpand = styled.button`
  background-color: #38062b;
  color: #fdf0d5;
  border: none;
  border-radius: 1rem;
`;
const RightExpand = styled.button`
  background-color: #38062b;
  color: #fdf0d5;
  border: none;
  border-radius: 1rem;
`;

const ThumbnailExpandedImage = styled.img`
  height: 3.125rem;
  width: 3.125rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #38062b;
  margin: 0.5rem 0.5rem 0 0.5rem;
`;

const ThumbnailExpandedContainer = styled.div`
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
`;

const InfoBox = styled.div`
  margin-left: 2rem;
`;

const Description = styled.p`
  font-style: italic;
`;

const Slogan = styled.h3`
  font-size: large;
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
  const [zoomMode, setZoomMode] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [size, setSize] = useState(100);

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
      const imageRendered = photo?.thumbnail_url
        ? photo?.thumbnail_url[0] === 'h'
          ? photo?.thumbnail_url
          : photo?.url
        : null;
      return (
        <ThumbnailImage
          selected={
            currentStyle.photos[currentIndex].thumbnail_url ===
            photo?.thumbnail_url
          }
          src={imageRendered}
          key={photo.thumbnail_url}
          onClick={() =>
            currentPage === 0
              ? setCurrentIndex(index)
              : setCurrentIndex(7 * currentPage + index)
          }
        ></ThumbnailImage>
      );
    });
  };
  const renderExpandedPhotos = () => {
    return currentStyle.photos.map((photo, index) => {
      const imageExpandRendered = photo?.thumbnail_url
        ? photo?.thumbnail_url[0] === 'h'
          ? photo?.thumbnail_url
          : photo?.url
        : null;
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
      <>
        <ModalContainer onClick={e => setmodalOpen(false)}>
          <ModalBody
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <ModalImg src={currentStyle.photos[currentIndex].url}></ModalImg>
            <ThumbnailExpandedContainer>
              <LeftExpand
                onClick={e => {
                  e.stopPropagation();
                  {
                    currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : null;
                  }
                }}
              >
                <ChevronLeftIcon />
              </LeftExpand>
              {renderExpandedPhotos()}
              <RightExpand
                onClick={e => {
                  {
                    currentIndex < currentStyle.photos.length - 1
                      ? setCurrentIndex(currentIndex + 1)
                      : null;
                  }
                }}
              >
                <ChevronRightIcon />
              </RightExpand>
            </ThumbnailExpandedContainer>
          </ModalBody>
        </ModalContainer>
      </>
    );
  };

  const getItemsForPage = () => {
    const numberOfItemsToShow = 7;
    const start = currentPage * numberOfItemsToShow;
    const end = (currentPage + 1) * numberOfItemsToShow;
    return currentStyle.photos.slice(start, end);
  };

  const getpage = newindex => {
    const min = currentPage * 7;
    const max = currentPage * 7 + 7 || 7;
    if (newindex >= max) {
      setCurrentPage(currentPage + 1);
    }

    if (newindex < min) {
      setCurrentPage(currentPage - 1);
    }
    setCurrentIndex(newindex);
  };

  return (
    <MainImgContainer>
      <ThumbnailContainer>
        {currentPage !== 0 && (
          <Up onClick={() => setCurrentPage(currentPage - 1)}>
            <ArrowUpward />
          </Up>
        )}
        {renderPhoto()}
        {getItemsForPage().length === 7 && (
          <Down onClick={() => setCurrentPage(currentPage + 1)}>
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
        onClick={() => setmodalOpen(!modalOpen)}
      ></MainImage>
      {modalOpen ? (
        <PortalWithState defaultOpen closeOnEsc>
          {renderPortal}
        </PortalWithState>
      ) : null}
      <InfoBox>
        <Slogan>{selectedProduct?.slogan}</Slogan>
        <Description>{selectedProduct?.description}</Description>
      </InfoBox>
    </MainImgContainer>
  );
}
