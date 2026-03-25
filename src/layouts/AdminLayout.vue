<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col">
      <div class="px-6 py-5 border-b border-gray-700">
        <h1 class="text-lg font-bold text-white">ShopFruit</h1>
        <span class="text-xs text-gray-400">Painel Administrativo</span>
      </div>

      <nav class="flex-1 px-4 py-6 flex flex-col gap-1">
        <RouterLink
          to="/admin"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          active-class="bg-gray-700 text-white"
          :exact="true"
        >
          <i class="pi pi-home text-base" />
          Dashboard
        </RouterLink>
        <RouterLink
          to="/admin/products"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          active-class="bg-gray-700 text-white"
        >
          <i class="pi pi-box text-base" />
          Produtos
        </RouterLink>
        <RouterLink
          to="/admin/reports"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          active-class="bg-gray-700 text-white"
        >
          <i class="pi pi-chart-bar text-base" />
          Relatórios
        </RouterLink>
      </nav>

      <div class="px-4 py-4 border-t border-gray-700">
        <RouterLink
          to="/"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
        >
          <i class="pi pi-arrow-left text-base" />
          Voltar à loja
        </RouterLink>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
        <span class="text-xs bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full">
          ADMIN
        </span>
      </header>

      <main class="flex-1 p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbHome = { icon: 'pi pi-home', route: '/admin' }

const breadcrumbItems = computed(() => {
  const segments = route.path.replace('/admin', '').split('/').filter(Boolean)
  const labels: Record<string, string> = {
    products: 'Produtos',
    reports: 'Relatórios',
  }
  return segments.map((seg) => ({ label: labels[seg] ?? seg }))
})
</script>
