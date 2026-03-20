<template>
  <!-- <article>
    <h2>{{ item.product.name }}</h2>
    <p>qtd: {{ item.quantity }}</p>
    <PrimeButton @click="removeItem(item.product)">Remover</PrimeButton>
    <PrimeButton @click="deleteItem(item.product)">Excluir</PrimeButton>
  </article> -->
  <PrimeCard :style="{ width: '100%', minWidth: '200px', maxWidth: '420px' }">
    <template #content>
      <div class="flex flex-row gap-2">
        <img src="https://picsum.photos/200" class="w-25" />
        <div class="flex flex-col flex-1 px-4">
          <h1>{{ item.product.name }}</h1>
          <InputNumber
            class="mt-5"
            :model-value="quantity"
            showButtons
            buttonLayout="horizontal"
            :min="1"
            :max="99"
            :step="1"
            :inputStyle="{ width: '60px', textAlign: 'center' }"
            @update:model-value="onQuantityChange"
          />
        </div>
        <p>R$: {{ item.product.price.toFixed(2).replace('.', ',') }}</p>
      </div>
      <div class="flex flex-row-reverse items-center justify-between">
        <PrimeButton @click="deleteItem(item.product)" severity="danger">Excluir</PrimeButton>
      </div>
    </template>
  </PrimeCard>
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
  data() {
    return {
      quantity: this.item.quantity,
    }
  },
  watch: {
    'item.quantity'(newValue: number) {
      this.quantity = newValue
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
    onQuantityChange(newValue: number) {
      if (newValue < this.quantity) {
        this.$emit('removeClick', this.item.product)
      } else {
        this.$emit('addClick', this.item.product)
      }
      this.quantity = newValue
    },
  },
})
</script>
