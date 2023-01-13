import Correo from '../../../models/Correo.js'
import { styleCorreoDeContacto } from './styleCorreoDeContacto.js'

export const htmlCorreoDeContacto = (correo = Correo.params) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset='utf-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <title>Verificacion de correo</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <style>
                ${styleCorreoDeContacto}
            </style>
        </head>
        <body>
            ¡Hola <b>${correo.correo}</b>!
        </body>
    </html>
    `
}