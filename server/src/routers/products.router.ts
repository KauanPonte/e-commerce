import { Router } from 'express'
import db from '../db/connection.ts'
import { CategoryRepository } from '../repositories/CategoryRepository.ts'
import { ProductRepository } from '../repositories/ProductRepository.ts'
import { ProductService } from '../services/ProductService.ts'
import { ProductController } from '../controllers/product-v2.controller.ts'
import { authMiddleware } from '../middlewares/auth.middleware.ts'
import { authorize } from '../middlewares/authorize.ts'

// ProductService recebe dois repositórios: o próprio e o de categoria (para validar FK)
const categoryRepo = new CategoryRepository(db)
const productRepo = new ProductRepository(db)
const productService = new ProductService(productRepo, categoryRepo)
const productController = new ProductController(productService)

export const productsRouter = Router()

// Rotas públicas
productsRouter.get('/', productController.list)
productsRouter.get('/:id', productController.getById)

// Rotas protegidas (admin)
productsRouter.post('/', authMiddleware, authorize('admin'), productController.create)
productsRouter.put('/:id', authMiddleware, authorize('admin'), productController.update)
productsRouter.delete('/:id', authMiddleware, authorize('admin'), productController.delete)
