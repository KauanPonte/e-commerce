import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError.ts'

// Fábrica de middleware: authorize('admin') retorna um middleware que verifica a role
export const authorize =
  (role: string) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return next(new AppError(403, 'Acesso negado: permissão insuficiente'))
    }
    next()
  }
