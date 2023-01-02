import { Router } from 'express'
import { crear, actualizar, eliminar, obtener  } from '../controllers/contenidoControllers.js'

const router = Router()

router.post('/', crear)

router.get('/:tipo/:valor', obtener)

router.put('/:uid', actualizar)

router.delete('/:uid', eliminar)

export default router