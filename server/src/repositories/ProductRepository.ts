import type { Database } from 'better-sqlite3'
import { Product } from '../entities/Product.ts'

interface ProductRow {
  id: string
  name: string
  description: string
  price: number
  discount: number
  stock: number
  image: string
  category_id: string
  created_at: string
}

export class ProductRepository {
  constructor(private db: Database) {}

  createProduct(product: Product): Product {
    this.db
      .prepare(
        `INSERT INTO products (id, name, description, price, discount, stock, image, category_id, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        product.id,
        product.name,
        product.description,
        product.price,
        product.discount,
        product.stock,
        product.image,
        product.categoryId,
        product.createdAt.toISOString(),
      )
    return product
  }

  getAllProducts(page: number, size: number): { data: Product[]; total: number } {
    const offset = (page - 1) * size
    const rows = this.db
      .prepare('SELECT * FROM products LIMIT ? OFFSET ?')
      .all(size, offset) as ProductRow[]

    const { total } = this.db
      .prepare('SELECT COUNT(*) as total FROM products')
      .get() as { total: number }

    return {
      data: rows.map((r) => Product.restore(r)),
      total,
    }
  }

  getProductById(id: string): Product | null {
    const row = this.db.prepare('SELECT * FROM products WHERE id = ?').get(id) as ProductRow | undefined
    if (!row) return null
    return Product.restore(row)
  }

  updateProduct(product: Product): Product {
    this.db
      .prepare(
        `UPDATE products
         SET name = ?, description = ?, price = ?, discount = ?, stock = ?, image = ?, category_id = ?
         WHERE id = ?`,
      )
      .run(
        product.name,
        product.description,
        product.price,
        product.discount,
        product.stock,
        product.image,
        product.categoryId,
        product.id,
      )
    return product
  }

  deleteProduct(id: string): void {
    this.db.prepare('DELETE FROM products WHERE id = ?').run(id)
  }
}
