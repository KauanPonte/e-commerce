<template>
  <!-- <article class="w-[200px]">
    <h1>{{ product?.name }}</h1>
    <p>Categoria: {{ product?.category.title }}</p>
    <p>{{ product?.description }}</p>
    <p>R$: {{ product?.price.toFixed(2).replace('.', ',') }}</p>
    <PrimeButton @click="addItem(product!)">Adicionar</PrimeButton>
  </article> -->
  <PrimeCard :style="{ width: '100%', minWidth: '200px', maxWidth: '220px' }">
    <template #header>
      <img src="https://picsum.photos/200" class="mt-3 w-7/8 object-cover mx-auto rounded-lg" />
    </template>
    <template #title>
      <h1>{{ product?.name }}</h1>
    </template>
    <template #content>
      <p>R$: {{ product?.price.toFixed(2).replace('.', ',') }} o kg</p>
      <p>{{ product?.description }}</p>
    </template>
    <template #footer>
      <div class="flex flex-row-reverse">
        <PrimeButton @click="addItem(product!)">Adicionar</PrimeButton>
      </div>
    </template>
  </PrimeCard>
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
