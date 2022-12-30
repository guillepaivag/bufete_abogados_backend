const paramsObject = {
    uid: '',
    titulo: '',
    texto: '',
    foto: '',
}

class Contenido {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'must be of string type' },
            titulo: { type: 'string', errorMessage: 'must be of string type' },
            texto: { type: 'string', errorMessage: 'must be of string type' },
            foto: { type: 'string', errorMessage: 'must be of string type' },
        },
        required: ['uid','titulo','texto','foto'],
        additionalProperties: false,
    }

    static params = paramsObject

    constructor ( data = paramsObject ) {
        const { uid, titulo, texto, foto} = data
        
        this.uid = uid ? uid : ''
        this.titulo = titulo ? titulo : ''
        this.texto = texto ? texto : ''
        this.foto = foto ? foto : ''
    }
}

export default Contenido