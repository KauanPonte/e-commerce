import { Router } from 'express'
import { productController } from '../controllers/product.controller.ts'
import { validateData } from '../middlewares/validateData.ts'
import { createProductSchema, productParamsSchema } from '../schemas/product.schema.ts'

export const productRouter = Router()

// GET /products?category=<uuid>
productRouter.get('/', productController.list)

// POST /products
productRouter.post('/', validateData(createProductSchema), productController.create)

// DELETE /products/:id
productRouter.delete('/:id', validateData(productParamsSchema, 'params'), productController.delete)
