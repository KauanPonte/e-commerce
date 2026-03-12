import { Category } from "./category.model";

export class Product {
  constructor(
    public name: string,
    public price: number,
    public ing: string,
    public category: Category,
    public discount: number,
  ) {}

  discountApplied(): number {
    return this.price * (1 - this.discount);
  }
}
