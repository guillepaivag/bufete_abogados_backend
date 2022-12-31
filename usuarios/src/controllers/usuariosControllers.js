// Respuestas del servidor
import Respuesta from "../models/Respuesta.js"
import RespuestaError from "../models/RespuestaError.js"

// Authentication
import FirebaseAuthenticationRepository from "../repositories/FirebaseAuthenticationRepository.js"
import AuthenticationUseCase from "../usecases/AuthenticationUseCase.js"

// Manejo de errores
import { errorHandler } from "../utils/error-handler.js"

// Use cases
const authenticationUseCase = new AuthenticationUseCase(new FirebaseAuthenticationRepository())

export const crear = async (req, res) => {
    try {
        const { params, body } = req
        const { correo } = body

        // Crear Usuario en Firebase Authentication
        const usuarioAuth = await authenticationUseCase.crear(correo, '123456')
        await authenticationUseCase.actualizarCustomClaims(usuarioAuth.uid, { rol: 'miembro' })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se creó un usuario con éxito.',
            resultado: usuarioAuth
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - crear-usuario: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}


export const obtener = async (req, res) => {
    try {
        const { params } = req

        // Obtener todos los usuarios
        const usuariosAuth = await authenticationUseCase.obtenerTodosLosUsuarios()

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se obtuvieron los usuarios con éxito.',
            resultado: usuariosAuth
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtener-usuarios: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}


export const obtenerUnUsuario = async (req, res) => {
    try {
        const { params } = req
        const { tipo, valor } = params

        // Obtener usuario
        let usuarioAuth = null

        if (tipo === 'uid') usuarioAuth = await authenticationUseCase.obtenerPorUID(valor)
        else if (tipo === 'correo') usuarioAuth = await authenticationUseCase.obtenerPorCorreo(valor)
        else throw new TypeError('No hay datos para buscar el usuario.')

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se obtuvieron los usuarios con éxito.',
            resultado: usuarioAuth
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - obtener-usuarios: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}


export const actualizarContrasena = async (req, res) => {
    try {
        const { params, body } = req
        const { uidUsuario, contrasena, confirmacionContrasena } = body

        // Actualizar contrasena
        await authenticationUseCase.actualizar(uidUsuario, { password: contrasena })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se actualizó la contraseña del usuario con éxito.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - actualizar_contrasena-usuario: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}


export const eliminar = async (req, res) => {
    try {
        const { params, body } = req
        const { uidUsuario, contrasena } = body

        // Eliminar usuario
        await authenticationUseCase.eliminar(uidUsuario)

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se eliminó el usuario con éxito.',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - eliminar-usuario: ', error)

        // Manejo de errores
        const respuestaManejada = errorHandler(error)
        return res.status(respuestaManejada.estado).json(respuestaManejada.getRespuesta())

    }
}


export default { crear, obtener, obtenerUnUsuario, actualizarContrasena, eliminar }