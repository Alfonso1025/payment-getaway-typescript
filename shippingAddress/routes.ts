import { Router} from 'express';
import { controller } from './dependencies';


export const shippAddrRouter = Router();

shippAddrRouter.post("/",controller.post.bind(controller));