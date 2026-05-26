import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'

export const ordersRouter = Router()

function validateBody(req: Request, res: Response, next: NextFunction) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Body da requisição não pode estar vazio' })
  }
  next()
}

// POST /orders — cria um pedido
ordersRouter.post('/', validateBody, (req: Request, res: Response) => {
  const order = {
    id: Date.now(),
    ...req.body,
    status: 'pendente',
    createdAt: new Date().toISOString(),
  }
  res.status(201).json(order)
})

// PATCH /orders/:id — atualiza o status do pedido
ordersRouter.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    id,
    ...req.body,
    updatedAt: new Date().toISOString(),
  })
})

// DELETE /orders/:id — cancela o pedido
ordersRouter.delete('/:id', (req: Request, res: Response) => {
  res.status(204).send()
})
