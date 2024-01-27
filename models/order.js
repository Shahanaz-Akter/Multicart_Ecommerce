'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    mobile: DataTypes.STRING,
    address: DataTypes.STRING,
    delivery_charge: DataTypes.INTEGER,
    sub_total: DataTypes.DOUBLE,
    total: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};