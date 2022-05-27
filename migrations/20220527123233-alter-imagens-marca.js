'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('ImagensCarros', 'marca', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'SemMarca' 
    })
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ImagensCarros', 'marca');
    
  }
};
