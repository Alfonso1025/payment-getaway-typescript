import { Router} from 'express';
import { controller } from './dependencies';
import { validateMldw } from './middleware/dependencies';

export const shippAddrRouter = Router();

shippAddrRouter.post("/", validateMldw.createAddress.bind(validateMldw),controller.post.bind(controller));
shippAddrRouter.get("/:personId", controller.getUserShippingAddresses.bind(controller))