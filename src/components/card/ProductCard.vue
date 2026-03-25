<template>
  <div
    class="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col h-full group"
  >
    <div class="relative overflow-hidden bg-gray-100 h-48">
      <img
        :src="product?.image || `http://picsum.photos/seed/${product?.id}/400/280`"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        :alt="product?.name"
      />
      <div
        v-if="product && product.desconto > 0"
        class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
      >
        -{{ Math.round(product.desconto * 100) }}%
      </div>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <h3 class="font-semibold text-gray-800 text-base mb-1 line-clamp-2">
        {{ product?.name }}
      </h3>
      <p class="text-gray-500 text-sm mb-4 flex-1 line-clamp-2">{{ product?.description }}</p>

      <div class="mt-auto">
        <div class="flex items-baseline gap-1 mb-3">
          <span class="text-xl font-bold text-blue-700">
            R$ {{ product?.price.toFixed(2).replace('.', ',') }}
          </span>
          <span class="text-gray-400 text-xs">/ kg</span>
        </div>
        <PrimeButton
          unstyled
          @click.stop="addItem(product!)"
          class="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200"
        >
          Adicionar ao carrinho
        </PrimeButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Product } from '@/model/product.model'
import { defineComponent, type PropType } from 'vue'
export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
    },
  },
  emits: ['onClick'],
  methods: {
    addItem(product: Product) {
      this.$emit('onClick', product)
    },
  },
})
</script>
