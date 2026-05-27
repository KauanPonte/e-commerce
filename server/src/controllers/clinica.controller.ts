import type { Request, Response } from 'express'

// Estrutura 3FN: cada tabela tem apenas atributos que dependem totalmente da sua PK

interface Paciente {
  paciente_id: string
  paciente_nome: string
  paciente_cpf: string
}

// plano_cobertura depende de plano_saude (não de consulta_id) — separado aqui
interface Plano {
  plano_id: string
  plano_saude: string
  plano_cobertura: number
}

// medico_nome e especialidade dependem de medico_crm — separado aqui
interface Medico {
  medico_id: string
  medico_nome: string
  medico_crm: string
  especialidade: string
}

// sala_andar depende de sala_numero — separado aqui
interface Sala {
  sala_id: string
  sala_numero: number
  sala_andar: number
}

interface Consulta {
  consulta_id: string
  paciente_id: string
  plano_id: string
  medico_id: string
  sala_id: string
}

// 1FN: procedimentos multivalorados viram linhas separadas
interface Procedimento {
  id: string
  consulta_id: string
  procedimento: string
}

const pacientes: Paciente[] = []
const planos: Plano[] = []
const medicos: Medico[] = []
const salas: Sala[] = []
const consultas: Consulta[] = []
const procedimentos: Procedimento[] = []

export const clinicaController = {
  listPacientes(_req: Request, res: Response) {
    res.json(pacientes)
  },

  createPaciente(req: Request, res: Response) {
    const paciente: Paciente = {
      paciente_id: crypto.randomUUID(),
      paciente_nome: req.body.paciente_nome,
      paciente_cpf: req.body.paciente_cpf,
    }
    pacientes.push(paciente)
    res.status(201).json(paciente)
  },

  listPlanos(_req: Request, res: Response) {
    res.json(planos)
  },

  createPlano(req: Request, res: Response) {
    const plano: Plano = {
      plano_id: crypto.randomUUID(),
      plano_saude: req.body.plano_saude,
      plano_cobertura: req.body.plano_cobertura,
    }
    planos.push(plano)
    res.status(201).json(plano)
  },

  listMedicos(_req: Request, res: Response) {
    res.json(medicos)
  },

  createMedico(req: Request, res: Response) {
    const medico: Medico = {
      medico_id: crypto.randomUUID(),
      medico_nome: req.body.medico_nome,
      medico_crm: req.body.medico_crm,
      especialidade: req.body.especialidade,
    }
    medicos.push(medico)
    res.status(201).json(medico)
  },

  listSalas(_req: Request, res: Response) {
    res.json(salas)
  },

  createSala(req: Request, res: Response) {
    const sala: Sala = {
      sala_id: crypto.randomUUID(),
      sala_numero: req.body.sala_numero,
      sala_andar: req.body.sala_andar,
    }
    salas.push(sala)
    res.status(201).json(sala)
  },

  listConsultas(_req: Request, res: Response) {
    res.json(consultas)
  },

  createConsulta(req: Request, res: Response) {
    if (!pacientes.find((p) => p.paciente_id === req.body.paciente_id))
      return res.status(404).json({ error: 'Paciente não encontrado' })
    if (!planos.find((p) => p.plano_id === req.body.plano_id))
      return res.status(404).json({ error: 'Plano não encontrado' })
    if (!medicos.find((m) => m.medico_id === req.body.medico_id))
      return res.status(404).json({ error: 'Médico não encontrado' })
    if (!salas.find((s) => s.sala_id === req.body.sala_id))
      return res.status(404).json({ error: 'Sala não encontrada' })

    const consulta: Consulta = {
      consulta_id: crypto.randomUUID(),
      paciente_id: req.body.paciente_id,
      plano_id: req.body.plano_id,
      medico_id: req.body.medico_id,
      sala_id: req.body.sala_id,
    }
    consultas.push(consulta)
    res.status(201).json(consulta)
  },

  addProcedimento(req: Request, res: Response) {
    const consultaExists = consultas.find((c) => c.consulta_id === req.params.id)
    if (!consultaExists) return res.status(404).json({ error: 'Consulta não encontrada' })

    const proc: Procedimento = {
      id: crypto.randomUUID(),
      consulta_id: req.params.id as string,
      procedimento: req.body.procedimento,
    }
    procedimentos.push(proc)
    res.status(201).json(proc)
  },

  listProcedimentos(req: Request, res: Response) {
    const consultaExists = consultas.find((c) => c.consulta_id === req.params.id)
    if (!consultaExists) return res.status(404).json({ error: 'Consulta não encontrada' })

    res.json(procedimentos.filter((p) => p.consulta_id === req.params.id))
  },
}
