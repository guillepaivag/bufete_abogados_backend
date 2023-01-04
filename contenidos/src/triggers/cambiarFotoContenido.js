
import functions from "firebase-functions"
import firebaseStorageService from "../../firebase-service/firebase-storage-service.js"
import FirestoreContenidoRepository from "../repositories/FirestoreContenidoRepository.js"
import ContenidoUseCase from "../usecases/ContenidoUseCase.js"
const contenidosUseCase = new ContenidoUseCase(new FirestoreContenidoRepository())

const rutaModo = process.env.ENVIRONMENT === 'production' ? 'prod' : 'dev'
const bucketNameFoto = rutaModo === 'prod' ? 'cl-fotos_presentaciones-prod' : 'cl-fotos_presentaciones-dev'

// uid/nuevo/hola.png
// uid/actual/hola.png
export const actualizacionFotoPresentaciones = functions
    .region('southamerica-east1')
    .storage
    .bucket(bucketNameFoto)
    .object().onFinalize(async (object, context) => {
        console.log('object', JSON.stringify(object))
        console.log('context', JSON.stringify(context))

        /**
         * Formato Object nuevo: uid/nuevo/nombre.extension
         * Formato Object actual: uid/actual/nombre.extension
         * 
         * Tips: 
         * 1. verificacion
         */

        try {
            const array1 = object.name.split('/')
            const array2 = object.name.split('.')

            console.log("array1",array1)

            const uid = array1[0]
            const tipo = array1[1]
            const nombre = array1[2]
            const fileExtension = array2[array2.length - 1]

            const esValido = tipo === 'nuevo'
            if(tipo === 'actual') return
            if (!esValido) throw new Error('No es verificacion ni foto del contenido.')

            // Verificaciones

            // png | jpg | jpeg
            if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')
                throw new Error('Extensión incorrecta.')


            // 5mb
            const sizeBytes = Number(object.size)
            const sizeMB = sizeBytes / 1024 / 1024

            if (sizeMB > 5)
                throw new Error('La foto solo puede pesar hasta 5MB.')


            // Eliminar foto en actual
            await firebaseStorageService.bucket(bucketNameFoto).deleteFiles({
                prefix: `${uid}/actual/`
            })

            // Publicar la foto en actual
            const file = firebaseStorageService.bucket(bucketNameFoto).file(object.name)
            const data = await file.move(`${uid}/actual/${nombre}`)
            const destinationFile = data[0]

            // Actualizar con la nueva URL
            let contenido = await contenidosUseCase.obtenerPorUID(uid)

            await contenidosUseCase.actualizar(uid, {
                codigo: contenido.codigo,
                titulo: contenido.titulo,
                descripcion: contenido.descripcion,
                texto: contenido.texto,
                foto: destinationFile.publicUrl(),
                tipo: contenido.tipo
            })

        } catch (error) {
            console.log('Error al actualizar una foto: ', error)

            // Eliminar foto en nuevo
            const file = firebaseStorageService.bucket(bucketNameFoto).file(object.name)
            file.delete()
        }

    })
