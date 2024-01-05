const { Product } = require("../models");
const authorize = async (req, res, next) => {
  try {
    // console.log(req.loginInfo);
    const { id, role } = req.loginInfo;
    if (role !== "admin") {
      const { productId } = req.params;
      let foundProduct = await Product.findByPk(productId);
      // console.log(foundProduct, productId, id);
      if (!foundProduct) {
        throw new Error("not found");
      }

      if (foundProduct.authorId !== id) {
        throw new Error("forbidden");
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
const authorizeAdmin = async (req, res, next) => {
  try {
    const { id, role } = req.loginInfo;
    if (role !== "admin") {
      throw new Error("forbidden");
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { authorize, authorizeAdmin };
