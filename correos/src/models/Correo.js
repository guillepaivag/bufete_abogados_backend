const paramsObject = {
    correo: '',
    asunto: '',
    contenido: '',
}

class Correo {
    static schema = {
        type: 'object',
        properties: {
            correo: { type: 'string', errorMessage: 'must be of string type' },
            asunto: { type: 'string', errorMessage: 'must be of string type' },
            contenido: { type: 'string', errorMessage: 'must be of string type' },
        },
        required: ['correo','asunto','contenido'],
    }

    static params = paramsObject

    constructor ( data = paramsObject ) {
        const { correo, asunto, contenido } = data
        
        this.correo = correo ? correo : ''
        this.asunto = asunto ? asunto : ''
        this.contenido = contenido ? contenido : ''
    }
}

export default Correo