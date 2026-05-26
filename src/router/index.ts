import AdminLayout from '@/layouts/AdminLayout.vue'
import CustumerLayout from '@/layouts/CustumerLayout.vue'
import Cart from '@/views/Cart.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminProducts from '@/views/admin/AdminProducts.vue'
import AdminReports from '@/views/admin/AdminReports.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Products from '@/views/Products.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Rotas públicas sem layout (tela cheia centralizada)
    { path: '/login', component: Login },
    { path: '/register', component: Register },

    {
      path: '/',
      component: CustumerLayout,
      children: [
        { path: '', component: Home },
        { path: 'products', component: Products },
        { path: 'cart', component: Cart, meta: { auth: true } },
        { path: 'products/:id', component: ProductDetail, meta: { auth: true } },
      ],
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { role: 'ADMIN' },
      children: [
        { path: '', component: AdminDashboard },
        { path: 'products', component: AdminProducts },
        { path: 'reports', component: AdminReports },
      ],
    },
  ],
})

router.beforeEach((to, _from, next) => {
  // useAuthStore() funciona aqui porque o Pinia já foi inicializado no main.ts
  const authStore = useAuthStore()

  // Rota exige ADMIN
  if (to.meta.role === 'ADMIN') {
    if (authStore.isAdmin) return next()
    // Não autenticado → manda pro login; autenticado mas sem role → volta pra home
    return next(authStore.isAuthenticated ? '/' : '/login')
  }

  // Rota exige autenticação comum
  if (to.meta.auth) {
    if (authStore.isAuthenticated) return next()
    // Guarda a rota original para redirecionar depois do login
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  // Usuário já logado tentando acessar /login ou /register → redireciona pra home
  if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    return next('/')
  }

  next()
})

export default router
