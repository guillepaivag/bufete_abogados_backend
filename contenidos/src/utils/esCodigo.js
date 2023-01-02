
function esCodigo (cadena) {
    return /^[a-zA-Z0-9-]+$/.test(cadena)
}

module.exports = esCodigo