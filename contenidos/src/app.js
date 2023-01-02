import express from 'express'
import cors from 'cors'

// Get Routes
import contenidosRoutes from './routes/contenidosRoutes.js'

// App
const app = express()

// Middlewares
app.use(cors({
  credentials: true,
  origin: ['https://consultoria-legal.com', 'https://consultoria-legal.web.app', 'http://localhost:3000'],
  methods: ['GET','POST','DELETE','PUT','UPDATE','PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/contenidos', contenidosRoutes)

// Manejo de errores
app.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
})

export default app