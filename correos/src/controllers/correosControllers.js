import Respuesta from "../models/Respuesta.js"
import RespuestaError from "../models/RespuestaError.js"

// Correo
import AwsSesCorreoRepository from "../repositories/AwsSesCorreoRepository.js"
import CorreoUseCase from "../usecases/CorreoUseCase.js"

// Variables
const correoUseCase = new CorreoUseCase(new AwsSesCorreoRepository())

export const enviarCorreoDeContacto = async (req = req, res) => {
    try {
        const { body } = req
        const { correo, asunto, contenido } = body
        
        // Enviar correo
        await correoUseCase.enviarCorreoContacto({
            correo, 
            asunto, 
            contenido
        })

        // Retornar respuesta
        const respuesta = new Respuesta({
            estado: 200,
            mensajeCliente: 'exito',
            mensajeServidor: 'Se envió un correo!',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    } catch (error) {
        console.log('Error - enviarCorreoDeContacto: ', error)

        const respuesta =  new RespuestaError({
            estado: 500,
            mensajeCliente: 'error_servidor',
            mensajeServidor: 'error en el servidor',
            resultado: null
        })

        return res.status(respuesta.estado).json(respuesta.getRespuesta())

    }
}