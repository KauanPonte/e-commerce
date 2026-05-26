import express from 'express'
import { productsRouter } from './routes/products.js'
import { ordersRouter } from './routes/orders.js'
import { logger } from './middlewares/logger.js'

const app = express()

app.use(express.json())
app.use(logger)

app.use('/products', productsRouter)
app.use('/orders', ordersRouter)

app.listen(3000, () => {
  console.log('PonteMrket API rodando em http://localhost:3000')
})
