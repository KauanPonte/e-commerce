import { Router } from 'express'
import { clinicaController } from '../controllers/clinica.controller.ts'
import { validateData } from '../middlewares/validateData.ts'
import {
  createPacienteSchema,
  createPlanoSchema,
  createMedicoSchema,
  createSalaSchema,
  createConsultaSchema,
  consultaParamsSchema,
  createProcedimentoSchema,
} from '../schemas/clinica.schema.ts'

export const clinicaRouter = Router()

// --- Pacientes ---
clinicaRouter.get('/pacientes', clinicaController.listPacientes)
clinicaRouter.post('/pacientes', validateData(createPacienteSchema), clinicaController.createPaciente)

// --- Planos ---
clinicaRouter.get('/planos', clinicaController.listPlanos)
clinicaRouter.post('/planos', validateData(createPlanoSchema), clinicaController.createPlano)

// --- Médicos ---
clinicaRouter.get('/medicos', clinicaController.listMedicos)
clinicaRouter.post('/medicos', validateData(createMedicoSchema), clinicaController.createMedico)

// --- Salas ---
clinicaRouter.get('/salas', clinicaController.listSalas)
clinicaRouter.post('/salas', validateData(createSalaSchema), clinicaController.createSala)

// --- Consultas ---
clinicaRouter.get('/consultas', clinicaController.listConsultas)
clinicaRouter.post('/consultas', validateData(createConsultaSchema), clinicaController.createConsulta)

// --- Procedimentos (1FN: cada procedimento é uma linha) ---
clinicaRouter.get(
  '/consultas/:id/procedimentos',
  validateData(consultaParamsSchema, 'params'),
  clinicaController.listProcedimentos,
)
clinicaRouter.post(
  '/consultas/:id/procedimentos',
  validateData(consultaParamsSchema, 'params'),
  validateData(createProcedimentoSchema),
  clinicaController.addProcedimento,
)
