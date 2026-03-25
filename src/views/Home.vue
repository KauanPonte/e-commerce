<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import ProductCard from '@/components/card/ProductCard.vue'
import { Cart } from '@/model/cart.model'
import { Category } from '@/model/category.model'
import { Product } from '@/model/product.model'
import { products } from '@/data/products'

export default {
  inject: ['cart'],
  data() {
    const category = new Category(2930, 'Fruta')
    return {
      category,
      products,
    }
  },
  methods: {
    addItem(item: Product) {
      ;(this.cart as Cart).addItem(item)
    },
    goToDatail(product: Product) {
      const id = product.id
      this.$router.push({ path: `/products/${id}` })
    },
  },
  components: { ProductCard },
}
</script>

<template>
  <!-- Hero Banner -->
  <section class="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-10 px-4">
    <div class="max-w-7xl mx-auto">
      <p class="text-blue-200 text-sm font-medium uppercase tracking-wider mb-1">
        Categoria: {{ category.title }}
      </p>
      <h1 class="text-3xl font-bold mb-2">Frutas Frescas do Dia</h1>
      <p class="text-blue-100 text-base">
        Direto do campo para a sua mesa, com qualidade garantida
      </p>
    </div>
  </section>

  <!-- Main content -->
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-800">Produtos em Destaque</h2>
      <span class="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
        {{ products.length }} produtos
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="cursor-pointer"
        @click="goToDatail(product)"
      >
        <ProductCard :product="product" @on-click="addItem" />
      </div>
    </div>
  </div>
</template>
