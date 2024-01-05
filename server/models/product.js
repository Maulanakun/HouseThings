"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.belongsTo(models.User, { foreignKey: "authorId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please input name",
          },
          notNull: {
            msg: "please input name",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please input description",
          },
          notNull: {
            msg: "please input description",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please input price",
          },
          notNull: {
            msg: "please input price",
          },
          min: {
            args: [0],
            msg: "price minimal 0",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "please input Stock",
          },
          notEmpty: {
            msg: "please input stock",
          },
        },
      },
      imgUrl: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "please input img",
          },
          notEmpty: {
            msg: "please input img",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        validate: {
          notEmpty: {
            msg: "please input categoryId",
          },
          notNull: {
            msg: "please input categoryId",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please input authorId",
          },
          notNull: {
            msg: "please input authorId",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
