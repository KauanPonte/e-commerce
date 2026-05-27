import { Router } from 'express'
import { bibliotecaController } from '../controllers/biblioteca.controller.ts'
import { validateData } from '../middlewares/validateData.ts'
import {
  createLivroSchema,
  createUsuarioSchema,
  createEmprestimoSchema,
} from '../schemas/biblioteca.schema.ts'

export const bibliotecaRouter = Router()

// GET /biblioteca/livros
bibliotecaRouter.get('/livros', bibliotecaController.listLivros)

// POST /biblioteca/livros
bibliotecaRouter.post('/livros', validateData(createLivroSchema), bibliotecaController.createLivro)

// GET /biblioteca/usuarios
bibliotecaRouter.get('/usuarios', bibliotecaController.listUsuarios)

// POST /biblioteca/usuarios
bibliotecaRouter.post('/usuarios', validateData(createUsuarioSchema), bibliotecaController.createUsuario)

// GET /biblioteca/emprestimos
bibliotecaRouter.get('/emprestimos', bibliotecaController.listEmprestimos)

// POST /biblioteca/emprestimos
bibliotecaRouter.post('/emprestimos', validateData(createEmprestimoSchema), bibliotecaController.createEmprestimo)
