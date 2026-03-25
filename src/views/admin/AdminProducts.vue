<script setup lang="ts">
import { products } from '@/data/products'
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Produtos</h1>
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <DataTable :value="products" stripedRows>
        <Column field="id" header="ID" style="width: 80px" />
        <Column header="Imagem" style="width: 80px">
          <template #body="{ data }">
            <img :src="data.image" :alt="data.name" class="w-12 h-12 object-cover rounded" />
          </template>
        </Column>
        <Column field="name" header="Nome" />
        <Column field="description" header="Descrição" />
        <Column field="price" header="Preço">
          <template #body="{ data }">
            R$ {{ data.price.toFixed(2).replace('.', ',') }}
          </template>
        </Column>
        <Column field="desconto" header="Desconto">
          <template #body="{ data }">
            {{ Math.round(data.desconto * 100) }}%
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
