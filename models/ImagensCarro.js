const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const ImagensCarro = sequelize.define("ImagensCarro", {
        image: Sequelize.STRING,        
        marca: Sequelize.STRING,
        modelo: Sequelize.STRING,
        anoFabricacao: Sequelize.INTEGER, 
        anoModelo: Sequelize.INTEGER, 
        cor: Sequelize.STRING, 
        infoAdicional: Sequelize.TEXT,           
        image2: Sequelize.STRING,           
        image3: Sequelize.STRING,          
        pessoa_id: Sequelize.INTEGER, 
    })
    return ImagensCarro
}