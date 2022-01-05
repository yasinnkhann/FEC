const controller = require('./controllers');
const router = require('express').Router();

// Products
router.get('/products', controller.products.getProducts);
router.get('/products/related', controller.products.getRelatedProducts);

// Reviews
// router.get('/reviews', controller.reviews.get);
// router.post('/reviews', controller.reviews.post);
// router.put('/reviews', controller.reviews.put);

// // Questions and Answers
// router.get('/qa', controller.qa.get);
// router.post('/qa', controller.qa.post);
// router.put('/qa', controller.qa.put);

// Cart
router.post('/cart', controller.cart.post);

// Interations
// router.post('/interactions', controller.interactions.get);

module.exports = router;