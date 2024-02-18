'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init({
    name: DataTypes.STRING,
    thumbs_up: DataTypes.NUMBER,
    thumbs_down: DataTypes.NUMBER,
    review_image: DataTypes.STRING,
    comments: DataTypes.STRING,
    thumb: DataTypes.STRING,
    like: DataTypes.STRING,
    star: DataTypes.STRING,
    date: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
