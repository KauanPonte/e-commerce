import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

export const useAuthStore = defineStore('auth', () => {
  // Recupera do localStorage ao iniciar — sobrevive ao reload da página
  const savedUser = localStorage.getItem('auth_user')
  const savedToken = localStorage.getItem('auth_token')

  const user = ref<User | null>(savedUser ? JSON.parse(savedUser) : null)
  const token = ref<string | null>(savedToken ?? null)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')

  async function login(email: string, password: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (password !== '123456') throw new Error('Credenciais inválidas')

    user.value =
      email === 'admin@admin.com'
        ? { name: 'Admin', email, role: 'ADMIN' }
        : { name: email.split('@')[0] ?? email, email, role: 'USER' }

    token.value = 'fake-token-' + Date.now()

    // Salva no localStorage para sobreviver ao reload
    localStorage.setItem('auth_user', JSON.stringify(user.value))
    localStorage.setItem('auth_token', token.value)
  }

  async function register(name: string, email: string, _password: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    user.value = { name, email, role: 'USER' }
    token.value = 'fake-token-' + Date.now()

    localStorage.setItem('auth_user', JSON.stringify(user.value))
    localStorage.setItem('auth_token', token.value)
  }

  function logout(): void {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
  }

  return { user, token, isAuthenticated, isAdmin, login, register, logout }
})
