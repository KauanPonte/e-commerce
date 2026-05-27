import { Router } from 'express'
import { matriculaController } from '../controllers/matricula.controller.ts'
import { validateData } from '../middlewares/validateData.ts'
import {
  createMatriculaSchema,
  matriculaParamsSchema,
  createDisciplinaSchema,
} from '../schemas/matricula.schema.ts'

export const matriculaRouter = Router()

// GET /matriculas
matriculaRouter.get('/', matriculaController.list)

// POST /matriculas
matriculaRouter.post('/', validateData(createMatriculaSchema), matriculaController.create)

// GET /matriculas/:id/disciplinas
matriculaRouter.get(
  '/:id/disciplinas',
  validateData(matriculaParamsSchema, 'params'),
  matriculaController.listDisciplinas,
)

// POST /matriculas/:id/disciplinas
matriculaRouter.post(
  '/:id/disciplinas',
  validateData(matriculaParamsSchema, 'params'),
  validateData(createDisciplinaSchema),
  matriculaController.addDisciplina,
)
