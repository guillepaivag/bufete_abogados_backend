import { request, response } from 'express'
import { verificadorActualizacionContrasena } from './helpers/usuarios/verificadorActualizacionContrasena.js'

export const verificacionActualizacionContrasena = async (req = request, res = response, next) => {
    try {
        const { body } = req
        const { solicitante, contrasena, confirmacionContrasena } = body
        const { uidSolicitante } = solicitante

        const respuestaError = verificadorActualizacionContrasena({ contrasena, confirmacionContrasena })
        if (respuestaError) throw respuestaError

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }
}

export const verificacionEliminacionUsuario = async (req = request, res = response, next) => {
    try {
        const { body } = req
        const { solicitante, contrasena } = body
        const { uidSolicitante } = solicitante

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }
}


export default { verificacionActualizacionContrasena, verificacionEliminacionUsuario }