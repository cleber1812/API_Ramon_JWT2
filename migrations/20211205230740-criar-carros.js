'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  
    
     await queryInterface.createTable('Carros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER 

      },
      marca: {
        allowNull: false,
        type: Sequelize.STRING 
      },
      modelo: {
        allowNull: false,
        type: Sequelize.STRING 
      },
      anoFabricacao: {
        allowNull: false,
        type: Sequelize.INTEGER 
      },
      anoModelo: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
