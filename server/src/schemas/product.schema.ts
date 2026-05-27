import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
  price: z.number().positive('Preço deve ser um número positivo'),
  discount: z.number().min(0).max(1).default(0),
  image: z.url('Imagem deve ser uma URL válida').optional().default(''),
  categoryId: z.uuid('categoryId deve ser um UUID válido'),
})

export const productParamsSchema = z.object({
  id: z.uuid('ID deve ser um UUID válido'),
})
