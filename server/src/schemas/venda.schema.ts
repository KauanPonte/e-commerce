import { z } from 'zod'

export const createDepartamentoSchema = z.object({
  departamento: z.string().min(2, 'Nome do departamento deve ter no mínimo 2 caracteres'),
  gerente_depto: z.string().min(3, 'Nome do gerente deve ter no mínimo 3 caracteres'),
})

export const departamentoParamsSchema = z.object({
  id: z.uuid('ID deve ser um UUID válido'),
})

export const createVendedorSchema = z.object({
  vendedor_nome: z.string().min(3, 'Nome do vendedor deve ter no mínimo 3 caracteres'),
  departamento_id: z.uuid('departamento_id deve ser um UUID válido'),
})

export const createVendaSchema = z.object({
  vendedor_id: z.uuid('vendedor_id deve ser um UUID válido'),
  valor_venda: z.number().positive('Valor da venda deve ser positivo'),
})
