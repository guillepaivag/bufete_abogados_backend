


const middlewares = {}

middlewares.validacionCrearContenido = async (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos


        next()
    } catch (error){
        next(error)
    }
}

export default middlewares