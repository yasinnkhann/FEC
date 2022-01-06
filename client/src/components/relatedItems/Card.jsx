// Dependency imports
import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// API imports
import { TOKEN } from '../../config.js';

// Context imports
import AppContext from '../../AppContext.js';
import ModalContext from './ModalContext.js';

// Component imports
import ActionButton from './ActionButton.jsx';
import AddToOutfit from './AddToOutfit.jsx';
import Modal from './Modal.jsx';
import ProductPreviewImages from './ProductPreviewImages.jsx';
import ProductInfo from './ProductInfo.jsx';

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
    let clearId = setTimeout(() => {

      // API HANDLER
      const getProductStyle = async (id) => {
        await axios
          .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`, {
            params: {
              product_id: id,
            },
            headers: {
              Authorization: `${TOKEN}`,
            },
          })
          .then(res => {
            setStyles(res.data);
            if (res?.data.results[0].salePrice) {
              setSalePrice(res.data.results[0].salePrice);
            }
            return res?.data.results[0].photos[0].thumbnail_url;
          })
          // .then(res => res?.data.results[0].photos[0].thumbnail_url)
          .then(url => setimageUrl(url))
          .catch(err => console.error(err));
      };

      if (product) { getProductStyle(product.id); }
    }, 200);

    return () => clearTimeout(clearId);
  }, []);



  // EVENT HANDLERS
  const handleClick = (newSelectedProduct) => {
    setSelectedProduct(newSelectedProduct);
  };

  // RENDER METHODS
  const renderCard = (cardName) => {
    if (cardName === 'add-button') {
      return (
        <CardStyle >
          <ProductInfoStyle > {/* onClick={() => console.log('ADD BUTTON CLICKED')} */}
            <AddToOutfit />
          </ProductInfoStyle>
        </CardStyle>
      );
    } else {
      return (
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
      );
    }
  };

  // JSX
  return (
    renderCard(name)
  );
}

const CardStyle = styled.div`
  width: 210px;
  height: 310px;
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const ProductInfoStyle = styled.div`
  width: 200px;
  height: 100%;
  position: absolute;
  bottom: 0;
  overflow: auto;
`;

const ActionStyle = styled.a`
  z-index: 1;
  max-height: 35px;
  max-width: 35px;
`;
