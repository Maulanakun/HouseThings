"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "email has been used",
        },
        validate: {
          notNull: {
            msg: "please input email",
          },
          notNull: {
            msg: "please input email",
          },
          isEmail: {
            msg: "type input only email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "passwrod can't be empty",
          },
          notNull: {
            msg: "passwrod can't be null",
          },
          len: {
            args: 5,
            msg: "Must 5 Character",
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    let hashync = hash(user.password);
    user.password = hashync;
  });
  return User;
};
