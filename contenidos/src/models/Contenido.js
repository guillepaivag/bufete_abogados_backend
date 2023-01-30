const paramsObject = {
    uid: '',
    codigo: '',
    titulo: '',
    descripcion: '',
    texto: '',
    foto: '',
    tipo: '',
}

class Contenido {
    static schema = {
        type: 'object',
        properties: {
            uid: { type: 'string', errorMessage: 'must be of string type' },
            codigo: { type: 'string', errorMessage: 'must be of string type' },
            titulo: { type: 'string', errorMessage: 'must be of string type' },
            descripcion: { type: 'string', errorMessage: 'must be of string type' },
            texto: { type: 'string', errorMessage: 'must be of string type' },
            foto: { type: 'string', errorMessage: 'must be of string type' },
            tipo: { type: 'string', errorMessage: 'must be of string type' },
        },
        required: ['codigo','titulo','descripcion','texto','foto', 'tipo'],
    }

    static params = paramsObject

    constructor ( data = paramsObject ) {
        const { uid, codigo, descripcion, titulo, texto, foto, tipo} = data
        
        this.uid = uid ? uid : ''
        this.codigo = codigo ? codigo : ''
        this.titulo = titulo ? titulo : ''
        this.descripcion = descripcion ? descripcion : ''
        this.texto = texto ? texto : ''
        this.foto = foto ? foto : ''
        this.tipo = tipo ? tipo : 'Servicio'
    }
}

export default Contenido