import { Router } from 'express'
import { vendaController } from '../controllers/venda.controller.ts'
import { validateData } from '../middlewares/validateData.ts'
import {
  createDepartamentoSchema,
  createVendedorSchema,
  createVendaSchema,
} from '../schemas/venda.schema.ts'

export const vendaRouter = Router()

// GET /vendas/departamentos
vendaRouter.get('/departamentos', vendaController.listDepartamentos)

// POST /vendas/departamentos
vendaRouter.post('/departamentos', validateData(createDepartamentoSchema), vendaController.createDepartamento)

// GET /vendas/vendedores
vendaRouter.get('/vendedores', vendaController.listVendedores)

// POST /vendas/vendedores
vendaRouter.post('/vendedores', validateData(createVendedorSchema), vendaController.createVendedor)

// GET /vendas
vendaRouter.get('/', vendaController.listVendas)

// POST /vendas
vendaRouter.post('/', validateData(createVendaSchema), vendaController.createVenda)
