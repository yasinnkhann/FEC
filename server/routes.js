const controller = require('./controllers');
const router = require('express').Router();

// Products
router.get('/products', controller.products.getProducts);
router.get('/products/related', controller.products.getRelatedProducts);
router.get('/products/styles', controller.products.getProductStyles);

// Reviews
router.get('/reviews', controller.reviews.getReviews);
router.get('/reviews/meta', controller.reviews.getReviewMetadata);
router.post('/reviews', controller.reviews.postReview);
router.put('/reviews/helpful', controller.reviews.markAsHelpful);
router.put('/reviews/report', controller.reviews.markReported);

// // Questions and Answers
// router.get('/qa', controller.qa.get);
// router.post('/qa', controller.qa.post);
// router.put('/qa', controller.qa.put);

// Cart
router.get('/cart', controller.cart.getCart);
router.post('/cart/addToCart', controller.cart.addToCart);

// Interations
// router.post('/interactions', controller.interactions.get);

module.exports = router;