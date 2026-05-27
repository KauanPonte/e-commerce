import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.resolve(__dirname, '../../../ecommerce.db')

const db = new Database(DB_PATH)

// FK on para garantir integridade referencial (products → categories)
db.pragma('foreign_keys = ON')

// Criação das tabelas (executa apenas se não existirem)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          TEXT PRIMARY KEY,
    email       TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role        TEXT NOT NULL DEFAULT 'user',
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS categories (
    id         TEXT PRIMARY KEY,
    name       TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS products (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    price       REAL NOT NULL,
    discount    REAL NOT NULL DEFAULT 0,
    stock       INTEGER NOT NULL DEFAULT 0,
    image       TEXT NOT NULL DEFAULT '',
    category_id TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );
`)

// Seed do admin padrão (INSERT OR IGNORE = não duplica se já existir)
const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@pontemrket.com')
if (!adminExists) {
  const hash = bcrypt.hashSync('admin123', 10)
  db.prepare('INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)').run(
    crypto.randomUUID(),
    'admin@pontemrket.com',
    hash,
    'admin',
  )
  console.log('[DB] Admin criado: admin@pontemrket.com / admin123')
}

export default db
