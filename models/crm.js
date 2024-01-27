'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Crm.init({
    logo_image: DataTypes.STRING,
    banner_image: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Crm',
  });
  return Crm;
};