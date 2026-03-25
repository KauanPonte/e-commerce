import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import DataTable from 'primevue/datatable'
import InputNumber from 'primevue/inputnumber'

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
  app.component('DataTable', DataTable)
  app.component('Column', Column)
  app.component('Breadcrumb', Breadcrumb)
}
