import type { Request, Response } from 'express'

interface Product {
  id: string
  name: string
  description: string
  price: number
  discount: number
  image: string
  category: string
}

const products: Product[] = [
  {
    id: '100e8400-e29b-41d4-a716-446655440001',
    name: 'Notebook Gamer',
    description: 'Alto desempenho para trabalho e jogos',
    price: 3499,
    discount: 0.1,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=280&fit=crop',
    category: 'Eletrônicos',
  },
  {
    id: '100e8400-e29b-41d4-a716-446655440002',
    name: 'Smartphone Pro',
    description: 'Câmera de 108MP e bateria de longa duração',
    price: 1899,
    discount: 0.05,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=280&fit=crop',
    category: 'Eletrônicos',
  },
  {
    id: '100e8400-e29b-41d4-a716-446655440003',
    name: 'Fone Bluetooth',
    description: 'Som imersivo com cancelamento de ruído',
    price: 349,
    discount: 0.15,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=280&fit=crop',
    category: 'Eletrônicos',
  },
  {
    id: '200e8400-e29b-41d4-a716-446655440001',
    name: 'Camiseta Básica',
    description: '100% algodão, confortável para o dia a dia',
    price: 59,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=280&fit=crop',
    category: 'Roupas',
  },
  {
    id: '200e8400-e29b-41d4-a716-446655440002',
    name: 'Tênis Esportivo',
    description: 'Leveza e amortecimento para sua corrida',
    price: 299,
    discount: 0.1,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=280&fit=crop',
    category: 'Roupas',
  },
  {
    id: '200e8400-e29b-41d4-a716-446655440003',
    name: 'Mochila Urban',
    description: 'Compartimento para notebook até 15"',
    price: 189,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=280&fit=crop',
    category: 'Roupas',
  },
  {
    id: '300e8400-e29b-41d4-a716-446655440001',
    name: 'Arroz Integral 5kg',
    description: 'Rico em fibras, ideal para uma dieta saudável',
    price: 32,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=280&fit=crop',
    category: 'Alimentos',
  },
  {
    id: '300e8400-e29b-41d4-a716-446655440002',
    name: 'Café Especial 500g',
    description: 'Grãos selecionados torrados na hora',
    price: 49,
    discount: 0.05,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=280&fit=crop',
    category: 'Alimentos',
  },
  {
    id: '300e8400-e29b-41d4-a716-446655440003',
    name: 'Azeite Extra Virgem',
    description: 'Importado, acidez inferior a 0,3%',
    price: 38,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=280&fit=crop',
    category: 'Alimentos',
  },
  {
    id: '400e8400-e29b-41d4-a716-446655440001',
    name: 'Bola de Futebol',
    description: 'Oficial, ideal para campos e quadras',
    price: 129,
    discount: 0.1,
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=280&fit=crop',
    category: 'Esportes',
  },
  {
    id: '400e8400-e29b-41d4-a716-446655440002',
    name: 'Raquete de Tênis',
    description: 'Grafite leve e resistente para todos os níveis',
    price: 249,
    discount: 0,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=280&fit=crop',
    category: 'Esportes',
  },
  {
    id: '400e8400-e29b-41d4-a716-446655440003',
    name: 'Garrafa Térmica 1L',
    description: 'Mantém quente por 12h e gelado por 24h',
    price: 89,
    discount: 0.05,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=280&fit=crop',
    category: 'Esportes',
  },
]

export const productController = {
  list(req: Request, res: Response) {
    const { category } = req.query
    const data = category ? products.filter((p) => p.category === category) : products
    res.json(data)
  },

  create(req: Request, res: Response) {
    const product = { id: crypto.randomUUID(), ...req.body }
    products.push(product)
    res.status(201).json(product)
  },

  delete(_req: Request, res: Response) {
    res.status(204).send()
  },
}
