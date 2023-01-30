import { Router } from 'express'
import { enviarCorreoDeContacto } from '../controllers/correosControllers.js'

const router = Router()

router.post('/correo-de-contacto', enviarCorreoDeContacto)

export default router