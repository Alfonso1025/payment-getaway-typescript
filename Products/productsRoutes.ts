import { Router} from 'express';
import { productsController } from './dependencies';
import { validateMldw } from './middleware/dependecies';
import multer from 'multer';
const upload= multer({dest:'uploads'})
export const productsRouter = Router();

productsRouter.get("/get-all",productsController.getAllProducts.bind(productsController));
productsRouter.post("/",validateMldw.addProduct.bind(validateMldw),productsController.addProduct.bind(productsController));
productsRouter.put('/add-qty',validateMldw.updateQuantity.bind(validateMldw),productsController.addQuantity.bind(productsController))
productsRouter.put('/reduce-qty',validateMldw.updateQuantity.bind(validateMldw),productsController.reduceQuantity.bind(productsController))
productsRouter.put('/edit-price',validateMldw.editPrice.bind(validateMldw),productsController.editPrice.bind(productsController))
productsRouter.put('/edit-descript',validateMldw.editDescript.bind(validateMldw),productsController.editDescript.bind(productsController))

productsRouter.post('/add-image',upload.single('file'), 
                    productsController.addImage.bind(productsController))
productsRouter.put('/set-main-image',validateMldw.setMainImage,productsController.setMainImage.bind(productsController))
productsRouter.delete('/',productsController.deleteProduct.bind(productsController))