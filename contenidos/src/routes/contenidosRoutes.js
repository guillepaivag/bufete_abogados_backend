import { Router } from 'express'
import { crear, actualizar, eliminar, obtener  } from '../controllers/contenidoControllers.js'
import { 
    validacionContenidoGet,
    validacionContenidoPost,
    validacionContenidoPut,
    validacionContenidoDelete 
} from "../middlewares/contenidosMiddleware.js"

import { estaAutenticado } from '../middlewares/estaAutenticado.js'

const router = Router()

router.post('/', estaAutenticado, validacionContenidoPost, crear)

router.get('/:tipo/:valor', validacionContenidoGet, obtener)

router.put('/:uid', estaAutenticado, validacionContenidoPut, actualizar)

router.delete('/:uid', estaAutenticado, validacionContenidoDelete, eliminar)

export default router