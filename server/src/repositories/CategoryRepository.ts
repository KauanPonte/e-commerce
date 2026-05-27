import type { Database } from 'better-sqlite3'
import { Category } from '../entities/Category.ts'

interface CategoryRow {
  id: string
  name: string
  created_at: string
}

export class CategoryRepository {
  constructor(private db: Database) {}

  createCategory(category: Category): Category {
    this.db
      .prepare('INSERT INTO categories (id, name, created_at) VALUES (?, ?, ?)')
      .run(category.id, category.name, category.createdAt.toISOString())
    return category
  }

  getAllCategories(page: number, size: number): { data: Category[]; total: number } {
    const offset = (page - 1) * size
    const rows = this.db
      .prepare('SELECT * FROM categories LIMIT ? OFFSET ?')
      .all(size, offset) as CategoryRow[]

    const { total } = this.db
      .prepare('SELECT COUNT(*) as total FROM categories')
      .get() as { total: number }

    return {
      data: rows.map((r) => Category.restore(r.id, r.name, r.created_at)),
      total,
    }
  }

  getCategoryById(id: string): Category | null {
    const row = this.db.prepare('SELECT * FROM categories WHERE id = ?').get(id) as CategoryRow | undefined
    if (!row) return null
    return Category.restore(row.id, row.name, row.created_at)
  }

  updateCategory(category: Category): Category {
    this.db
      .prepare('UPDATE categories SET name = ? WHERE id = ?')
      .run(category.name, category.id)
    return category
  }

  deleteCategory(id: string): void {
    this.db.prepare('DELETE FROM categories WHERE id = ?').run(id)
  }
}
