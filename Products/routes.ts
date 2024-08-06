import { Router} from 'express';
import { controller } from './dependencies';
import { authorization } from '../middleware/authorization/dependencies';
import { validateMldw } from './middleware/dependecies';
import multer from 'multer';
const upload= multer({dest:'uploads'})
export const productsRouter = Router();
const authorize = authorization.authorize.bind(authorization)
productsRouter.get("/get-all",controller.getAllProducts.bind(controller));
/**
 * @swagger
 * /products/get-all:
 *   get:
 *     summary: Retrieve all products
 *     tags: 
 *       - Products
 *     responses:
 *       200:
 *         description: A list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                         example: 1
 *                       product_name:
 *                         type: string
 *                         example: "Product Name"
 *                       price:
 *                         type: number
 *                         example: 19.99
 *                       category:
 *                         type: integer
 *                         example: 1
 *                       product_description:
 *                         type: string
 *                         example: "This is a product description."
 *                       product_images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             image_id:
 *                               type: integer
 *                               example: 1
 *                             image_name:
 *                               type: string
 *                               example: "image1.jpg"
 *                             url:
 *                               type: string
 *                               example: "https://example.com/image1.jpg"
 *                       qty:
 *                         type: integer
 *                         example: 100
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "no records found"
 *                 code:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 code:
 *                   type: integer
 *                   example: 500
 */


productsRouter.post("/",authorize, validateMldw.addProduct.bind(validateMldw),controller.addProduct.bind(controller));
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *                 example: "Another Product"
 *               price:
 *                 type: number
 *                 example: 19.99
 *               category:
 *                 type: integer
 *                 example: 1
 *               product_description:
 *                 type: string
 *                 example: "This is another product description."
 *               product_images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     image_name:
 *                       type: string
 *                       example: "image1.jpg"
 *               qty:
 *                 type: integer
 *                 example: 100
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer {token}"
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     insertId: 
 *                       type: integer
 *                       example: 1
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *                 code:
 *                   type: integer
 *                   example: 400
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "invalid token"
 *                 code:
 *                   type: integer
 *                   example: 403
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 code:
 *                   type: integer
 *                   example: 500
 */


productsRouter.put('/add-qty',authorize,validateMldw.updateQuantity.bind(validateMldw),controller.addQuantity.bind(controller))
/**
 * @swagger
 * /products/add-qty:
 *   put:
 *     summary: Add quantity to a product
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qty:
 *                 type: integer
 *                 example: 5
 *               productId:
 *                 type: integer
 *                 example: 3
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer {token}"
 *     responses:
 *       200:
 *         description: Quantity added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null 
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *                 code:
 *                   type: integer
 *                   example: 400
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "no records found"
 *                 code:
 *                   type: integer
 *                   example: 404
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "invalid token"
 *                 code:
 *                   type: integer
 *                   example: 403
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 code:
 *                   type: integer
 *                   example: 500
 */

productsRouter.put('/reduce-qty',authorize,validateMldw.updateQuantity.bind(validateMldw),controller.reduceQuantity.bind(controller))
/**
 * @swagger
 * /products/reduce-qty:
 *   put:
 *     summary: Reduce quantity of a product
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qty:
 *                 type: integer
 *                 example: 5
 *               productId:
 *                 type: integer
 *                 example: 3
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer {token}"
 *     responses:
 *       200:
 *         description: Quantity added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null 
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *                 code:
 *                   type: integer
 *                   example: 400
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "no records found to update"
 *                 code:
 *                   type: integer
 *                   example: 404
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "invalid token"
 *                 code:
 *                   type: integer
 *                   example: 403
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 code:
 *                   type: integer
 *                   example: 500
 */
productsRouter.put('/edit-price',authorize,validateMldw.editPrice.bind(validateMldw),controller.editPrice.bind(controller))
/**
 * @swagger
 * /products/edit-price:
 *   put:
 *     summary: Edit the price of a product
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPrice:
 *                 type: integer
 *                 example: 40
 *               productId:
 *                 type: integer
 *                 example: 3
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer {token}"
 *     responses:
 *       200:
 *         description: Quantity added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null 
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *                 code:
 *                   type: integer
 *                   example: 400
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "no records found to update"
 *                 code:
 *                   type: integer
 *                   example: 404
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "invalid token"
 *                 code:
 *                   type: integer
 *                   example: 403
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 code:
 *                   type: integer
 *                   example: 500
 */
productsRouter.put('/edit-descript',authorize,validateMldw.editDescript.bind(validateMldw),controller.editDescript.bind(controller))
/**
 * @swagger
 * /products/edit-descript:
 *   put:
 *     summary: Edits the description of a product
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newDescript:
 *                 type: string
 *                 example: "the new description of a product"
 *               productId:
 *                 type: integer
 *                 example: 3
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer {token}"
 *     responses:
 *       200:
 *         description: Quantity added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null 
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *                 code:
 *                   type: integer
 *                   example: 400
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "no records found to update"
 *                 code:
 *                   type: integer
 *                   example: 404
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "invalid token"
 *                 code:
 *                   type: integer
 *                   example: 403
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 code:
 *                   type: integer
 *                   example: 500
 */

productsRouter.post('/add-image',authorize,upload.single('file'),controller.addImage.bind(controller))
/**
 * @swagger
 * /products/add-image:
 *   post:
 *     summary: Adds a new image associated with a product
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               productId:
 *                 type: integer
 *                 example: 3
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer {token}"
 *     responses:
 *       200:
 *         description: Image added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     insertId:
 *                     type: integer
 *                     example: 15
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *                 code:
 *                   type: integer
 *                   example: 400
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "invalid token"
 *                 code:
 *                   type: integer
 *                   example: 403
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 *                 code:
 *                   type: integer
 *                   example: 500
 */

productsRouter.put('/set-main-image',authorize,validateMldw.setMainImage,controller.setMainImage.bind(controller))

productsRouter.delete('/',authorize,controller.deleteProduct.bind(controller))