import Respuesta from "../models/Respuesta.js"
import RespuestaError from "../models/RespuestaError.js"
import FirestoreContenidoRepository from "../repositories/FirestoreContenidoRepository.js"
import ContenidoUseCase from "../usecase/ContenidoUseCase.js"
const contenidosUseCase = new ContenidoUseCase(new FirestoreContenidoRepository())



export const obtener = async (req, res) => {
    try {
        const { params } = req
        const { tipo, valor } = params

        let contenido = null

        if (tipo === 'uid') 
            contenido = await contenidosUseCase.obtenerPorUID(valor)
        else if (tipo === 'codigo') 
            contenido = await contenidosUseCase.obtenerPorCodigo(valor)
        else throw new TypeError('No hay datos para buscar el contenido.')

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'exito',
            resultado: contenido
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtenerContenido: ', error)

        const respuesta =  new RespuestaError({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'error en el servidor',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }

}

export const crear = async (req, res) => {
    try {
        const { params, body } = req
        const { uid } = params

        let contenido = await contenidosUseCase.crear(uid, {
            codigo: body.codigo,
            titulo: body.titulo,
            texto: body.texto,
            foto: body.foto,
            tipo: body.tipo,
        })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'exito',
            resultado: contenido
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - crearContenido: ', error)

        const respuesta =  new RespuestaError({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'error en el servidor',
            resultado: null
        })
        
        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }

}

export const actualizar = async (req, res) => {
    try {
        const { params, body } = req
        const { uid } = params

        let contenido = await contenidosUseCase.actualizar(uid, body)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'exito',
            resultado: contenido
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - actualizarContenido: ', error)

        const respuesta =  new RespuestaError({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'error en el servidor',
            resultado: null
        })
        
        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }

}

export const eliminar = async (req, res) => {
    try {
        const { params } = req
        const { uid } = params

        await contenidosUseCase.eliminar(uid)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'exito',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - eliminarContenido: ', error)

        const respuesta =  new RespuestaError({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'error en el servidor',
            resultado: null
        })
        
        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }

}

export default {
    crear,
    obtener,
    actualizar,
    eliminar
}