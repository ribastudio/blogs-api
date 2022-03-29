'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createBlogPosts = await queryInterface.createTable('BlogPosts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        // autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        // unique: true,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        // unique: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        // unique: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      published: {
        type: Sequelize.DATE,
        // unique: true,
        allowNull: false,
        foreignKey: true,
      },
      updated: {
        type: Sequelize.DATE,
        // unique: true,
        allowNull: false,
        foreignKey: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
