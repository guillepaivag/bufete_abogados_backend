import Respuesta from "../models/Respuesta.js";
import RespuestaError from "../models/RespuestaError.js";

function manejadorErrores(error) {

    let respuesta = new Respuesta()

    if (error instanceof Error) {

        if (error instanceof RespuestaError) {
            // Modelo Errores
            respuesta = new Respuesta({
                estado: error.estado,
                mensajeCliente: error.mensajeCliente,
                mensajeServidor: error.mensajeServidor,
                resultado: error.resultado
            })

        } else if (error instanceof TypeError) {
            // sentencias para manejar excepciones TypeError
            respuesta = new Respuesta({
                estado: 400,
                mensajeCliente: 'type_error',
                mensajeServidor: 'type error',
                resultado: null
            })

        } else {
            // Manejador de errores de Express Validators
            if (error && error.errors instanceof Array && error.errors.length && error.errors[0].msg instanceof RespuestaError) {
                const customError = error.errors[0].msg

                respuesta = new Respuesta({
                    estado: customError.estado,
                    mensajeCliente: customError.mensajeCliente,
                    mensajeServidor: customError.mensajeServidor,
                    resultado: customError.resultado
                })
            }
        }
    }

    if (!respuesta.estado) {
        respuesta = new Respuesta({
            estado: 500,
            mensajeCliente: '',
            mensajeServidor: '',
            resultado: null
        })
    }

    return respuesta
}

export default manejadorErrores