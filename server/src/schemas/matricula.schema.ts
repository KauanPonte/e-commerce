import { z } from 'zod'

export const createMatriculaSchema = z.object({
  aluno_nome: z.string().min(3, 'Nome do aluno deve ter no mínimo 3 caracteres'),
})

export const matriculaParamsSchema = z.object({
  id: z.uuid('ID deve ser um UUID válido'),
})

export const createDisciplinaSchema = z.object({
  disciplina: z.string().min(2, 'Nome da disciplina deve ter no mínimo 2 caracteres'),
  professor: z.string().min(3, 'Nome do professor deve ter no mínimo 3 caracteres'),
})
