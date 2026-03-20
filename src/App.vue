<script lang="ts">
import { Product } from './model/product.model'
import ProductCard from './components/card/ProductCard.vue'
import { Cart } from './model/cart.model'
import { Category } from './model/category.model'
import CartItem from './components/card/CartItem.vue'

export default {
  data() {
    const category = new Category(2930, 'Fruta')
    return {
      cart: new Cart(),
      category,
      products: [
        new Product('Banana', 'A melhor e mais doce do mercado', 2, 1001, category),
        new Product('Maçã', 'Está doce e crocnate', 20, 1002, category),
        new Product('Laranja', 'Doce como mel', 10, 1003, category),
      ],
    }
  },
  methods: {
    addItem(item: Product) {
      this.cart.addItem(item)
    },
    getTotalPrice(): number {
      return this.cart.getTotalPrice()
    },
    removeItem(item: Product) {
      this.cart.removeItem(item)
    },
    deleteItem(item: Product) {
      this.cart.deleteItem(item)
    },
    deleteAll() {
      this.$confirm.require({
        message: 'Tem certeza que deseja excluir todos os itens do carrinho?',
        header: 'Confirmar exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim, excluir',
        rejectLabel: 'Cancelar',
        accept: () => {
          this.cart.deleteAll()
        },
      })
    },
  },
  components: { ProductCard, CartItem },
}
</script>
<template>
  <ConfirmDialog />
  <main>
    <section class="pt-8 shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div v-for="(product, index) in products" :key="index">
        <ProductCard :product="product" @on-click="addItem" />
      </div>
    </section>
  </main>
  <div class="mt-5 flex flex-col gap-4">
    <h1
      class="border border-white-100 bg-green-600 rounded-lg h-10 w-1/15 flex items-center justify-center"
    >
      Carinho
    </h1>
    <div v-if="cart.list.length > 0" class="flex flex-col gap-4">
      <div v-for="(item, index) in cart.list" :key="index">
        <CartItem
          :item="item"
          @remove-click="removeItem"
          @delete-click="deleteItem"
          @add-click="addItem"
        />
      </div>
    </div>
    <div
      v-else
      class="border border-white-100 bg-green-600 rounded-lg h-10 w-1/5 flex items-center justify-center"
    >
      <h1>{{ 'Seu carrinho está vazio!' }}</h1>
    </div>

    <p>------------------------------------------------</p>
    <p>Total de Itens: {{ cart.total }}</p>
    <div class="flex items-center justify-between pb-8" style="max-width: 420px">
      <p>Valor total: R${{ cart.PiceTotal.toFixed(2).replace('.', ',') }}</p>
      <PrimeButton v-if="cart.list.length > 0" severity="danger" @click="deleteAll()"
        >Excluir Todos os itens</PrimeButton
      >
    </div>
  </div>
</template>
