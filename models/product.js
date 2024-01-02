'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    product_category: DataTypes.STRING,
    buying_price: DataTypes.INTEGER,
    selling_price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    primary_image: DataTypes.STRING,
    secondary_image: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.STRING,
    colorVariants: DataTypes.ARRAY(DataTypes.STRING),
    sizeVariants: DataTypes.ARRAY(DataTypes.STRING),
    total_qty: DataTypes.INTEGER,
    product_code: DataTypes.INTEGER,
    date: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};