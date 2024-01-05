const express = require("express");
const ProductFurniture = require("../Controllers/product");
const { authorize } = require("../middlewares/authorize");
const middlewareUpload = require("../middlewares/multer");
const product = express.Router();

product.post("/product", ProductFurniture.addProduct);
product.get("/product", ProductFurniture.readProduct);
product.get("/product/:productId", ProductFurniture.readProductDetail);
product.put("/product/:productId", authorize, ProductFurniture.updateProduct);
product.patch(
  "/product/:productId",
  middlewareUpload,
  authorize,
  ProductFurniture.updateImg
);
product.delete(
  "/product/:productId",
  authorize,
  ProductFurniture.deleteProduct
);
module.exports = product;
