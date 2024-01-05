const imagekit = require("../middlewares/imgkit");
const { Product, User, Category } = require("../models");

class ProductFurniture {
  static async addProduct(req, res, next) {
    try {
      const { name, description, price, stock, imgUrl, categoryId, authorId } =
        req.body;
      // console.log(price);
      let addData = await Product.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        authorId,
      });
      if (!addData) {
        throw new Error("create product failed");
      }
      res.status(201).json({ addData });
    } catch (error) {
      next(error);
    }
  }
  static async readProduct(req, res, next) {
    try {
      let dataProduct = await Product.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Category,
          },
        ],
      });
      res.status(200).json({ dataProduct });
    } catch (error) {
      next(error);
    }
  }
  static async readProductDetail(req, res, next) {
    try {
      const { productId } = req.params;
      let dataProduct = await Product.findByPk(productId);
      if (!dataProduct) {
        throw new Error("not found");
      }
      res.status(200).json({ dataProduct });
    } catch (error) {
      next(error);
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const { name, description, price, stock, imgUrl, categoryId, authorId } =
        req.body;
      let dataProduct = await Product.findByPk(productId);
      if (!dataProduct) {
        throw new Error("not found");
      }
      let dataUpdated = await dataProduct.update(
        {
          name,
          description,
          price,
          stock,
          imgUrl,
          categoryId,
          authorId,
        },
        {
          where: {
            id: productId,
          },
        }
      );

      res.status(200).json({ dataProduct });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const { productId } = req.params;
      let dataProduct = await Product.findByPk(productId);
      let nameProduct = dataProduct.name;
      if (!dataProduct) {
        throw new Error("not found");
      }
      await dataProduct.destroy({
        where: {
          id: productId,
        },
      });
      res.status(200).json({ message: `${nameProduct} success delete` });
    } catch (error) {
      next(error);
    }
  }
  static async updateImg(req, res, next) {
    try {
      const { productId } = req.params;
      if (!req.file) {
        throw new Error("please input image");
      }
      const base64 = req.file.buffer.toString("base64");
      let found = await Product.findByPk(productId);
      if (!found) {
        throw new Error("not found");
      }
      let response = await imagekit.upload({
        file: base64,
        fileName: req.file.originalname,
      });
      console.log(response);
      let dataUpdate = await Product.update(
        {
          imgUrl: response.url,
        },
        {
          where: {
            id: productId,
          },
        }
      );
      res
        .status(200)
        .json({ message: `image ${found.name} success to update` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = ProductFurniture;
