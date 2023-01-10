import { Router } from 'express'
import { estaAutenticado } from '../middlewares/estaAutenticado.js'
import { verificacionActualizacionContrasena, verificacionEliminacionUsuario } from '../middlewares/usuariosMiddlewares.js'
import { actualizarContrasena, crear, eliminar, obtener, obtenerUnUsuario } from '../controllers/usuariosControllers.js'

const router = Router()

router.post('/', crear)

router.post('/listar', obtener)

router.get('/:tipo/:valor', obtenerUnUsuario)

router.put('/contrasena', 
    estaAutenticado, 
    verificacionActualizacionContrasena,
    actualizarContrasena)

router.put('/eliminar-usuario', 
    estaAutenticado, 
    verificacionEliminacionUsuario,
    eliminar)

export default router