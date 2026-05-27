import type { Category } from '../entities/Category.ts'

export class CategoryResponseDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: string,
  ) {}

  static create(category: Category): CategoryResponseDto {
    return new CategoryResponseDto(category.id, category.name, category.createdAt.toISOString())
  }
}
