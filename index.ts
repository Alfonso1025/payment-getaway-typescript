// index.js
import dotenv from 'dotenv';
dotenv.config();
//swager imports
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './documentation/swager';

import express, { Request, Response } from 'express';
import {checkOutRouter} from './checkout/checkoutRoutes';
import { usersRouter } from './users/userRoutes';
import { productsRouter } from './Products/routes';
import cors from 'cors'
import { shippAddrRouter } from './shippingAddress/routes';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//swagger setup
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routes
app.use('/checkout',checkOutRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/shipping-address',shippAddrRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
