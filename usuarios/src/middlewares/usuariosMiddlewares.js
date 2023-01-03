import { request, response } from 'express'
import RespuestaError from '../models/RespuestaError.js'

export const verificacionActualizacionContrasena = async (req = request, res = response, next) => {
    try {
        const { body } = req
        const { solicitante, contrasena, confirmacionContrasena } = body
        const { uidSolicitante } = solicitante

        if (typeof contrasena !== 'string') {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'formato_contrasena_incorrecto',
                mensajeServidor: 'La contraseña debe ser string.'
            })
        }

        if (contrasena !== confirmacionContrasena) {
            throw new RespuestaError({
                estado: 400,
                mensajeCliente: 'confirmacion_diferente',
                mensajeServidor: 'La confirmación es diferente a la contraseña.'
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }
}

export const verificacionEliminacionUsuario = async (req = request, res = response, next) => {
    const { body } = req
    const { solicitante, contrasena } = body

    
}


export default { verificacionActualizacionContrasena, verificacionEliminacionUsuario }