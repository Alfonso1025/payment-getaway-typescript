Example of how to send a request to add a product

{
  
  "product_name": "Another Product",
  "price": 19.99,
  "category": 1,
  "product_description": "This is another product description.",
  "product_images": null,
  "qty": 100
}

Example of how to send a request to add quantity

{
  "qty" : 5,
  "productId" : 3
}
Example of request object for deleting a product with associated images
 {
  "images" : ['imageOne', 'imageTwo'],
  "productId" : 3
 }

