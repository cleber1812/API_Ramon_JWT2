'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {   
    
      await queryInterface.addColumn('ImagensCarros', 'modelo',{
          allowNull: false,
          type: Sequelize.STRING, 
          defaultValue: 'SemModelo'
        },
      )      
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('ImagensCarros', 'modelo');
      
    }
  };
