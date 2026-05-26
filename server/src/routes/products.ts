import { Router } from 'express'
import type { Request, Response } from 'express'

export const productsRouter = Router()

const products = [
  { id: 1, name: 'Notebook', category: 'eletronicos', price: 3500 },
  { id: 2, name: 'Smartphone', category: 'eletronicos', price: 1800 },
  { id: 3, name: 'Camiseta', category: 'roupas', price: 49.9 },
  { id: 4, name: 'Calça Jeans', category: 'roupas', price: 129.9 },
  { id: 5, name: 'Arroz 5kg', category: 'alimentos', price: 28.5 },
  { id: 6, name: 'Feijão 1kg', category: 'alimentos', price: 9.9 },
]

// GET /products?category=eletronicos
productsRouter.get('/', (req: Request, res: Response) => {
  const { category } = req.query
  if (category) {
    return res.json(products.filter((p) => p.category === category))
  }
  res.json(products)
})

// GET /products/:id
productsRouter.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (id < 0) {
    return res.status(400).json({ error: 'ID inválido: não pode ser negativo' })
  }

  const product = products.find((p) => p.id === id)
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' })
  }

  res.json(product)
})
