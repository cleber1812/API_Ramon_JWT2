'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {[   

      await queryInterface.addColumn('ImagensCarros', 'anoFabricacao', {
          allowNull: false,
          type: Sequelize.INTEGER, 
          defaultValue: '1980' 
      }),
    
      await queryInterface.addColumn('ImagensCarros', 'anoModelo', {  
          allowNull: false,
          type: Sequelize.INTEGER, 
          defaultValue: '1980'
      }),

      await queryInterface.addColumn('ImagensCarros', 'cor', {
          allowNull: false,
          type: Sequelize.STRING, 
          defaultValue: 'SemCor'
      }),
      
      await queryInterface.addColumn('ImagensCarros', 'infoAdicional', {
          allowNull: true,
          type: Sequelize.TEXT,           
      }),
      
      await queryInterface.addColumn('ImagensCarros', 'image2', {        
          allowNull: true,
          type: Sequelize.STRING           
      }),
      
      await queryInterface.addColumn('ImagensCarros', 'image3', {        
          allowNull: true,
          type: Sequelize.STRING           
      }),
      
      await queryInterface.addColumn('ImagensCarros', 'pessoa_id', {        
        allowNull: true,
        type: Sequelize.INTEGER           
      }),
      
      
    ]},
  
    down: async (queryInterface, Sequelize) => {[
      await queryInterface.removeColumn('ImagensCarros', 'anoFabricacao'), 
      await queryInterface.removeColumn('ImagensCarros', 'anoModelo'),
      await queryInterface.removeColumn('ImagensCarros', 'cor'),
      await queryInterface.removeColumn('ImagensCarros', 'infoAdicional'),
      await queryInterface.removeColumn('ImagensCarros', 'imagem2'),
      await queryInterface.removeColumn('ImagensCarros', 'imagem3'),
      await queryInterface.removeColumn('ImagensCarros', 'pessoa_id'),
    ]}
  };
