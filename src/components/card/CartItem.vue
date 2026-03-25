<template>
  <div class="flex gap-3 items-start py-3 border-b border-gray-100 last:border-0">
    <img
      :src="item.product?.image || `https://picsum.photos/seed/${item.product?.id}/80/80`"
      class="w-14 h-14 rounded-lg object-cover shrink-0"
      :alt="item.product.name"
    />
    <div class="flex-1 min-w-0">
      <h4 class="font-medium text-gray-800 text-sm truncate">{{ item.product.name }}</h4>
      <p class="text-blue-700 font-bold text-sm mt-1">
        R$ {{ (item.product.price * item.quantity).toFixed(2).replace('.', ',') }}
      </p>
      <div class="flex items-center gap-2 mt-2">
        <PrimeButton
          unstyled
          @click="removeItem(item.product)"
          class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold transition-colors leading-none"
        >
          −
        </PrimeButton>
        <span class="text-sm font-semibold w-5 text-center text-gray-700">{{ item.quantity }}</span>
        <PrimeButton
          unstyled
          @click="$emit('addClick', item.product)"
          class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold transition-colors leading-none"
        >
          +
        </PrimeButton>
      </div>
    </div>
    <PrimeButton
      unstyled
      @click="deleteItem(item.product)"
      class="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1"
      title="Remover item"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </PrimeButton>
  </div>
</template>

<script lang="ts">
import { Product } from '@/model/product.model'
import type { CartItem } from '@/model/cart.model'
import { defineComponent, type PropType } from 'vue'
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<CartItem>,
      required: true,
    },
  },
  emits: ['removeClick', 'deleteClick', 'addClick'],
  methods: {
    removeItem(product: Product) {
      this.$emit('removeClick', product)
    },
    deleteItem(product: Product) {
      this.$emit('deleteClick', product)
    },
  },
})
</script>
