<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <header class="bg-blue-700 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6">
        <RouterLink to="/" class="text-white text-xl font-bold tracking-tight shrink-0">
          ShopFruit
        </RouterLink>

        <div class="flex-1 max-w-xl">
          <div class="flex rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Buscar produtos..."
              class="flex-1 px-4 py-2 text-sm text-gray-800 focus:outline-none"
            />
            <PrimeButton
              unstyled
              class="bg-yellow-400 hover:bg-yellow-500 px-5 text-sm font-semibold text-gray-800 transition-colors"
            >
              Buscar
            </PrimeButton>
          </div>
        </div>

        <nav class="flex items-center gap-6 ml-auto">
          <RouterLink
            to="/"
            class="text-white text-sm font-medium hover:text-yellow-300 transition-colors"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/products"
            class="text-white text-sm font-medium hover:text-yellow-300 transition-colors"
          >
            Produtos
          </RouterLink>
          <RouterLink
            to="/cart"
            class="text-white hover:text-yellow-300 transition-colors relative"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span
              v-if="cart.total > 0"
              class="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center"
            >
              {{ cart.total }}
            </span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <div class="flex-1">
      <RouterView />
    </div>

    <footer class="bg-gray-800 text-gray-400 py-8 mt-auto">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-sm">© 2024 ShopFruit — Todos os direitos reservados</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from 'vue'
import { Cart } from '@/model/cart.model'

export default defineComponent({
  setup() {
    const cart = reactive(new Cart())
    provide('cart', cart)
    return { cart }
  },
})
</script>
