import type { Request, Response, NextFunction } from 'express'
import type { ZodSchema } from 'zod'

type RequestTarget = 'body' | 'params' | 'query'

export const validateData =
  (schema: ZodSchema, target: RequestTarget = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target])
    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues })
    }
    next()
  }
