const { Category } = require("../models");
class CategoryProduct {
  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      let data = await Category.create({ name });
      if (!data) {
        throw new Error("create category failed");
      }
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }
  static async readCategoy(req, res, next) {
    try {
      let categories = await Category.findAll();
      Category.find()
      if (!categories) {
        throw new Error("data not found");
      }
      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }
  static async editCategory(req, res, next) {
    const { CategoryId } = req.params;
    const { name } = req.body;
    try {
      let category = await Category.findByPk(CategoryId);
      if (!category) {
        throw new Error("data not found");
      }
      let categoryEdit = await category.update(
        {
          name,
        },
        {
          where: {
            id: CategoryId,
          },
        }
      );
      res.status(201).json(categoryEdit);
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    const { CategoryId } = req.params;
    try {
      let category = await Category.findByPk(CategoryId);
      if (!category) {
        throw new Error("data not found");
      }
      await category.destroy({
        where: {
          id: CategoryId,
        },
      });
      res.status(201).json({ message: `${category.name} success delete` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = CategoryProduct;
