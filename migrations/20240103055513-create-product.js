'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      buying_price: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      selling_price: {
        type: Sequelize.BIGINT,
        allowNull: false,

      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true,

      },
      product_category: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      primary_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      secondary_image: {
        type: Sequelize.JSON,
        allowNull: false,

      },
      product_type: {
        type: Sequelize.STRING,

      },
      description: {
        type: Sequelize.STRING,

      },
      colorVariants: {
        type: Sequelize.JSON,

      },
      sizeVariants: {
        type: Sequelize.JSON,

      },
      total_qty: {
        type: Sequelize.INTEGER,

      },
      product_code: {
        type: Sequelize.INTEGER,
        // allowNull: false,

      },
      date: {
        type: Sequelize.STRING,

      },
      quantitys: {
        type: Sequelize.JSON,
        allowNull: true,

      },
      price: {
        type: Sequelize.INTEGER,

      },
      old_price: {
        type: Sequelize.INTEGER,

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
    await queryInterface.dropTable('Products');
  }
};