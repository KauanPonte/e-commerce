import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from '../errors/AppError.ts'

export const JWT_SECRET = process.env.JWT_SECRET ?? 'pontemrket_secret_dev'

interface JwtPayload {
  id: string
  email: string
  role: string
}

// Extende o tipo Request do Express para incluir req.user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError(401, 'Token não fornecido'))
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload
    req.user = payload
    next()
  } catch {
    next(new AppError(401, 'Token inválido ou expirado'))
  }
}
