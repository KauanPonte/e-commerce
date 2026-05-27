import type { CategoryResponseDto } from './CategoryResponseDto.ts'

export class CategoryListDto {
  constructor(
    public readonly data: CategoryResponseDto[],
    public readonly page: number,
    public readonly size: number,
    public readonly total: number,
  ) {}
}
