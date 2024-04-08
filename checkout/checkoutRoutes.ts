// routes.ts
import { Router} from 'express';

import { checkoutController } from './dependencies';


export const checkOutRouter = Router();

checkOutRouter.post("/create-session",checkoutController.createSession.bind(checkoutController));


