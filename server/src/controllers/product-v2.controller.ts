import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import type { ProductService } from '../services/ProductService.ts'

const paramsSchema = z.object({ id: z.uuid('ID inválido') })
const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().positive().default(10),
})
const createBodySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().default(''),
  price: z.number().positive('Preço deve ser positivo'),
  discount: z.number().min(0).max(1).default(0),
  stock: z.number().int().min(0, 'Estoque não pode ser negativo').default(0),
  image: z.string().default(''),
  categoryId: z.uuid('categoryId inválido'),
})
const updateBodySchema = createBodySchema.partial()

export class ProductController {
  constructor(private service: ProductService) {}

  list = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, size } = querySchema.parse(req.query)
      res.json(this.service.getAll(page, size))
    } catch (err) {
      next(err)
    }
  }

  getById = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = paramsSchema.parse(req.params)
      res.json(this.service.getById(id))
    } catch (err) {
      next(err)
    }
  }

  create = (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createBodySchema.parse(req.body)
      res.status(201).json(this.service.create(data))
    } catch (err) {
      next(err)
    }
  }

  update = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = paramsSchema.parse(req.params)
      const data = updateBodySchema.parse(req.body)
      res.json(this.service.update(id, data))
    } catch (err) {
      next(err)
    }
  }

  delete = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = paramsSchema.parse(req.params)
      this.service.delete(id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
