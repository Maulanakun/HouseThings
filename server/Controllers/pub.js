const { Product, Category } = require("../models");
const { Op } = require("sequelize");
class PubClient {
  static async readProduct(req, res, next) {
    let { search, filter, page, sort } = req.query;

    try {
      let limit = 10;
      let options = {
        limit,
        offset: (parseInt(page) - 1) * limit || 0, // Menghitung offset dengan benar
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
          },
        ],
      };

      if (search) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      if (filter && filter !== "") {
        const query = filter.map((CategoryId) => {
          return { [Op.eq]: CategoryId };
        });
        options.where = {
          categoryId: { [Op.or]: query },
        };
      }
      console.log(options);

      if (sort !== "" && sort !== undefined) {
        if (sort.charAt(0) !== "-") {
          options.order = [[sort, "ASC"]];
        } else {
          options.order = [[sort.slice(1), "DESC"]];
        }
      }

      let { count, rows } = await Product.findAndCountAll(options);

      let result = {
        total: count,
        size: options.limit,
        totalPage: Math.ceil(count / options.limit),
        currentPage: parseInt(page) || 1,
        data: rows,
      };
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  static async readProductDetail(req, res, next) {
    try {
      const { productId } = req.params;
      let dataProduct = await Product.findByPk(productId);
      if (!dataProduct) {
        // throw new Error("not found");
      }
      res.status(200).json({ dataProduct });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PubClient;
