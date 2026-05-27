import type { Request, Response } from 'express'

// 3FN: gerente_depto depende de departamento, não de venda_id
interface Departamento {
  departamento_id: string
  departamento: string
  gerente_depto: string
}

// 3FN: vendedor_nome depende de vendedor_id, não de venda_id
interface Vendedor {
  vendedor_id: string
  vendedor_nome: string
  departamento_id: string
}

// venda_id → vendedor_id + valor (sem redundância de nome/departamento)
interface Venda {
  venda_id: string
  vendedor_id: string
  valor_venda: number
}

const DEP_ELETRONICOS = 'cccc0001-0000-4000-8000-000000000001'
const DEP_ROUPAS      = 'cccc0001-0000-4000-8000-000000000002'
const VEN_CARLA       = 'dddd0001-0000-4000-8000-000000000005'
const VEN_BRUNO       = 'dddd0001-0000-4000-8000-000000000008'

const departamentos: Departamento[] = [
  { departamento_id: DEP_ELETRONICOS, departamento: 'Eletrônicos', gerente_depto: 'Marcos' },
  { departamento_id: DEP_ROUPAS, departamento: 'Roupas', gerente_depto: 'Fernanda' },
]

const vendedores: Vendedor[] = [
  { vendedor_id: VEN_CARLA, vendedor_nome: 'Carla', departamento_id: DEP_ELETRONICOS },
  { vendedor_id: VEN_BRUNO, vendedor_nome: 'Bruno', departamento_id: DEP_ROUPAS },
]

const vendas: Venda[] = [
  { venda_id: 'eeee0001-0000-4000-8000-000000000101', vendedor_id: VEN_CARLA, valor_venda: 1200 },
  { venda_id: 'eeee0001-0000-4000-8000-000000000102', vendedor_id: VEN_CARLA, valor_venda: 850 },
  { venda_id: 'eeee0001-0000-4000-8000-000000000103', vendedor_id: VEN_BRUNO, valor_venda: 300 },
]

export const vendaController = {
  listDepartamentos(_req: Request, res: Response) {
    res.json(departamentos)
  },

  createDepartamento(req: Request, res: Response) {
    const dep: Departamento = {
      departamento_id: crypto.randomUUID(),
      departamento: req.body.departamento,
      gerente_depto: req.body.gerente_depto,
    }
    departamentos.push(dep)
    res.status(201).json(dep)
  },

  listVendedores(_req: Request, res: Response) {
    res.json(vendedores)
  },

  createVendedor(req: Request, res: Response) {
    const depExists = departamentos.find((d) => d.departamento_id === req.body.departamento_id)
    if (!depExists) return res.status(404).json({ error: 'Departamento não encontrado' })

    const vendedor: Vendedor = {
      vendedor_id: crypto.randomUUID(),
      vendedor_nome: req.body.vendedor_nome,
      departamento_id: req.body.departamento_id,
    }
    vendedores.push(vendedor)
    res.status(201).json(vendedor)
  },

  listVendas(_req: Request, res: Response) {
    res.json(vendas)
  },

  createVenda(req: Request, res: Response) {
    const vendedorExists = vendedores.find((v) => v.vendedor_id === req.body.vendedor_id)
    if (!vendedorExists) return res.status(404).json({ error: 'Vendedor não encontrado' })

    const venda: Venda = {
      venda_id: crypto.randomUUID(),
      vendedor_id: req.body.vendedor_id,
      valor_venda: req.body.valor_venda,
    }
    vendas.push(venda)
    res.status(201).json(venda)
  },
}
