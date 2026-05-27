import express from 'express'
import { ordersRouter } from './routes/orders.js'
import { categoryRouter } from './routers/category.router.ts'
import { productRouter } from './routers/product.router.ts'
import { logger } from './middlewares/logger.js'

const app = express()

app.use(express.json())
app.use(logger)

// Atividade 6
app.use('/orders', ordersRouter)

// Atividade 7
app.use('/category', categoryRouter)
app.use('/products', productRouter)

app.listen(3000, () => {
  console.log('PonteMrket API rodando em http://localhost:3000')
})
