const bycrypt = require('bcryptjs')

const helpers = {} //se crea un objeto para utilizarlo  en la encryptación

helpers.encryptPassword = async (password) => {
    const salt = await bycrypt.genSalt(10)  //salt genera codigo (semilla) aleatoria 10 veces
    const hash = await bycrypt.hash(password, salt) //toma salt y lo hace el pass encryptado
    return hash
}

helpers.decryptPassword = async (password, savedPassword) => {
    try {
        await bycrypt.compare(password, savedPassword)
    } catch (error) {
        console.log(error)
    }
}

module.exports = helpers