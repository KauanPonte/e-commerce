import { AppError } from '../errors/AppError.ts'

interface ProductData {
  name: string
  description: string
  price: number
  discount: number
  stock: number
  image: string
  categoryId: string
}

export class Product {
  private constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public price: number,
    public discount: number,
    public stock: number,
    public image: string,
    public categoryId: string,
    public readonly createdAt: Date,
  ) {}

  static create(data: ProductData): Product {
    if (!data.name || data.name.trim().length < 3) {
      throw new AppError(400, 'Nome do produto deve ter no mínimo 3 caracteres')
    }
    if (data.price <= 0) {
      throw new AppError(400, 'Preço deve ser positivo')
    }
    if (data.stock < 0) {
      throw new AppError(400, 'Estoque não pode ser negativo')
    }
    return new Product(
      crypto.randomUUID(),
      data.name.trim(),
      data.description,
      data.price,
      data.discount,
      data.stock,
      data.image,
      data.categoryId,
      new Date(),
    )
  }

  // Reconstitui a partir de uma linha do banco
  static restore(row: {
    id: string
    name: string
    description: string
    price: number
    discount: number
    stock: number
    image: string
    category_id: string
    created_at: string
  }): Product {
    return new Product(
      row.id,
      row.name,
      row.description,
      row.price,
      row.discount,
      row.stock,
      row.image,
      row.category_id,
      new Date(row.created_at),
    )
  }
}
