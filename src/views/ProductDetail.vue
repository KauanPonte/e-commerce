<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '@/data/products'
import { Cart } from '@/model/cart.model'
import type { Product } from '@/model/product.model'

const route = useRoute()
const router = useRouter()
const cart = inject<Cart>('cart')!

const product = computed(() =>
  products.find((p) => p.id === Number(route.params.id))
)

function addToCart() {
  if (product.value) {
    cart.addItem(product.value as Product)
    router.push('/cart')
  }
}
</script>

<template>
  <div v-if="product" class="max-w-4xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-400 mb-6 flex items-center gap-2">
      <RouterLink to="/" class="hover:text-blue-600 transition-colors">Home</RouterLink>
      <span>/</span>
      <span class="text-gray-700 font-medium">{{ product.name }}</span>
    </nav>

    <div class="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
      <!-- Imagem -->
      <div class="md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <img
          :src="product.image"
          :alt="product.name"
          class="max-h-80 object-contain"
        />
      </div>

      <!-- Informações -->
      <div class="md:w-1/2 p-8 flex flex-col justify-between">
        <div>
          <div
            v-if="product.desconto > 0"
            class="inline-block bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full mb-3"
          >
            -{{ Math.round(product.desconto * 100) }}% de desconto
          </div>

          <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ product.name }}</h1>
          <p class="text-gray-500 text-base mb-6">{{ product.description }}</p>

          <div class="flex items-baseline gap-2 mb-8">
            <span class="text-3xl font-bold text-blue-700">
              R$ {{ product.price.toFixed(2).replace('.', ',') }}
            </span>
            <span class="text-gray-400 text-sm">/ kg</span>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <PrimeButton
            unstyled
            @click="addToCart"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors text-center"
          >
            Adicionar ao Carrinho
          </PrimeButton>
          <RouterLink
            to="/"
            class="w-full text-center text-gray-500 hover:text-gray-700 text-sm py-2 transition-colors"
          >
            Voltar para a loja
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="max-w-4xl mx-auto px-4 py-16 text-center">
    <p class="text-gray-500 text-lg mb-4">Produto não encontrado</p>
    <RouterLink to="/" class="text-blue-600 hover:underline text-sm">
      Voltar para a loja
    </RouterLink>
  </div>
</template>
