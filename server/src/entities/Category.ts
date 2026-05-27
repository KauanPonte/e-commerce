import { AppError } from '../errors/AppError.ts'

export class Category {
  private constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: Date,
  ) {}

  // Único ponto de criação — valida regras de negócio antes de existir
  static create(name: string): Category {
    if (!name || name.trim().length < 3) {
      throw new AppError(400, 'Nome da categoria deve ter no mínimo 3 caracteres')
    }
    return new Category(crypto.randomUUID(), name.trim(), new Date())
  }

  // Reconstitui uma Category a partir de uma linha do banco (sem gerar novo ID/data)
  static restore(id: string, name: string, createdAt: string): Category {
    return new Category(id, name, new Date(createdAt))
  }

  // Lógica de renomear fica na entity, não no service nem controller
  rename(newName: string): void {
    if (!newName || newName.trim().length < 3) {
      throw new AppError(400, 'Nome da categoria deve ter no mínimo 3 caracteres')
    }
    this.name = newName.trim()
  }
}
