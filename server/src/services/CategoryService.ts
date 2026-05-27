import { Category } from '../entities/Category.ts'
import { CategoryListDto } from '../dtos/CategoryListDto.ts'
import { CategoryResponseDto } from '../dtos/CategoryResponseDto.ts'
import { AppError } from '../errors/AppError.ts'
import type { CategoryRepository } from '../repositories/CategoryRepository.ts'

export class CategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  getAll(page: number, size: number): CategoryListDto {
    const { data, total } = this.categoryRepo.getAllCategories(page, size)
    return new CategoryListDto(
      data.map((c) => CategoryResponseDto.create(c)),
      page,
      size,
      total,
    )
  }

  getById(id: string): CategoryResponseDto {
    const category = this.categoryRepo.getCategoryById(id)
    if (!category) throw new AppError(404, 'Categoria não encontrada')
    return CategoryResponseDto.create(category)
  }

  create(name: string): CategoryResponseDto {
    // Category.create() contém as regras de negócio (validação de nome etc.)
    const category = Category.create(name)
    this.categoryRepo.createCategory(category)
    return CategoryResponseDto.create(category)
  }

  update(id: string, newName: string): CategoryResponseDto {
    const category = this.categoryRepo.getCategoryById(id)
    if (!category) throw new AppError(404, 'Categoria não encontrada')

    // rename() é a lógica da entity — não implementamos a validação aqui
    category.rename(newName)
    this.categoryRepo.updateCategory(category)
    return CategoryResponseDto.create(category)
  }

  delete(id: string): void {
    const category = this.categoryRepo.getCategoryById(id)
    if (!category) throw new AppError(404, 'Categoria não encontrada')
    this.categoryRepo.deleteCategory(id)
  }
}
