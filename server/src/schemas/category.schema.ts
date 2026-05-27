import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
})

export const categoryParamsSchema = z.object({
  id: z.uuid('ID deve ser um UUID válido'),
})

export const categoryQueryPaginationSchema = z.object({
  page: z.coerce.number().int().positive('page deve ser um número positivo').default(1),
  size: z.coerce.number().int().positive('size deve ser um número positivo').default(10),
})
