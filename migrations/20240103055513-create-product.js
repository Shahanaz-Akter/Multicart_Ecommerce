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
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      selling_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      discount: {
        type: Sequelize.DOUBLE,
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
        type: Sequelize.STRING(5000),
        allowNull: false,
      },
      product_type: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,

      },
      colorVariants: {
        type: Sequelize.STRING(1000),

      },
      sizeVariants: {
        type: Sequelize.STRING(1000),
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
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      price: {
        type: Sequelize.DOUBLE,

      },
      old_price: {
        type: Sequelize.DOUBLE,
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