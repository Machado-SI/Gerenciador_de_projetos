const bcrypt = require('bcryptjs')

function isBcryptHash(str) {
    // Verefica se é do tipo string
    if(typeof str !== 'string') return false

    // Regex para validar o formado do hash bcrypt
    const bcryptRegex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/
    //Retorna true se a string corresponder ao padrão do hash, false caso contrário
    return bcryptRegex.test(str)
}

module.exports = isBcryptHash