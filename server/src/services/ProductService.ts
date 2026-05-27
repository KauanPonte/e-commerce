import { Product } from '../entities/Product.ts'
import { ProductListDto } from '../dtos/ProductListDto.ts'
import { ProductResponseDto } from '../dtos/ProductResponseDto.ts'
import { AppError } from '../errors/AppError.ts'
import type { ProductRepository } from '../repositories/ProductRepository.ts'
import type { CategoryRepository } from '../repositories/CategoryRepository.ts'

interface ProductInput {
  name: string
  description: string
  price: number
  discount: number
  stock: number
  image: string
  categoryId: string
}

export class ProductService {
  constructor(
    private productRepo: ProductRepository,
    // CategoryRepository é injetado aqui para validar a FK antes de persistir
    private categoryRepo: CategoryRepository,
  ) {}

  getAll(page: number, size: number): ProductListDto {
    const { data, total } = this.productRepo.getAllProducts(page, size)
    return new ProductListDto(
      data.map((p) => ProductResponseDto.create(p)),
      page,
      size,
      total,
    )
  }

  getById(id: string): ProductResponseDto {
    const product = this.productRepo.getProductById(id)
    if (!product) throw new AppError(404, 'Produto não encontrado')
    return ProductResponseDto.create(product)
  }

  create(data: ProductInput): ProductResponseDto {
    // Regra de negócio: categoria deve existir antes de criar o produto
    const category = this.categoryRepo.getCategoryById(data.categoryId)
    if (!category) throw new AppError(404, 'Categoria não encontrada')

    const product = Product.create(data)
    this.productRepo.createProduct(product)
    return ProductResponseDto.create(product)
  }

  update(id: string, data: Partial<ProductInput>): ProductResponseDto {
    const product = this.productRepo.getProductById(id)
    if (!product) throw new AppError(404, 'Produto não encontrado')

    // Se categoryId for alterado, valida se a nova categoria existe
    if (data.categoryId && data.categoryId !== product.categoryId) {
      const category = this.categoryRepo.getCategoryById(data.categoryId)
      if (!category) throw new AppError(404, 'Nova categoria não encontrada')
    }

    // Aplica as mudanças na entity
    if (data.name !== undefined) product.name = data.name
    if (data.description !== undefined) product.description = data.description
    if (data.price !== undefined) product.price = data.price
    if (data.discount !== undefined) product.discount = data.discount
    if (data.stock !== undefined) product.stock = data.stock
    if (data.image !== undefined) product.image = data.image
    if (data.categoryId !== undefined) product.categoryId = data.categoryId

    this.productRepo.updateProduct(product)
    return ProductResponseDto.create(product)
  }

  delete(id: string): void {
    const product = this.productRepo.getProductById(id)
    if (!product) throw new AppError(404, 'Produto não encontrado')
    this.productRepo.deleteProduct(id)
  }
}
