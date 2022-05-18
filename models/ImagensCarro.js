const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const ImagensCarro = sequelize.define("ImagensCarro", {
        image: Sequelize.STRING,        
    })
    return ImagensCarro
}