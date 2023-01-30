import { enviarCorreo } from "../helpers/enviarCorreo.js"
import Correo from "../models/Correo.js"

class AwsSesCorreoRepository {

    constructor(isTest) {
        this.isTest = isTest
    }

    async enviarCorreoContacto(correo = Correo.params) {
        return await enviarCorreo({
            from: process.env.CORREO_EMISOR_PARA_CONTACTO,
            to: process.env.CORREO_RECEPTOR_PARA_CONTACTO,
            subject: correo.asunto,
            html: correo.contenido
        })
    }

    _obtenerCorreo(data = Correo.params) {
        return new Correo({
            correo: data.correo,
            asunto: data.asunto,
            contenido: data.contenido,
        })
    }
}

export default AwsSesCorreoRepository