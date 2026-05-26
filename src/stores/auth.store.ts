import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

// defineStore com Composition API (mesmo estilo do contador já existente)
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // computed automaticamente reativo — true quando token existe
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')

  // Simula chamada de API com delay de 1.5s
  async function login(email: string, password: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Senha incorreta → lança erro que o componente vai capturar
    if (password !== '123456') throw new Error('Credenciais inválidas')

    user.value =
      email === 'admin@admin.com'
        ? { name: 'Admin', email, role: 'ADMIN' }
        : { name: email.split('@')[0], email, role: 'USER' }

    token.value = 'fake-token-' + Date.now()
  }

  async function register(name: string, email: string, _password: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    user.value = { name, email, role: 'USER' }
    token.value = 'fake-token-' + Date.now()
  }

  function logout(): void {
    user.value = null
    token.value = null
  }

  return { user, token, isAuthenticated, isAdmin, login, register, logout }
})
