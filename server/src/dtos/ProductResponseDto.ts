import type { Product } from '../entities/Product.ts'

export class ProductResponseDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly categoryId: string,
  ) {}

  static create(product: Product): ProductResponseDto {
    return new ProductResponseDto(
      product.id,
      product.name,
      product.price,
      product.stock,
      product.categoryId,
    )
  }
}
