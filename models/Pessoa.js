const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const Pessoa = sequelize.define("Pessoa", {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.STRING
    })
    return Pessoa
}
