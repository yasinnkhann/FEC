import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext.js';
import { TOKEN } from '../../config.js';
import Carousel from './Carousel.jsx';
import axios from 'axios';

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';



export default function RelatedItems() {

  // OLD METHOD -> destructure the products array and the setProducts method for use
  // const {products, setProducts} = useContext(AppContext)

  // NEW METHOD -> destructure the state you want to use (line 18) then from that state get your products array and the setProduct method (line 19)
  // const {productsValue} = useContext(AppContext)
  // const [products, setProducts] = productsValue

  // CONTEXT
  const {selectedProductValue} = useContext(AppContext)
  const [selectedProduct, setSelectedProduct] = selectedProductValue

  // STATE
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        const res = await axios.get(
          `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp//products/:${setSelectedProduct.id}/related`,
          {
            params: {
              // page: 1,
              count: 2000,
            },
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        setRelatedProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getRelatedProducts();
  }, [])

  return (
    <div className="related-items-and-comparison" >
      <h3>RELATED ITEMS</h3>
      <Carousel name="related-items"/>
      <h3>YOUR OUTFIT</h3>
      <Carousel name="your-outfit" />
    </div>
  );
}
