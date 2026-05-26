<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import ProductCard from '@/components/card/ProductCard.vue'
import { Cart } from '@/model/cart.model'
import { Product } from '@/model/product.model'
import { products } from '@/data/products'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const categories = ['Todos', ...new Set(products.map((p) => p.category).filter(Boolean))]

export default {
  inject: ['cart'],
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    return { authStore, router }
  },
  data() {
    return {
      products,
      categories,
      activeCategory: 'Todos',
    }
  },
  computed: {
    filteredProducts(): Product[] {
      if (this.activeCategory === 'Todos') return this.products
      return this.products.filter((p) => p.category === this.activeCategory)
    },
  },
  methods: {
    addItem(item: Product) {
      if (!this.authStore.isAuthenticated) {
        this.router.push({ path: '/login', query: { redirect: '/' } })
        return
      }
      ;(this.cart as Cart).addItem(item)
    },
    goToDatail(product: Product) {
      this.$router.push({ path: `/products/${product.id}` })
    },
  },
  components: { ProductCard },
}
</script>

<template>
  <!-- Hero Banner -->
  <section class="bg-gradient-to-r from-blue-800 to-blue-500 text-white py-14 px-4">
    <div class="max-w-7xl mx-auto flex flex-col gap-3">
      <span class="bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full w-fit">
        🛒 {{ products.length }} produtos disponíveis
      </span>
      <h1 class="text-4xl font-extrabold leading-tight">
        Tudo que você precisa<br />em um só lugar
      </h1>
      <p class="text-blue-100 text-base max-w-md">
        Eletrônicos, roupas, alimentos e muito mais — com os melhores preços do mercado.
      </p>
    </div>
  </section>

  <!-- Main content -->
  <div class="max-w-7xl mx-auto px-4 py-8">

    <!-- Filtros de categoria -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
          activeCategory === cat
            ? 'bg-blue-700 text-white shadow'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Header da seção -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-800">
        {{ activeCategory === 'Todos' ? 'Produtos em Destaque' : activeCategory }}
      </h2>
      <span class="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
        {{ filteredProducts.length }} produto{{ filteredProducts.length !== 1 ? 's' : '' }}
      </span>
    </div>

    <!-- Grid de produtos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="cursor-pointer"
        @click="goToDatail(product)"
      >
        <ProductCard :product="product" @on-click="addItem" />
      </div>
    </div>
  </div>
</template>
