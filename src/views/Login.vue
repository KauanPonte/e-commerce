<template>
  <PrimeToast />

  <div class="min-h-screen flex">
    <!-- Painel esquerdo — identidade da marca -->
    <div class="hidden lg:flex w-1/2 bg-blue-700 flex-col items-center justify-center px-16 gap-6">
      <RouterLink to="/" class="text-white text-4xl font-bold tracking-tight">
        PonteMrket
      </RouterLink>
      <p class="text-blue-200 text-center text-lg leading-relaxed max-w-xs">
        As melhores frutas frescas, direto para a sua mesa.
      </p>
      <div class="flex gap-2 mt-4">
        <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
        <span class="w-2 h-2 rounded-full bg-blue-400"></span>
        <span class="w-2 h-2 rounded-full bg-white opacity-40"></span>
      </div>
    </div>

    <!-- Painel direito — formulário -->
    <div class="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
      <div class="w-full max-w-sm">
        <!-- Logo mobile (só aparece em telas pequenas) -->
        <RouterLink to="/" class="lg:hidden block text-blue-700 text-2xl font-bold mb-8 text-center">
          PonteMrket
        </RouterLink>

        <h1 class="text-2xl font-bold text-gray-800 mb-1">Bem-vindo de volta</h1>
        <p class="text-gray-500 text-sm mb-8">Entre na sua conta para continuar</p>

        <form @submit.prevent="submit" class="flex flex-col gap-5">
          <!-- E-mail -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700">E-mail</label>
            <InputText
              v-model="form.email"
              placeholder="seu@email.com"
              :invalid="v$.email.$error"
              class="w-full"
            />
            <span v-if="v$.email.$error" class="text-red-500 text-xs">
              {{ v$.email.$errors[0].$message }}
            </span>
          </div>

          <!-- Senha -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700">Senha</label>
            <PrimePassword
              v-model="form.password"
              placeholder="••••••"
              :feedback="false"
              toggleMask
              :invalid="v$.password.$error"
              class="w-full"
              fluid
            />
            <span v-if="v$.password.$error" class="text-red-500 text-xs">
              {{ v$.password.$errors[0].$message }}
            </span>
          </div>

          <!-- Botão com a cor amarela do site -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full mt-1 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-800 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <i v-if="loading" class="pi pi-spin pi-spinner" />
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          Não tem uma conta?
          <RouterLink to="/register" class="text-blue-700 font-semibold hover:underline ml-1">
            Criar conta
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()
const loading = ref(false)

const form = reactive({ email: '', password: '' })

// Regras do Vuelidate — helpers.withMessage personaliza a mensagem de erro
const rules = {
  email: {
    required: helpers.withMessage('E-mail é obrigatório', required),
    email: helpers.withMessage('Formato de e-mail inválido', email),
  },
  password: {
    required: helpers.withMessage('Senha é obrigatória', required),
  },
}

const v$ = useVuelidate(rules, form)

async function submit() {
  // Dispara validação em todos os campos antes de continuar
  const valid = await v$.value.$validate()
  if (!valid) return

  loading.value = true
  try {
    await authStore.login(form.email, form.password)
    toast.add({ severity: 'success', summary: 'Login realizado!', life: 2000 })

    // Redireciona para a página que o usuário tentou acessar, ou para Home
    const redirect = (route.query.redirect as string) ?? '/'
    setTimeout(() => router.push(redirect), 700)
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Credenciais inválidas',
      detail: 'Verifique seu e-mail e senha e tente novamente',
      life: 4000,
    })
  } finally {
    loading.value = false
  }
}
</script>
