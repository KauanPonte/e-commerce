import type { Product } from './product.model'
interface CartItem {
  product: Product
  quantity: number
}

export class Cart {
  constructor(
    public list: CartItem[] = [],
    public total: number = 0,
    public PiceTotal: number = 0,
  ) {}
}
