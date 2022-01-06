// HELPER FUNCTIONS

// Checks the last item of all products and last item of shown products and checks if they are the same
export function isAtFinalIndex(relatedProducts, visibleProducts) {
  if (relatedProducts && visibleProducts) {
    return relatedProducts[relatedProducts.length - 1]?.data.id === visibleProducts[visibleProducts.length - 1]?.data.id
  }
  return false;
};

// Checks the first item of all products and first item of shown products and checks if they are the same
export function isAtBeginningIndex(relatedProducts, visibleProducts) {
  if (relatedProducts && visibleProducts) {
    return relatedProducts[0]?.data.id === visibleProducts[0]?.data.id
  }
  return false;
  // if (!relatedProducts[0] || !visibleProducts[0]) {
  //   return;
  // }
  // const firstRelatedItem = relatedProducts[0].data.id;
  // const firstVisibleItem = visibleProducts[0].data.id;
  // return firstVisibleItem === firstRelatedItem;
};

// Divides width of inner window by width of a card and rounds up to the nearest integer
// then returns it. If the remainder of window width divided by card width is above zero
// then the previous calculation is return, if not then we hard set the return value to 1
export function getMaxIndexBasedOnScreenSize() {
  const width = window.innerWidth;
  const maxIndexBasedOnScreenSize = width % 200 > 0 ? Math.floor(width / 200) : 1;
  return maxIndexBasedOnScreenSize;
};
