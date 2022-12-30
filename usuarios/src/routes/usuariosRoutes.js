import { Router } from 'express'
import { crear } from '../controllers/usuariosControllers.js'

const router = Router()

router.post('/', crear)

router.get('/')

router.get('/:tipo/:valor')

router.put('/:tipo/:valor/actualizarContrasena')

router.delete('/:tipo/:valor')

export default router