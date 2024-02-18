'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      thumb: {
        type: Sequelize.STRING
      },
      like: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
      },
      review_image: {
        type: Sequelize.STRING
      },
      thumbs_up: {
        type: Sequelize.INTEGER
      },
      thumbs_down: {
        type: Sequelize.INTEGER
      },
      star: {
        type: Sequelize.STRING
      },
      date: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }

};