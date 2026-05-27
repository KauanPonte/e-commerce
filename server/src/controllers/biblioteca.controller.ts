import type { Request, Response } from 'express'

// 2FN: titulo_livro e isbn dependem apenas de livro_id (não da PK composta)
interface Livro {
  livro_id: string
  titulo_livro: string
  isbn: string
}

// 2FN: usuario_email depende apenas de usuario_id (não da PK composta)
interface Usuario {
  usuario_id: string
  usuario_email: string
}

// Tabela de junção: data_emprestimo depende da PK composta (livro_id + usuario_id)
interface Emprestimo {
  livro_id: string
  usuario_id: string
  data_emprestimo: string
}

const LIV_CLEAN_CODE = 'f1f00001-0000-4000-8000-000000000427'
const LIV_DDD        = 'f1f00001-0000-4000-8000-000000000557'
const USR_ANA        = 'f2f00001-0000-4000-8000-000000000007'

const livros: Livro[] = [
  { livro_id: LIV_CLEAN_CODE, titulo_livro: 'Clean Code', isbn: '978-0132' },
  { livro_id: LIV_DDD, titulo_livro: 'DDD', isbn: '978-0321' },
]

const usuarios: Usuario[] = [
  { usuario_id: USR_ANA, usuario_email: 'ana@email.com' },
]

const emprestimos: Emprestimo[] = [
  { livro_id: LIV_CLEAN_CODE, usuario_id: USR_ANA, data_emprestimo: '2024-01-10' },
  { livro_id: LIV_DDD, usuario_id: USR_ANA, data_emprestimo: '2024-03-01' },
]

export const bibliotecaController = {
  listLivros(_req: Request, res: Response) {
    res.json(livros)
  },

  createLivro(req: Request, res: Response) {
    const livro: Livro = {
      livro_id: crypto.randomUUID(),
      titulo_livro: req.body.titulo_livro,
      isbn: req.body.isbn,
    }
    livros.push(livro)
    res.status(201).json(livro)
  },

  listUsuarios(_req: Request, res: Response) {
    res.json(usuarios)
  },

  createUsuario(req: Request, res: Response) {
    const usuario: Usuario = {
      usuario_id: crypto.randomUUID(),
      usuario_email: req.body.usuario_email,
    }
    usuarios.push(usuario)
    res.status(201).json(usuario)
  },

  listEmprestimos(_req: Request, res: Response) {
    res.json(emprestimos)
  },

  createEmprestimo(req: Request, res: Response) {
    const livroExists = livros.find((l) => l.livro_id === req.body.livro_id)
    if (!livroExists) return res.status(404).json({ error: 'Livro não encontrado' })

    const usuarioExists = usuarios.find((u) => u.usuario_id === req.body.usuario_id)
    if (!usuarioExists) return res.status(404).json({ error: 'Usuário não encontrado' })

    const emprestimo: Emprestimo = {
      livro_id: req.body.livro_id,
      usuario_id: req.body.usuario_id,
      data_emprestimo: req.body.data_emprestimo,
    }
    emprestimos.push(emprestimo)
    res.status(201).json(emprestimo)
  },
}
