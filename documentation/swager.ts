// swaggerOptions.ts

import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'ecommerce-api',
      version: '1.0.0',
      description: 'This an eccomerce API that enables to execute CRUD operations on the following models: Users, Administrators,Products, Shipping Addresses, Shopping Carts, Orders and Invoices, ',
      contact: {
        name: 'Alfonso Ramirez',
        //url: 'https://yourwebsite.com',
        email: 'alfonso25elorriaga@yahoo.com'
      },
      servers: [
        {
          url: 'http://localhost:3000', 
        },
      ],
    },
  },
  // Path to the API docs
  apis: ['./routes/*.ts', './products/routes.ts'], 
};

export default swaggerOptions;
