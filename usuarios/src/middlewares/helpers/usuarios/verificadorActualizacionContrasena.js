import RespuestaError from "../../../models/RespuestaError.js"

export const verificadorActualizacionContrasena = (data) => {
    const { contrasena, confirmacionContrasena } = data

    if (typeof contrasena !== 'string') {
        return new RespuestaError({
            estado: 400,
            mensajeCliente: 'formato_contrasena_incorrecto',
            mensajeServidor: 'La contraseña debe ser string.'
        })
    }

    if (contrasena !== confirmacionContrasena) {
        return new RespuestaError({
            estado: 400,
            mensajeCliente: 'confirmacion_diferente',
            mensajeServidor: 'La confirmación es diferente a la contraseña.'
        })
    }

    return null
}