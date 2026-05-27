import { z } from 'zod'

export const createLivroSchema = z.object({
  titulo_livro: z.string().min(2, 'Título deve ter no mínimo 2 caracteres'),
  isbn: z.string().min(5, 'ISBN deve ter no mínimo 5 caracteres'),
})

export const createUsuarioSchema = z.object({
  usuario_email: z.email('E-mail inválido'),
})

export const createEmprestimoSchema = z.object({
  livro_id: z.uuid('livro_id deve ser um UUID válido'),
  usuario_id: z.uuid('usuario_id deve ser um UUID válido'),
  data_emprestimo: z.iso.date('Data de empréstimo inválida'),
})
