import React, { useState, useEffect, useContext, useRef, Suspense } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AppContext from '../../AppContext.js';
import ModalContext from './ModalContext.js';


// import ActionButton from './ActionButton.jsx';
// import AddToOutfit from './AddToOutfit.jsx';
// import Modal from './Modal.jsx';
// import ProductPreviewImages from './ProductPreviewImages.jsx';
// import ProductInfo from './ProductInfo.jsx';
import {serverURL} from '../../config.js';

const ActionButton = React.lazy(() => import('./ActionButton.jsx'));
const AddToOutfit = React.lazy(() => import('./AddToOutfit.jsx'));
const Modal = React.lazy(() => import('./Modal.jsx'));
const ProductPreviewImages = React.lazy(() => import('./ProductPreviewImages.jsx'));
const ProductInfo = React.lazy(() => import('./ProductInfo.jsx'));

// CARD
export default function CarouselCard({ product, name }) {
  // CONTEXT
  const { selectedProductContext } = useContext(AppContext);

  // STATE
  const [selectedProduct, setSelectedProduct] = selectedProductContext;
  const [imageUrl, setimageUrl] = useState('');
  const [styles, setStyles] = useState([]);
  const [salePrice, setSalePrice] = useState(null);

  // REF
  const modal = useRef(null);

  // HOOKS
  useEffect(() => {
      // API HANDLER
      const getProductStyle = async (id) => {
        await axios
          .get(
            `${serverURL}/products/styles`,
            {
              params: {
                product_id: id,
              },
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(res => {
            setStyles(res.data);
            if (res?.data.results[0].salePrice) {
              setSalePrice(res.data.results[0].salePrice);
            }
            return res?.data.results[0].photos[0].thumbnail_url;
          })
          .then(url => setimageUrl(url))
          .catch(err => console.error(err));
      };

      if (product) { getProductStyle(product.id); }
  }, []);



  // EVENT HANDLERS
  const handleClick = (newSelectedProduct) => {
    setSelectedProduct(newSelectedProduct);
    document.body.style.cursor = 'wait';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.cursor = 'default';
  };

  // RENDER METHODS
  const renderCard = (cardName) => {
    if (cardName === 'add-button') {
      return (
        <Suspense fallback={<h2>Loading...</h2>}>
          <CardStyle >
            <ProductInfoStyle >
              <AddToOutfit />
            </ProductInfoStyle>
          </CardStyle>
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<h2>Loading...</h2>}>
          <CardStyle >
            <ActionStyle onClick={() => modal.current.open()}>
              <ActionButton name="open-modal" />
            </ActionStyle>
            <Modal key={`modal-${product.id}`} ref={modal} product={product} />
            <ProductInfoStyle onClick={() => handleClick(product)} >
              <ProductPreviewImages imageUrl={imageUrl} productName={product.name} />
              <ProductInfo product={product} styles={styles} salePrice={salePrice} />
            </ProductInfoStyle>
          </CardStyle>
        </Suspense>
      );
    }
  };

  // JSX
  return (
    renderCard(name)
  );
}

const CardStyle = styled.div`
  width: 208px;
  height: 310px;
  margin: 5px;
  background-color: #B1A9AC;
  border: 0.25rem solid #38062B;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const ProductInfoStyle = styled.div`
  width: 210px;
  max-width: 210px;
  height: 100%;
  position: absolute;
  bottom: 0;
  overflow: auto;
`;

const ActionStyle = styled.a`
  z-index: 2;
  max-height: 35px;
  max-width: 35px;
  color: #b1a8ac;
`;