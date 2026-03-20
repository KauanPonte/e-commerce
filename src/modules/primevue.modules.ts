import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'

export function setPrimeVue(app: App): void {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  app.use(ConfirmationService)
  app.component('PrimeButton', Button)
  app.component('PrimeCard', Card)
  app.component('InputNumber', InputNumber)
  app.component('ConfirmDialog', ConfirmDialog)
}
