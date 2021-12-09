const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const Carro = sequelize.define("Carro", {
        marca: Sequelize.STRING,
        modelo: Sequelize.STRING,
        anoFabricacao: Sequelize.INTEGER,
        anoModelo: Sequelize.INTEGER,
        cor: Sequelize.STRING
    })
    return Carro
}
