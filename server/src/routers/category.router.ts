import { Router } from 'express'
import { categoryController } from '../controllers/category.controller.ts'
import { validateData } from '../middlewares/validateData.ts'
import {
  createCategorySchema,
  categoryParamsSchema,
  categoryQueryPaginationSchema,
} from '../schemas/category.schema.ts'

export const categoryRouter = Router()

// GET /category?page=1&size=10
categoryRouter.get('/', validateData(categoryQueryPaginationSchema, 'query'), categoryController.list)

// POST /category
categoryRouter.post('/', validateData(createCategorySchema), categoryController.create)

// GET /category/:id
categoryRouter.get('/:id', validateData(categoryParamsSchema, 'params'), categoryController.getById)

// PUT /category/:id
categoryRouter.put(
  '/:id',
  validateData(categoryParamsSchema, 'params'),
  validateData(createCategorySchema),
  categoryController.update,
)

// DELETE /category/:id
categoryRouter.delete('/:id', validateData(categoryParamsSchema, 'params'), categoryController.delete)
