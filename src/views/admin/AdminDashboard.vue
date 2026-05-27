<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProducts } from '@/services/api'

const totalProducts = ref('...')

onMounted(async () => {
  try {
    const products = await getProducts()
    totalProducts.value = String(products.length)
  } catch {
    totalProducts.value = '-'
  }
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow p-6">
        <p class="text-sm text-gray-500 mb-1">Produtos cadastrados</p>
        <p class="text-3xl font-bold text-blue-700">{{ totalProducts }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-6">
        <p class="text-sm text-gray-500 mb-1">Pedidos hoje</p>
        <p class="text-3xl font-bold text-green-600">0</p>
      </div>
      <div class="bg-white rounded-xl shadow p-6">
        <p class="text-sm text-gray-500 mb-1">Receita total</p>
        <p class="text-3xl font-bold text-gray-800">R$ 0,00</p>
      </div>
    </div>
  </div>
</template>
