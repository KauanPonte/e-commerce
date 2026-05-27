import type { Request, Response } from 'express'

// 1FN: aluno_nome é atômico (uma matrícula = um aluno)
interface Matricula {
  matricula_id: string
  aluno_nome: string
}

// 1FN: cada linha tem uma disciplina + professor (antes estavam em listas separadas por vírgula)
interface MatriculaDisciplina {
  id: string
  matricula_id: string
  disciplina: string
  professor: string
}

const M_ANA = 'a1b2c3d4-0000-4000-8000-000000000001'
const M_PEDRO = 'a1b2c3d4-0000-4000-8000-000000000002'

const matriculas: Matricula[] = [
  { matricula_id: M_ANA, aluno_nome: 'Ana Lima' },
  { matricula_id: M_PEDRO, aluno_nome: 'Pedro Souza' },
]

const matriculaDisciplinas: MatriculaDisciplina[] = [
  { id: crypto.randomUUID(), matricula_id: M_ANA, disciplina: 'Cálculo', professor: 'Prof. João' },
  { id: crypto.randomUUID(), matricula_id: M_ANA, disciplina: 'Física', professor: 'Prof. Marta' },
  { id: crypto.randomUUID(), matricula_id: M_ANA, disciplina: 'Programação', professor: 'Prof. Carlos' },
  { id: crypto.randomUUID(), matricula_id: M_PEDRO, disciplina: 'Cálculo', professor: 'Prof. João' },
  { id: crypto.randomUUID(), matricula_id: M_PEDRO, disciplina: 'Química', professor: 'Prof. Sara' },
]

export const matriculaController = {
  list(_req: Request, res: Response) {
    res.json(matriculas)
  },

  create(req: Request, res: Response) {
    const matricula: Matricula = {
      matricula_id: crypto.randomUUID(),
      aluno_nome: req.body.aluno_nome,
    }
    matriculas.push(matricula)
    res.status(201).json(matricula)
  },

  listDisciplinas(req: Request, res: Response) {
    const exists = matriculas.find((m) => m.matricula_id === req.params.id)
    if (!exists) return res.status(404).json({ error: 'Matrícula não encontrada' })

    const data = matriculaDisciplinas.filter((d) => d.matricula_id === req.params.id)
    res.json(data)
  },

  addDisciplina(req: Request, res: Response) {
    const exists = matriculas.find((m) => m.matricula_id === req.params.id)
    if (!exists) return res.status(404).json({ error: 'Matrícula não encontrada' })

    const entry: MatriculaDisciplina = {
      id: crypto.randomUUID(),
      matricula_id: req.params.id as string,
      disciplina: req.body.disciplina,
      professor: req.body.professor,
    }
    matriculaDisciplinas.push(entry)
    res.status(201).json(entry)
  },
}
