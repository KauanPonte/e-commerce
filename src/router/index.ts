import AdminLayout from '@/layouts/AdminLayout.vue'
import CustumerLayout from '@/layouts/CustumerLayout.vue'
import Cart from '@/views/Cart.vue'
import Home from '@/views/Home.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminProducts from '@/views/admin/AdminProducts.vue'
import AdminReports from '@/views/admin/AdminReports.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Products from '@/views/Products.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: CustumerLayout,
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: 'products',
          component: Products,
        },
        {
          path: 'cart',
          component: Cart,
          meta: { auth: true },
        },
        {
          path: 'products/:id',
          component: ProductDetail,
          meta: {
            auth: true,
          },
        },
      ],
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { role: 'ADMIN' },
      children: [
        {
          path: '',
          component: AdminDashboard,
        },
        {
          path: 'products',
          component: AdminProducts,
        },
        {
          path: 'reports',
          component: AdminReports,
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const user = {
    isAuth: true,
    role: 'ADMIN',
  }

  if (to?.meta?.role === 'ADMIN') {
    if (user.role === 'ADMIN') {
      next()
    } else {
      next('/')
    }
    return
  }

  if (to?.meta?.auth) {
    if (user.isAuth) {
      next()
    } else {
      next('/')
    }
    return
  }

  next()
})

export default router
