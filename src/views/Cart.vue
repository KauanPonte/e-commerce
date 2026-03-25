<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { inject } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { Product } from '@/model/product.model'
import { Cart } from '@/model/cart.model'
import CartItem from '@/components/card/CartItem.vue'

const cart = inject<Cart>('cart')!
const confirm = useConfirm()

function addItem(item: Product) {
  cart.addItem(item)
}
function removeItem(item: Product) {
  cart.removeItem(item)
}
function deleteItem(item: Product) {
  cart.deleteItem(item)
}
function deleteAll() {
  confirm.require({
    message: 'Tem certeza que deseja excluir todos os itens do carrinho?',
    header: 'Confirmar exclusão',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim, excluir',
    rejectLabel: 'Cancelar',
    accept: () => {
      cart.deleteAll()
    },
  })
}
</script>

<template>
  <ConfirmDialog />

  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Carrinho de Compras</h1>

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Cart header -->
      <div class="bg-blue-700 text-white px-5 py-4 flex items-center justify-between">
        <h2 class="font-bold text-base">Itens no carrinho</h2>
        <span
          class="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full min-w-[28px] text-center"
        >
          {{ cart.total }}
        </span>
      </div>

      <div class="px-4 pb-4">
        <!-- Items list -->
        <div v-if="cart.list.length > 0">
          <div v-for="(item, index) in cart.list" :key="index">
            <CartItem
              :item="item"
              @remove-click="removeItem"
              @delete-click="deleteItem"
              @add-click="addItem"
            />
          </div>

          <!-- Totals -->
          <div class="pt-4 mt-2">
            <div class="flex items-center justify-between mb-1">
              <span class="text-gray-500 text-sm">Subtotal ({{ cart.total }} itens)</span>
              <span class="text-gray-700 font-medium text-sm">
                R$ {{ cart.PiceTotal.toFixed(2).replace('.', ',') }}
              </span>
            </div>
            <div class="flex items-center justify-between mb-4 pb-4 border-b">
              <span class="font-bold text-gray-800">Total</span>
              <span class="text-xl font-bold text-blue-700">
                R$ {{ cart.PiceTotal.toFixed(2).replace('.', ',') }}
              </span>
            </div>

            <PrimeButton
              unstyled
              class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-sm transition-colors mb-2"
            >
              Finalizar Compra
            </PrimeButton>
            <PrimeButton
              unstyled
              @click="deleteAll()"
              class="w-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-500 py-2 rounded-lg text-sm transition-colors"
            >
              Limpar Carrinho
            </PrimeButton>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="py-10 text-center">
          <div
            class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <svg
              class="w-8 h-8 text-gray-400"
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
          </div>
          <p class="text-gray-600 font-medium text-sm">Seu carrinho está vazio</p>
          <p class="text-gray-400 text-xs mt-1">Adicione produtos para continuar</p>
          <RouterLink
            to="/"
            class="inline-block mt-4 text-blue-600 text-sm font-medium hover:underline"
          >
            Voltar para a loja
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
