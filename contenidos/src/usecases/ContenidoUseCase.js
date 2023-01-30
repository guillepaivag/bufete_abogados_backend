import Contenido from "../models/Contenido.js";


// recibiendo como parámetros las dependencias necesarias.

class ContenidoUseCase {

    constructor(contenidoRepository) {
        this.contenidoRepository = contenidoRepository
    }

    async obtenerTodos() {
        return await this.contenidoRepository.obtenerTodos()
    }

    async obtenerPorUID(uid) {
        return await this.contenidoRepository.obtenerPorUID(uid)
    }

    async obtenerPorCodigo(codigo) {
        return await this.contenidoRepository.obtenerPorCodigo(codigo)
    }

    async crear(data = Contenido.params) {
        return await this.contenidoRepository.crear(data)
    }

    async actualizar(uid, datosActualizados = Contenido.params) {
        const contenido = await this.contenidoRepository.actualizar(uid, datosActualizados)
        return contenido
    }

    async eliminar(uid) {
       await this.contenidoRepository.eliminar(uid)
    }

}

export default ContenidoUseCase