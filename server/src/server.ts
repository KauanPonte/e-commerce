import express from 'express'
import { ordersRouter } from './routes/orders.js'
import { categoryRouter } from './routers/category.router.ts'
import { productRouter } from './routers/product.router.ts'
import { matriculaRouter } from './routers/matricula.router.ts'
import { vendaRouter } from './routers/venda.router.ts'
import { restauranteRouter } from './routers/restaurante.router.ts'
import { bibliotecaRouter } from './routers/biblioteca.router.ts'
import { clinicaRouter } from './routers/clinica.router.ts'
import { categoriesRouter } from './routers/categories.router.ts'
import { productsRouter } from './routers/products.router.ts'
import { authRouter } from './routers/auth.router.ts'
import { logger } from './middlewares/logger.js'
import { errorMiddleware } from './middlewares/error.middleware.ts'

const app = express()

app.use(express.json())
app.use(logger)

// Atividades anteriores
app.use('/orders', ordersRouter)
app.use('/category', categoryRouter)
app.use('/products', productRouter)
app.use('/matriculas', matriculaRouter)
app.use('/vendas', vendaRouter)
app.use('/restaurante', restauranteRouter)
app.use('/biblioteca', bibliotecaRouter)
app.use('/clinica', clinicaRouter)

// Atividade 09 — Arquitetura em camadas com banco SQL e JWT
app.use('/auth', authRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/products', productsRouter)

// Deve ser o último middleware — captura erros de todos os routers acima
app.use(errorMiddleware)

app.listen(3000, () => {
  console.log('PonteMrket API rodando em http://localhost:3000')
})
