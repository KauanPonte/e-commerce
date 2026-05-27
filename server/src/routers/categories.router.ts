import { Router } from 'express'
import db from '../db/connection.ts'
import { CategoryRepository } from '../repositories/CategoryRepository.ts'
import { CategoryService } from '../services/CategoryService.ts'
import { CategoryController } from '../controllers/category-v2.controller.ts'
import { authMiddleware } from '../middlewares/auth.middleware.ts'
import { authorize } from '../middlewares/authorize.ts'

// Composição das dependências (Dependency Injection manual)
const categoryRepo = new CategoryRepository(db)
const categoryService = new CategoryService(categoryRepo)
const categoryController = new CategoryController(categoryService)

export const categoriesRouter = Router()

// Rotas públicas — sem autenticação
categoriesRouter.get('/', categoryController.list)
categoriesRouter.get('/:id', categoryController.getById)

// Rotas protegidas — requer token JWT com role admin
categoriesRouter.post('/', authMiddleware, authorize('admin'), categoryController.create)
categoriesRouter.put('/:id', authMiddleware, authorize('admin'), categoryController.update)
categoriesRouter.delete('/:id', authMiddleware, authorize('admin'), categoryController.delete)
