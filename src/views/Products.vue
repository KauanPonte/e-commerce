<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import ProductCard from '@/components/card/ProductCard.vue'
import { Cart } from '@/model/cart.model'
import { Product } from '@/model/product.model'
import { getProducts } from '@/services/api'
import { useAuthStore } from '@/stores/auth.store'
import { useRoute, useRouter } from 'vue-router'

export default {
  inject: ['cart'],
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()
    return { authStore, router, route }
  },
  data() {
    return {
      products: [] as Product[],
      loading: true,
      error: null as string | null,
    }
  },
  computed: {
    // Lê ?search= da URL e filtra os produtos
    searchTerm(): string {
      return (this.route.query.search as string) || ''
    },
    filteredProducts(): Product[] {
      if (!this.searchTerm) return this.products
      const term = this.searchTerm.toLowerCase()
      return this.products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term),
      )
    },
  },
  async created() {
    try {
      this.products = await getProducts()
    } catch {
      this.error = 'Não foi possível carregar os produtos. O servidor está rodando?'
    } finally {
      this.loading = false
    }
  },
  methods: {
    addItem(item: Product) {
      if (!this.authStore.isAuthenticated) {
        this.router.push({ path: '/login', query: { redirect: '/products' } })
        return
      }
      ;(this.cart as Cart).addItem(item)
    },
    goToDetail(product: Product) {
      this.$router.push({ path: `/products/${product.id}` })
    },
  },
  components: { ProductCard },
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">
        {{ searchTerm ? `Resultados para "${searchTerm}"` : 'Todos os Produtos' }}
      </h1>
      <p v-if="!loading" class="text-gray-500 text-sm mt-1">
        {{ filteredProducts.length }} produto{{ filteredProducts.length !== 1 ? 's' : '' }} encontrado{{ filteredProducts.length !== 1 ? 's' : '' }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      {{ error }}
    </div>

    <!-- Sem resultados -->
    <div v-else-if="filteredProducts.length === 0" class="text-center py-20 text-gray-400">
      <p class="text-lg font-medium">Nenhum produto encontrado</p>
      <p class="text-sm mt-1">Tente outro termo de busca</p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="cursor-pointer"
        @click="goToDetail(product)"
      >
        <ProductCard :product="product" @on-click="addItem" />
      </div>
    </div>
  </div>
</template>
