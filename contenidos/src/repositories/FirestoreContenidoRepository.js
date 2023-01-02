import collections_name_firestore from '../../firebase-service/collections_name_firestore/collections_name_firestore.js'
import firebaseFirestoreService from '../../firebase-service/firebase-firestore-service.js'
import Contenido from '../models/Contenido.js'


class FirestoreContenidoRepository {
    
      constructor(isTest) {
    
        // Obtener el nombre de la colección desde variables de entorno.
        // Si "test" es true, se le agrega un sufijo, útil para que 
        // las pruebas de integración no sobreescriban los datos existentes.
        
        let collection_name = collections_name_firestore.contenidos
    
        if (isTest) collection_name += '_test'
    
        this.collection = firebaseFirestoreService.collection(collection_name)
        this.isTest = isTest
    
      }
    
      async obtenerPorUID (uid = '') {
    
        const doc = await this.collection.doc(uid).get()
    
        if (!doc.exists) return null
        
        return this._obtenerDeDocumento(doc)
      
      }

      async obtenerPorCodigo (codigo = '') {
    
        const snapshot = await this.collection
        .where('codigo', '==', codigo)
        .get()
    
        if (snapshot.empty) return null

        const doc = snapshot.docs[0]
        
        return this._obtenerDeDocumento(doc)
      
      }
    
      async crear (contenido = Contenido.params) {

        const doc = this.collection.doc();
    
        await this.collection.doc(doc.id).set({
          uid: doc.id,
          codigo: contenido.codigo,
          titulo: contenido.titulo,
          texto: contenido.texto,
          foto: contenido.foto,
          tipo: contenido.tipo,
        })

        contenido.uid = doc.id
    
        return contenido
    
      }
    
      async actualizar (uid = '', datosActualizados = Contenido.params) {
        
        const doc = this.collection.doc(uid)
        
        await doc.set({
          uid: uid,
          codigo: datosActualizados.codigo,
          titulo: datosActualizados.titulo,
          texto: datosActualizados.texto,
          foto: datosActualizados.foto,
          tipo: datosActualizados.tipo,
        })
    
        return datosActualizados
    
      }
    
      async eliminar(uid = '') {
    
        await this.collection.doc(uid).delete()
    
        return true
    
      }
    
      _obtenerDeDocumento(doc) {
    
        // Retorna una instancia User desde una instancia Document de Firestore.
        const data = doc.data()
    
        return new Contenido({ 
          uid: data.uid, 
          codigo: data.codigo, 
          titulo: data.titulo, 
          texto: data.texto, 
          foto: data.foto, 
          tipo: data.tipo,
        })
      }
}

export default FirestoreContenidoRepository