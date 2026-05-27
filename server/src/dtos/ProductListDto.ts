import type { ProductResponseDto } from './ProductResponseDto.ts'

export class ProductListDto {
  constructor(
    public readonly data: ProductResponseDto[],
    public readonly page: number,
    public readonly size: number,
    public readonly total: number,
  ) {}
}
