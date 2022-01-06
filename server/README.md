Will update with Documentation

#API REFERENCE

Base URL will be 'http://localhost:3000/api'

##Products
Products represent all products available to Project Catwalk
| Method | Endpoint | Params | Body |
|--------|----------|--------|------|
|GET|`/products`|`page`: int, `count`: int| N/A |
|GET|`/products/related`|`product_id`: int| N/A |
|GET|`/products/styles`|`product_id`: int| N/A |
|GET|`/products/product`|`product_id`: int| N/A |

##Reviews
Reviews are particular to a given product
| Method | Endpoint | Params | Body |
|--------|----------|--------|------|
|GET|`/reviews`|`count`: int, `product_id`: int| N/A |
|GET|`/reviews/meta`|`count`: int, `product_id`: int| N/A |
|POST|`/reviews`|`product_id`: int| `product_id`: int, `rating`: int, `summary`: string, `body`: string, `recommend`: boolean, `name`: string, `email`: string, `photos`: [string(s)], `characteristics`: {int: int}|
|PUT|`reviews/report`|`review_id`: int|empty object|
|PUT|`reviews/helpful`|`review_id`: int|empty object|


##Questions and Answers
| Method | Endpoint | Params | Body |
|--------|----------|--------|------|


##Cart
| Method | Endpoint | Params | Body |
|--------|----------|--------|------|
|POST|`/cart/addToCart`|N/A|{ sku_id: int }|
|GET|`/cart`|N/A|N/A|

##Interactions
| Method | Endpoint | Params | Body |
|--------|----------|--------|------|
|POST|`/interactions`|N/A|{ element: string, widget: string, time: string }|
