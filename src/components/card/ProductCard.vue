<template>
  <article>
    <h1>{{ product?.name }}</h1>
    <p>Categoria: {{ product?.category.title }}</p>
    <p>{{ product?.description }}</p>
    <p>R$: {{ product?.price.toFixed(2).replace('.', ',') }}</p>
    <button @click="addItem(product!)">Adicionar</button>
  </article>
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
