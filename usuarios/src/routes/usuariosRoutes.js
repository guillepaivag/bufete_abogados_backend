import { Router } from 'express'
import { actualizarContrasena, crear, eliminar, obtener, obtenerUnUsuario } from '../controllers/usuariosControllers.js'

const router = Router()

router.post('/', crear)

router.get('/', obtener)

router.get('/:tipo/:valor', obtenerUnUsuario)

router.put('/actualizarContrasena', actualizarContrasena)

router.delete('/', eliminar)

export default router