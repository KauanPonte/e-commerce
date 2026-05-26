import type { Product } from './product.model'
export interface CartItem {
  product: Product
  quantity: number
}

export class Cart {
  constructor(
    public list: CartItem[] = [],
    public total: number = 0,
    public PiceTotal: number = 0,
  ) {}

  addItem(product: Product) {
    const existItem = this.list.some((item) => item.product.name === product.name)
    const found = this.list.find((item) => item.product.name === product.name)
    if (found) {
      found.quantity += 1
      this.total += 1
    } else {
      this.list.push({ product, quantity: 1 })
      this.total += 1
    }

    this.PiceTotal = this.getTotalPrice()
  }
  getTotalPrice(): number {
    return this.list.reduce((total, item) => {
      return (total += item.product.price * item.quantity)
    }, 0)
  }
  deleteAll() {
    this.list = []
    this.total = 0
    this.PiceTotal = 0
  }

  removeItem(product: Product) {
    this.list = this.list
      .map((item) => {
        if (item.product.name === product.name) {
          item.quantity -= 1
          this.total -= 1
          this.PiceTotal = this.getTotalPrice()
        }
        return item
      })
      .filter((item) => item.quantity > 0)
  }
  deleteItem(product: Product) {
    this.list = this.list.filter((item) => {
      if (item.product.name === product.name) {
        this.total -= item.quantity
      }
      return item.product.name !== product.name
    })
    this.PiceTotal = this.getTotalPrice()
  }
}
