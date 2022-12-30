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
        const { correo, contrasena } = body

        // Crear Usuario en Firebase Authentication
        const usuarioAuth = await authenticationUseCase.crear(correo, contrasena)
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


export default { crear, obtener, actualizarContrasena }