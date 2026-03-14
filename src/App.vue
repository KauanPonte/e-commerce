<script lang="ts">
import { Product } from './model/product.model'
import ProductCard from './components/card/ProductCard.vue'
import { Cart } from './model/cart.model'
import { Category } from './model/category.model'

export default {
  data() {
    const category = new Category(2930, 'Fruta')
    return {
      cart: new Cart(),
      category,
      products: [
        new Product('Banana', 'A melhor e mais doce do mercado', 2, 1001, category),
        new Product('Maçã', 'Está doce e crocnate', 20, 1002, category),
        new Product('Laranja', 'Doce como mel', 10, 1003, category),
      ],
    }
  },
  methods: {
    addItem(product: Product) {
      const existItem = this.cart.list.some((item) => item.product.name === product.name)
      if (existItem === true) {
        this.cart.list.map((item) => {
          if (item.product.name === product.name) {
            item.quantity += 1
            return {
              product: item.product,
              quantity: item.quantity + 1,
            }
          } else {
            return item
          }
        })
        this.cart.total += 1
      } else {
        this.cart.list.push({ product, quantity: 1 })
        this.cart.total += 1
      }

      this.cart.PiceTotal = this.getTotalPrice()
    },
    getTotalPrice(): number {
      return this.cart.list.reduce((total, item) => {
        return (total += item.product.price * item.quantity)
      }, 0)
    },
    removeItem(product: Product) {
      const existItem = this.cart.list.some((item) => item.product.name === product.name)
      if (existItem) {
        this.cart.list.map((item) => {
          if (item.product.name === product.name) {
            item.quantity -= 1
            this.cart.total -= 1
            this.cart.PiceTotal = this.getTotalPrice()
            if (item.quantity === 0) {
              this.cart.list.pop()
            }
          }
        })
      }
    },
    deleteItem(product: Product) {
      const existItem = this.cart.list.some((item) => item.product.name === product.name)
      if (existItem) {
        this.cart.list.map((item) => {
          this.cart.list.pop()
          this.cart.PiceTotal = this.getTotalPrice()
          this.cart.total -= item.quantity
        })
      }
    },
  },
  components: { ProductCard },
}
</script>

<template>
  <main>
    <div v-for="(product, index) in products" :key="index">
      <ProductCard :product="product" @on-click="addItem" @remove-click="removeItem" />
    </div>
  </main>
  <div>
    <h1>Carinho</h1>
    <div v-for="(item, index) in cart.list" :key="index">
      <h2>{{ item.product.name }}</h2>
      <p>qtd: {{ item.quantity }}</p>
      <button @click="removeItem(item.product)">Remover</button>
      <button @click="deleteItem(item.product)">Excluir</button>
    </div>
    <p>---------------------------</p>
    <p>Total de Itens: {{ cart.total }}</p>
    <p>Valor total: R${{ cart.PiceTotal.toFixed(2).replace('.', ',') }}</p>
  </div>
</template>
