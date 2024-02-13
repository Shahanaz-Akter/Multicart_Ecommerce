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
        allowNull: true,

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
        allowNull: true,
      },
      primary_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secondary_image: {
        type: Sequelize.STRING(5000),
        allowNull: true,
      },
      product_type: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,


      },
      colorVariants: {
        type: Sequelize.STRING(1000),
        allowNull: true,


      },
      sizeVariants: {
        type: Sequelize.STRING(1000),
        allowNull: true,

      },
      total_qty: {
        type: Sequelize.INTEGER,
        allowNull: true,


      },
      product_code: {
        type: Sequelize.INTEGER,
        allowNull: true,

        // allowNull: false,
      },
      date: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      quantitys: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: true,


      },
      old_price: {
        type: Sequelize.DOUBLE,
        allowNull: true,

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