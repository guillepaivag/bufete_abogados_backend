import { request, response } from 'express'
import firebaseAuthenticationService from '../../firebase-service/firebase-authentication-service.js'

export const estaAutenticado = async (req = request, res = response, next) => {
    const { authorization } = req.headers
    
    let authToken = null
    if (authorization && authorization.split(' ')[0] === 'Bearer') authToken = authorization.split(' ')[1]
    req.body.authToken = authToken
    
    try {

        const userInfo = await firebaseAuthenticationService.verifyIdToken(authToken)
        req.body.userInfo = userInfo
        req.body.uidSolicitante = userInfo.uid

        const datosAuthSolicitante = await firebaseAuthenticationService.getUser( userInfo.uid )
        req.body.datosAuthSolicitante = datosAuthSolicitante

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }
    
}

export default { estaAutenticado }