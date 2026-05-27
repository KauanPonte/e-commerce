import type { Request, Response } from 'express'

const categories = [
  { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Eletrônicos' },
  { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Roupas' },
  { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Alimentos' },
  { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Esportes' },
]

export const categoryController = {
  list(req: Request, res: Response) {
    const { page = 1, size = 10 } = req.query
    const start = (Number(page) - 1) * Number(size)
    const data = categories.slice(start, start + Number(size))
    res.json({ data, page: Number(page), size: Number(size), total: categories.length })
  },

  getById(req: Request, res: Response) {
    const category = categories.find((c) => c.id === req.params.id)
    if (!category) return res.status(404).json({ error: 'Categoria não encontrada' })
    res.json(category)
  },

  create(req: Request, res: Response) {
    const category = { id: crypto.randomUUID(), name: req.body.name }
    categories.push(category)
    res.status(201).json(category)
  },

  update(req: Request, res: Response) {
    const category = categories.find((c) => c.id === req.params.id)
    if (!category) return res.status(404).json({ error: 'Categoria não encontrada' })
    category.name = req.body.name
    res.json(category)
  },

  delete(_req: Request, res: Response) {
    res.status(204).send()
  },
}
