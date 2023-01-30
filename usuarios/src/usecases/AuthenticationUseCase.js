// Casos de uso para el manejo de usuarios.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class AuthenticationUseCase {

  constructor (authenticationRepository) {
    this.authenticationRepository = authenticationRepository
  }

  async obtenerTodosLosUsuarios (cantidad = 1, nextPageToken = null) {
    return await this.authenticationRepository.obtenerTodosLosUsuarios(cantidad, nextPageToken)
  }

  async obtenerPorUID (uid = '') {
    return await this.authenticationRepository.obtenerPorUID(uid)
  }

  async obtenerPorCorreo (correo = '') {
    return await this.authenticationRepository.obtenerPorCorreo(correo)
  }

  async crear (correo = '', contrasena = '') {
    return await this.authenticationRepository.crear(correo, contrasena)
  }

  async actualizar (uid = '', usuarioAuth = {}) {
    await this.authenticationRepository.actualizar(uid, usuarioAuth)
  }

  async actualizarCustomClaims (uid = '', claims = {}) {
    await this.authenticationRepository.actualizarCustomClaims(uid, claims)
  }

  async eliminar (uid = '') {
    await this.authenticationRepository.eliminar(uid)
  }

}

export default AuthenticationUseCase