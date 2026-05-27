import { Product } from '@/model/product.model'

const BASE_URL = '/api'

type RawProduct = {
  name: string; description: string; price: number
  id: string; discount: number; image: string; category: string
}

function toProduct(p: RawProduct): Product {
  return new Product(p.name, p.description, p.price, p.id as unknown as number, p.discount, p.image, p.category)
}

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${BASE_URL}/products?category=${encodeURIComponent(category)}`
    : `${BASE_URL}/products`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Erro ao buscar produtos')
  const data = await response.json()
  return data.map(toProduct)
}

export async function createProduct(payload: {
  name: string
  description: string
  price: number
  discount: number
  image: string
  categoryId: string
}): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const err = await response.json()
    throw new Error(JSON.stringify(err.errors))
  }
  return toProduct(await response.json())
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Erro ao deletar produto')
}
