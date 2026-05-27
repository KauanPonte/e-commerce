import type { Request, Response } from 'express'

// 2FN/3FN: garcom_nome e garcom_turno dependem apenas do garcom_id (não do pedido)
interface Garcom {
  garcom_id: string
  garcom_nome: string
  garcom_turno: 'Manhã' | 'Tarde' | 'Noite'
}

// 2FN: pedido tem mesa e FK para garçom (sem dados do garçom aqui)
interface Pedido {
  pedido_id: string
  mesa: number
  garcom_id: string
}

// 1FN: cada item do pedido é uma linha separada (antes eram "Pizza, Suco, Sorvete")
interface ItemPedido {
  id: string
  pedido_id: string
  item: string
  preco: number
}

const GAR_LUCAS = 'aaaa0001-0000-4000-8000-000000000001'
const GAR_ANA   = 'aaaa0001-0000-4000-8000-000000000002'
const PED_1     = 'bbbb0001-0000-4000-8000-000000000001'
const PED_2     = 'bbbb0001-0000-4000-8000-000000000002'

const garcons: Garcom[] = [
  { garcom_id: GAR_LUCAS, garcom_nome: 'Lucas', garcom_turno: 'Noite' },
  { garcom_id: GAR_ANA, garcom_nome: 'Ana', garcom_turno: 'Tarde' },
]

const pedidos: Pedido[] = [
  { pedido_id: PED_1, mesa: 5, garcom_id: GAR_LUCAS },
  { pedido_id: PED_2, mesa: 3, garcom_id: GAR_ANA },
]

const itensPedido: ItemPedido[] = [
  { id: crypto.randomUUID(), pedido_id: PED_1, item: 'Pizza', preco: 35 },
  { id: crypto.randomUUID(), pedido_id: PED_1, item: 'Suco', preco: 12 },
  { id: crypto.randomUUID(), pedido_id: PED_1, item: 'Sorvete', preco: 25 },
  { id: crypto.randomUUID(), pedido_id: PED_2, item: 'Hambúrguer', preco: 28 },
  { id: crypto.randomUUID(), pedido_id: PED_2, item: 'Refrigerante', preco: 10 },
]

export const restauranteController = {
  listGarcons(_req: Request, res: Response) {
    res.json(garcons)
  },

  createGarcom(req: Request, res: Response) {
    const garcom: Garcom = {
      garcom_id: crypto.randomUUID(),
      garcom_nome: req.body.garcom_nome,
      garcom_turno: req.body.garcom_turno,
    }
    garcons.push(garcom)
    res.status(201).json(garcom)
  },

  listPedidos(_req: Request, res: Response) {
    res.json(pedidos)
  },

  createPedido(req: Request, res: Response) {
    const garcomExists = garcons.find((g) => g.garcom_id === req.body.garcom_id)
    if (!garcomExists) return res.status(404).json({ error: 'Garçom não encontrado' })

    const pedido: Pedido = {
      pedido_id: crypto.randomUUID(),
      mesa: req.body.mesa,
      garcom_id: req.body.garcom_id,
    }
    pedidos.push(pedido)
    res.status(201).json(pedido)
  },

  listItens(req: Request, res: Response) {
    const pedidoExists = pedidos.find((p) => p.pedido_id === req.params.id)
    if (!pedidoExists) return res.status(404).json({ error: 'Pedido não encontrado' })

    const itens = itensPedido.filter((i) => i.pedido_id === req.params.id)
    res.json(itens)
  },

  addItem(req: Request, res: Response) {
    const pedidoExists = pedidos.find((p) => p.pedido_id === req.params.id)
    if (!pedidoExists) return res.status(404).json({ error: 'Pedido não encontrado' })

    const item: ItemPedido = {
      id: crypto.randomUUID(),
      pedido_id: req.params.id as string,
      item: req.body.item,
      preco: req.body.preco,
    }
    itensPedido.push(item)
    res.status(201).json(item)
  },

  // 3FN: total não é armazenado, é calculado dinamicamente para evitar redundância
  getTotal(req: Request, res: Response) {
    const pedidoExists = pedidos.find((p) => p.pedido_id === req.params.id)
    if (!pedidoExists) return res.status(404).json({ error: 'Pedido não encontrado' })

    const itens = itensPedido.filter((i) => i.pedido_id === req.params.id)
    const total = itens.reduce((sum, i) => sum + i.preco, 0)
    res.json({ pedido_id: req.params.id, total })
  },
}
