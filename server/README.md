Will update with Documentation

*API REFERENCE*

|Base URL |
|`http://localhost:3000/api`|

**Products**
>Products represent all products available to Project Catwalk
| Method | Endpoint | Params | Body |
|--------|----------|--------|------|
|GET|`/products`|`page`: int, `count`: int| N/A |
|GET|`/products/related`|`product_id`: int| N/A |
|GET|`/products/styles`|`product_id`: int| N/A |
|GET|`/products/product`|`product_id`: int| N/A |

**Reviews**
>Reviews are particular to a given product
| Method | Endpoint | Params | Body |
|--------|----------|--------|------|
|GET|`/reviews`|`count`: int, `product_id`: int| N/A |
|GET|`/reviews/meta`|`count`: int, `product_id`: int| N/A |
|POST|`/reviews`|`product_id`: int| `product_id`: int, `rating`: int, `summary`: string, `body`: string, `recommend`: boolean, `name`: string, `email`: string, `photos`: [string or strings of photo urls], `characteristics`: {int: int}|
|PUT|`reviews/report`|`review_id`: int|empty object|
|PUT|`reviews/helpful`|`review_id`: int|empty object|


**Questions and Answers**
>Questions related to a given product
| Method | Endpoint | Params | Body |
|--------|----------|--------|------|
|`PUT`|`/qa/question/helpful`|`question_id`: int|`empty object` {}|
|`PUT`|`/qa/answer/helpful`|`answer_id`: int|`empty object` {}|
|`PUT`|`/qa/question/report`|`question_id`: int|`empty object` {}|
|`PUT`|`/qa/answer/report`|`answer_id`: int|`empty object` {}|
|`POST`|`/qa/answer`|`answer_id`: int|`body`: string, `name`: string, `email`: string (must be valid email), `photos`: [string or strings of photo urls]|
|`POST`|`/qa/question`|`question_id`: int|`body`: string, `name`: string, `email`: string (must be valid email), `product_id`: int|
|`GET`|`/qa/questions`|`product_id`: int, `count`: int|N/A|
|`GET`|`/qa/question/answers`|`question_id`: int|N/A|

**Cart**
>Ability to add to cart and get current cart
| Method | Endpoint | Params | Body |
|--------|----------|--------|------|
|POST|`/cart/addToCart`|N/A|{ sku_id: int }|
|GET|`/cart`|N/A|N/A|

**Interactions**
>Track click data
| Method | Endpoint | Params | Body |
|--------|----------|--------|------|
|POST|`/interactions`|N/A|{ element: string, widget: string, time: string }|
