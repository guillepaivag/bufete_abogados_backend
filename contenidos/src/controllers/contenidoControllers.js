import Respuesta from "../models/Respuesta.js"
import RespuestaError from "../models/RespuestaError.js"
import FirestoreContenidoRepository from "../repositories/FirestoreContenidoRepository.js"
import ContenidoUseCase from "../usecases/ContenidoUseCase.js"
const contenidosUseCase = new ContenidoUseCase(new FirestoreContenidoRepository())

export const obtenerTodosLosServicios = async (req, res) => {
    try {
        const {  } = req

        const contenidos = await contenidosUseCase.obtenerTodos()
        const servicios = contenidos.filter(v => v.tipo === 'Servicio' && v.titulo !== '' && v.texto !== '' && v.descripcion !== '' && v.foto !== '')

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se cargaron todos los servicios!',
            resultado: servicios
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtenerTodosLosServicios: ', error)

        const respuesta =  new RespuestaError({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'error en el servidor',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }
}

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
        const { body } = req

        const contenido = await contenidosUseCase.crear({
            codigo: body.codigo,
            titulo: body.titulo,
            descripcion: '',
            texto: '',
            foto: '',
            tipo: 'Servicio',
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