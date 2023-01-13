import validUrl from 'valid-url'
import esCodigo from "../helpers/esCodigo.js"
import RespuestaError from '../models/RespuestaError.js'
import validateSchema from '../helpers/validateSchema.js'
import ContenidoUseCase from '../usecases/ContenidoUseCase.js'
import FirestoreContenidoRepository from '../repositories/FirestoreContenidoRepository.js'
import Contenido from '../models/Contenido.js'
const contenidoUseCase = new ContenidoUseCase(new FirestoreContenidoRepository)

export const validacionContenidoGet = async (req = request, res = response, next) => {
    try {
        const { params } = req
        const { tipo, valor } = params

        // verificamos que el tipo sea valido
        if (tipo !== 'uid' && tipo !== 'codigo') {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'tipo_no_valido',
                mensajeServidor: 'El tipo solo puede ser uid o codigo',
                resultado: null
            })
        }

        let contenido = null

        // verificamos que exista la uid
        if (tipo === 'uid') contenido = await contenidoUseCase.obtenerPorUID(valor)

        // verificamos que exista la uid
        if (tipo === 'codigo') contenido = await contenidoUseCase.obtenerPorCodigo(valor)

        if (!contenido) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'contenido_no_existe',
                mensajeServidor: 'No existe el contenido',
                resultado: null
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const validacionContenidoPost = async (req = request, res = response, next) => {
    try {
        const { body } = req

        // const validation = validateSchema(Contenido.schema, req);
        // if (validation !== true) {
        //     throw new RespuestaError({
        //         estado: 422,
        //         mensajeCliente: validation.data,
        //         mensajeServidor: validation.data,
        //         resultado: null
        //     })
        // }

        // verificamos que el codigo sea un codigo
        if (!esCodigo(body.codigo)) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'codigo_debe_ser_valido',
                mensajeServidor: 'el codigo debe ser valido',
                resultado: null
            })
        }

        // verificamos que el contenido tenga al menos 2 caracteres hasta 100 
        if (body.titulo.length > 100 || body.titulo.length < 2) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'titulo_debe_ser_valido',
                mensajeServidor: 'el titulo debe ser valido',
                resultado: null
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const validacionContenidoPut = async (req = request, res = response, next) => {
    try {
        const { body, params } = req
        req.body.datosActualizados = {}

        // const validation = validateSchema(Contenido.schema, req);
        // if (validation !== true) {
        //     throw new RespuestaError({
        //         estado: 422,
        //         mensajeCliente: validation.data,
        //         mensajeServidor: validation.data,
        //         resultado: null
        //     })
        // }

        // verificamos que exista la uid
        const contenido = await contenidoUseCase.obtenerPorUID(params.uid)

        if (!contenido) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'contenido_no_existe',
                mensajeServidor: 'No existe el contenido',
                resultado: null
            })
        }

        // verificamos que el codigo sea un codigo
        if (body.codigo) {
            if (!esCodigo(body.codigo)) {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'codigo_debe_ser_valido',
                    mensajeServidor: 'el codigo debe ser valido',
                    resultado: null
                })
            }
            req.body.datosActualizados.codigo = body.codigo
        }

        // verificamos que el contenido tenga al menos 2 caracteres hasta 100 
        if (body.titulo) {
            if (body.titulo.length > 100 || body.titulo.length < 2) {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'titulo_debe_ser_valido',
                    mensajeServidor: 'el titulo debe ser valido',
                    resultado: null
                })
            }
            req.body.datosActualizados.titulo = body.titulo
        }
        
        // verificamos que el contenido tenga al menos 10 caracteres hasta 2700 
        if (body.descripcion) {
            if (body.descripcion.length > 700 || body.descripcion.length < 10 ) {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'descripcion_debe_ser_valido',
                    mensajeServidor: 'la descripcion debe ser valido',
                    resultado: null
                })
            }
            req.body.datosActualizados.descripcion = body.descripcion
        }

        // verificamos que el contenido tenga al menos 10 caracteres hasta 2700 
        if (body.texto) {
            let soloTexto = body.texto.replace(/(<([^>]+)>)/ig, '')
            soloTexto =  soloTexto.replace(/[\n\r]+/g, '')
            soloTexto = soloTexto.replace(/\s{2,10}/g, ' ')
            soloTexto = soloTexto.trim()

            if (soloTexto.length > 2500 || soloTexto.length < 10) {
                throw new RespuestaError({
                    estado: 400,
                    mensajeCliente: 'texto_debe_ser_valido',
                    mensajeServidor: 'el texto debe ser valido',
                    resultado: null
                })
            }
            req.body.datosActualizados.texto = body.texto
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const validacionContenidoDelete = async (req = request, res = response, next) => {
    try {
        const { body, params } = req

        // verificamos que exista la uid
        const contenido = await contenidoUseCase.obtenerPorUID(params.uid)

        if (!contenido) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'contenido_no_existe',
                mensajeServidor: 'No existe el contenido',
                resultado: null
            })
        }

        // verificamos que el tipos sea Servicio o QuienesSomos
        if (contenido.tipo === "QuienesSomos") {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'QuienesSomos_no_debe_eliminarse',
                mensajeServidor: 'QuienesSomos no puede ser eliminado',
                resultado: null
            })
        }

        const contenidos = await contenidoUseCase.obtenerTodos()

        if (contenidos.length === 1) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'debe_haber_al_menos_un_servicio',
                mensajeServidor: 'Debe haber al menos un servicio',
                resultado: null
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

export default {
    validacionContenidoGet,
    validacionContenidoPost,
    validacionContenidoPut,
    validacionContenidoDelete
}