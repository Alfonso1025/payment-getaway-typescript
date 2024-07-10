// index.js
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import {checkOutRouter} from './checkout/checkoutRoutes';
import { usersRouter } from './users/userRoutes';
import { productsRouter } from './Products/productsRoutes';
import cors from 'cors'
import { shippAddrRouter } from './shippingAddress/routes';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/checkout',checkOutRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/shipping-address',shippAddrRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
