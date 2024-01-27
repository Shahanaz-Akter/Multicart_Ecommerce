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
    buying_price: DataTypes.BIGINT,
    selling_price: DataTypes.DOUBLE,
    discount: DataTypes.INTEGER,
    product_category: DataTypes.STRING,
    primary_image: DataTypes.STRING,
    category_image: DataTypes.STRING,
    secondary_image: DataTypes.STRING,
    description: DataTypes.STRING,
    product_type: DataTypes.STRING,
    colorVariants: DataTypes.JSON,
    sizeVariants: DataTypes.JSON,
    total_qty: DataTypes.INTEGER,
    product_code: DataTypes.INTEGER,
    date: DataTypes.STRING,
    quantitys: DataTypes.JSON,
    old_price: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};