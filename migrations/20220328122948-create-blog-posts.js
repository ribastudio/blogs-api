'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createPostsCategories = await queryInterface.createTable('PostsCategories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        // autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
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
        unique: true,
        allowNull: false,
        foreignKey: true,
      },
      updated: {
        type: Sequelize.DATE,
        unique: true,
        allowNull: false,
        foreignKey: true,
      },

    });

// { 
//   "id": 21,
//   "title": "Latest updates, August 1st",
//   "content": "The whole text for the blog post goes here in this key",
//   "userId": 14, // esse é o id que referência usuário que é o autor do post
//   "published": "2011-08-01T19:58:00.000Z",
//   "updated": "2011-08-01T19:58:51.947Z",
// }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};
