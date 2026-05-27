import { z } from 'zod'

export const createPacienteSchema = z.object({
  paciente_nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  paciente_cpf: z
    .string()
    .regex(/^\d{11}$/, 'CPF deve conter exatamente 11 dígitos numéricos'),
})

export const createPlanoSchema = z.object({
  plano_saude: z.string().min(2, 'Nome do plano deve ter no mínimo 2 caracteres'),
  plano_cobertura: z.number().min(0).max(100, 'Cobertura deve estar entre 0 e 100'),
})

export const createMedicoSchema = z.object({
  medico_nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  medico_crm: z.string().min(4, 'CRM inválido'),
  especialidade: z.string().min(3, 'Especialidade deve ter no mínimo 3 caracteres'),
})

export const createSalaSchema = z.object({
  sala_numero: z.number().int().positive('Número da sala deve ser positivo'),
  sala_andar: z.number().int().min(0, 'Andar não pode ser negativo'),
})

export const createConsultaSchema = z.object({
  paciente_id: z.uuid('paciente_id deve ser um UUID válido'),
  plano_id: z.uuid('plano_id deve ser um UUID válido'),
  medico_id: z.uuid('medico_id deve ser um UUID válido'),
  sala_id: z.uuid('sala_id deve ser um UUID válido'),
})

export const consultaParamsSchema = z.object({
  id: z.uuid('ID deve ser um UUID válido'),
})

export const createProcedimentoSchema = z.object({
  procedimento: z.string().min(3, 'Procedimento deve ter no mínimo 3 caracteres'),
})
