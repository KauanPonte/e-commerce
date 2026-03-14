import type { Category } from './category.model'

export class Product {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public id: number,
    public category: Category,
  ) {}
}
