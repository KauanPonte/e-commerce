<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProducts, createProduct, deleteProduct } from '@/services/api'
import type { Product } from '@/model/product.model'

// Categorias com os mesmos UUIDs do backend (category.controller.ts)
const CATEGORIES = [
  { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Eletrônicos' },
  { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Roupas' },
  { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Alimentos' },
  { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Esportes' },
]

const products = ref<Product[]>([])
const loading = ref(true)
const showDialog = ref(false)
const saving = ref(false)
const errorMsg = ref('')

const form = ref({
  name: '',
  description: '',
  price: 0,
  discount: 0,
  image: '',
  categoryId: CATEGORIES[0]!.id,
})

async function loadProducts() {
  loading.value = true
  try {
    products.value = await getProducts()
  } finally {
    loading.value = false
  }
}

async function handleCreate() {
  errorMsg.value = ''
  saving.value = true
  try {
    const created = await createProduct({
      ...form.value,
      discount: form.value.discount / 100,
    })
    products.value.push(created)
    showDialog.value = false
    resetForm()
  } catch (e: unknown) {
    errorMsg.value = e instanceof Error ? e.message : 'Erro ao criar produto'
  } finally {
    saving.value = false
  }
}

async function handleDelete(product: Product) {
  if (!confirm(`Deletar "${product.name}"?`)) return
  await deleteProduct(String(product.id))
  products.value = products.value.filter((p) => p.id !== product.id)
}

function resetForm() {
  form.value = { name: '', description: '', price: 0, discount: 0, image: '', categoryId: CATEGORIES[0]!.id }
}

onMounted(loadProducts)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Produtos</h1>
      <button
        @click="showDialog = true"
        class="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        + Novo Produto
      </button>
    </div>

    <!-- Tabela -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <div v-if="loading" class="flex justify-center py-12">
        <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <DataTable v-else :value="products" stripedRows>
        <Column header="Imagem" style="width: 70px">
          <template #body="{ data }">
            <img :src="data.image" :alt="data.name" class="w-12 h-12 object-cover rounded" />
          </template>
        </Column>
        <Column field="name" header="Nome" />
        <Column field="description" header="Descrição" />
        <Column field="category" header="Categoria" />
        <Column field="price" header="Preço">
          <template #body="{ data }">
            R$ {{ Number(data.price).toFixed(2).replace('.', ',') }}
          </template>
        </Column>
        <Column field="desconto" header="Desconto">
          <template #body="{ data }">
            {{ Math.round((data.desconto ?? 0) * 100) }}%
          </template>
        </Column>
        <Column header="Ações" style="width: 80px">
          <template #body="{ data }">
            <button
              @click="handleDelete(data)"
              class="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
            >
              Deletar
            </button>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Dialog novo produto -->
    <div
      v-if="showDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showDialog = false"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Novo Produto</h2>

        <div class="flex flex-col gap-3">
          <div>
            <label class="text-sm font-medium text-gray-700">Nome</label>
            <input v-model="form.name" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Descrição</label>
            <input v-model="form.description" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="text-sm font-medium text-gray-700">Preço (R$)</label>
              <input v-model.number="form.price" type="number" min="0" step="0.01" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="flex-1">
              <label class="text-sm font-medium text-gray-700">Desconto (%)</label>
              <input v-model.number="form.discount" type="number" min="0" max="100" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">URL da Imagem</label>
            <input v-model="form.image" type="text" placeholder="https://..." class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Categoria</label>
            <select v-model="form.categoryId" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option v-for="cat in CATEGORIES" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>

          <p v-if="errorMsg" class="text-red-500 text-xs">{{ errorMsg }}</p>
        </div>

        <div class="flex justify-end gap-2 mt-5">
          <button @click="showDialog = false; resetForm()" class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancelar</button>
          <button
            @click="handleCreate"
            :disabled="saving"
            class="bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {{ saving ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
