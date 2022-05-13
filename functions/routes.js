const controller = require('./controllers');
const router = require('express').Router();

// Products
router.get('/products', controller.products.getProducts);
router.get('/products/product', controller.products.getProductInfo);
router.get('/products/styles', controller.products.getProductStyles);
router.get('/products/related', controller.products.getRelatedProducts);
// Reviews
router.get('/reviews', controller.reviews.getReviews);
router.post('/reviews', controller.reviews.postReview);
router.put('/reviews/report', controller.reviews.markReported);
router.put('/reviews/helpful', controller.reviews.markAsHelpful);
router.get('/reviews/meta', controller.reviews.getReviewMetadata);

// Questions and Answers
router.put('/qa/question/helpful', controller.qa.markQuestionAsHelpful);
router.put('/qa/answer/helpful', controller.qa.markAnswerAsHelpful);
router.put('/qa/question/report', controller.qa.reportQuestion);
router.put('/qa/answer/report', controller.qa.reportAnswer);
router.post('/qa/answer', controller.qa.postAnswer);
router.post('/qa/question', controller.qa.postQuestion);
router.get('/qa/questions', controller.qa.getQuestions);
router.get('/qa/question/answers', controller.qa.getAnswers);

// Cart
router.get('/cart', controller.cart.getCart);
router.post('/cart/addToCart', controller.cart.addToCart);

// Interactions
router.post('/interactions', controller.interactions.logInteraction);

// Outfits
// router.post('/outfit', controller.outfits.saveOutfit);

module.exports = router;
