import { Router } from 'express'
import { crear, actualizar, eliminar, obtener  } from '../controllers/contenidoControllers.js'
import { 
    validacionContenidoGet,
    validacionContenidoPost,
    validacionContenidoPut,
    validacionContenidoDelete 
} from "../middlewares/contenidosMiddleware.js"

const router = Router()

router.post('/', validacionContenidoPost, crear)

router.get('/:tipo/:valor', validacionContenidoGet, obtener)

router.put('/:uid', validacionContenidoPut, actualizar)

router.delete('/:uid', validacionContenidoDelete, eliminar)

export default router