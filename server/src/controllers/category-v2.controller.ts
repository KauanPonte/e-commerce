import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import type { CategoryService } from '../services/CategoryService.ts'

const paramsSchema = z.object({ id: z.uuid('ID inválido') })
const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().positive().default(10),
})
const bodySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
})
const updateBodySchema = bodySchema // mesma regra para atualização

export class CategoryController {
  // O service é injetado no construtor — o controller não instancia nada
  constructor(private service: CategoryService) {}

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
      const { name } = bodySchema.parse(req.body)
      res.status(201).json(this.service.create(name))
    } catch (err) {
      next(err)
    }
  }

  update = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = paramsSchema.parse(req.params)
      const { name } = updateBodySchema.parse(req.body)
      res.json(this.service.update(id, name))
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
