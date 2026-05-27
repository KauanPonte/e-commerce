import { z } from 'zod'

export const createGarcomSchema = z.object({
  garcom_nome: z.string().min(3, 'Nome do garçom deve ter no mínimo 3 caracteres'),
  garcom_turno: z.enum(['Manhã', 'Tarde', 'Noite'], {
    error: 'Turno deve ser Manhã, Tarde ou Noite',
  }),
})

export const createPedidoSchema = z.object({
  mesa: z.number().int().positive('Mesa deve ser um número positivo'),
  garcom_id: z.uuid('garcom_id deve ser um UUID válido'),
})

export const pedidoParamsSchema = z.object({
  id: z.uuid('ID deve ser um UUID válido'),
})

export const createItemPedidoSchema = z.object({
  item: z.string().min(2, 'Nome do item deve ter no mínimo 2 caracteres'),
  preco: z.number().positive('Preço deve ser positivo'),
})
