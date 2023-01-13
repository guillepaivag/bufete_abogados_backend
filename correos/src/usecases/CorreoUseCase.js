import { htmlCorreoDeContacto } from "../helpers/correosEstructurados/CorreoDeContacto/htmlCorreoDeContacto.js"
import Correo from "../models/Correo.js"

class CorreoUseCase {

    constructor(correoRepository) {
        this.correoRepository = correoRepository
    }

    async enviarCorreoContacto(correo = Correo.params) {
        const htmlCorreoContacto = htmlCorreoDeContacto(correo)
        return await this.correoRepository.enviarCorreoContacto({
            asunto: `Correo de contacto de ${correo.correo}`,
            contenido: htmlCorreoContacto
        })
    }

}

export default CorreoUseCase