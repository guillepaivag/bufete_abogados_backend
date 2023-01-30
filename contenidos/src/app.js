import express from 'express'
import cors from 'cors'
import manejadorErrores from './helpers/manejadorErrores.js'

// Get Routes
import contenidosRoutes from './routes/contenidosRoutes.js'

// App
const app = express()

// Middlewares
const origin = []
const urlProduccion = ['https://consultoria-legal.com', 'https://consultoria-legal.web.app']
process.env.ENVIRONMENT === 'production' ? origin.push(...urlProduccion) : ''
process.env.ES_LOCAL === 'Y' && process.env.ENVIRONMENT === 'development' ? origin.push('http://localhost:3000') : ''
process.env.ES_LOCAL === 'N' && process.env.ENVIRONMENT === 'development' ? origin.push('https://consultoria-legal-dev.web.app') : ''

app.use(cors({
  credentials: true,
  origin,
  methods: ['GET','POST','DELETE','PUT','UPDATE','PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/contenidos', contenidosRoutes)

// MANEJO DE ERRORES
app.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
  
  const respuesta = manejadorErrores( err )
  return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
})

export default app