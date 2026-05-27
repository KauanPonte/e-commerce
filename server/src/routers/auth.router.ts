import { Router } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '../db/connection.ts'
import { AppError } from '../errors/AppError.ts'
import { JWT_SECRET } from '../middlewares/auth.middleware.ts'

export const authRouter = Router()

const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

interface UserRow {
  id: string
  email: string
  password_hash: string
  role: string
}

// POST /auth/login — retorna JWT para usar nas rotas protegidas
authRouter.post('/login', (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as UserRow | undefined
    if (!user) throw new AppError(401, 'Credenciais inválidas')

    const passwordOk = bcrypt.compareSync(password, user.password_hash)
    if (!passwordOk) throw new AppError(401, 'Credenciais inválidas')

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' },
    )

    res.json({ token, role: user.role })
  } catch (err) {
    next(err)
  }
})
