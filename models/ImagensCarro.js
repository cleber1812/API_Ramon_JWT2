const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const ImagensCarro = sequelize.define("ImagensCarro", {
        image: Sequelize.STRING,        
        marca: Sequelize.STRING,
    })
    return ImagensCarro
}