import express from 'express'
import cors from 'cors'
import manejadorErrores from './helpers/manejadorErrores.js'

// Get Routes
import contenidosRoutes from './routes/contenidosRoutes.js'

// App
const app = express()

// Middlewares
app.use(cors({
  credentials: true,
  origin: ['https://consultoria-legal.com', 'https://consultoria-legal.web.app', 'https://consultoria-legal-dev.web.app', 'http://localhost:3000'],
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