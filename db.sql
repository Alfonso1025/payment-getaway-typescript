# CREATE DATABASE ecommerce;
use ecommerce;
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    first_name CHAR,
    last_name CHAR,
    email CHAR,
    user_password CHAR,
    prefered_shipping_address CHAR
);
CREATE TABLE categories(
	category_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    category_name CHAR
);
CREATE TABLE products(
	product_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    product_name CHAR,
    price FLOAT,
    category INT,
	FOREIGN KEY (category) REFERENCES categories(category_id)  
);
CREATE TABLE shopping_carts(
	shoppcart_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    date_of_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE shoppping_cart_products(
	shoppcart_id INT PRIMARY KEY,
	product_id INT PRIMARY KEY,
	FOREIGN KEY (shoppcart_id) REFERENCES shopping_carts(shoppcart_id),
	FOREIGN KEY (product_id) REFERENCES products(products_id)
);
CREATE TABLE taxes(
   tax_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
   tax_name CHAR,
   tax_percentage FLOAT
);
CREATE TABLE payment (
	payment_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    user_id INT,
    shoppcart_id INT,
    products_total FLOAT,
    tax_id FLOAT,
    total FLOAT,
    disscount float,
    payment_time  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);
CREATE TABLE orders (
	order_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    payment_id INT NOT NULL,
    shipping_address_id INT 
);