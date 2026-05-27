import { Router } from 'express'
import { restauranteController } from '../controllers/restaurante.controller.ts'
import { validateData } from '../middlewares/validateData.ts'
import {
  createGarcomSchema,
  createPedidoSchema,
  pedidoParamsSchema,
  createItemPedidoSchema,
} from '../schemas/restaurante.schema.ts'

export const restauranteRouter = Router()

// GET /restaurante/garcons
restauranteRouter.get('/garcons', restauranteController.listGarcons)

// POST /restaurante/garcons
restauranteRouter.post('/garcons', validateData(createGarcomSchema), restauranteController.createGarcom)

// GET /restaurante/pedidos
restauranteRouter.get('/pedidos', restauranteController.listPedidos)

// POST /restaurante/pedidos
restauranteRouter.post('/pedidos', validateData(createPedidoSchema), restauranteController.createPedido)

// GET /restaurante/pedidos/:id/itens
restauranteRouter.get(
  '/pedidos/:id/itens',
  validateData(pedidoParamsSchema, 'params'),
  restauranteController.listItens,
)

// POST /restaurante/pedidos/:id/itens
restauranteRouter.post(
  '/pedidos/:id/itens',
  validateData(pedidoParamsSchema, 'params'),
  validateData(createItemPedidoSchema),
  restauranteController.addItem,
)

// GET /restaurante/pedidos/:id/total  (total calculado, não armazenado — 3FN)
restauranteRouter.get(
  '/pedidos/:id/total',
  validateData(pedidoParamsSchema, 'params'),
  restauranteController.getTotal,
)
