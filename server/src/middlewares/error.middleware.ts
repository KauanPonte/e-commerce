import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError.ts'

// Express identifica middleware de erro pelo 4º parâmetro (err)
export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  // Erros de validação do Zod (lançados via schema.parse())
  if (err instanceof Error && err.name === 'ZodError') {
    return res.status(400).json({ error: 'Dados inválidos', details: err.message })
  }

  console.error('[ERROR]', err)
  res.status(500).json({ error: 'Erro interno do servidor' })
}
