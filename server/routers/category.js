const express = require("express");
const CategoryProduct = require("../Controllers/category");
const catgeory = express.Router();

catgeory.post("/category", CategoryProduct.addCategory);
catgeory.get("/category", CategoryProduct.readCategoy);
catgeory.put("/category/:CategoryId", CategoryProduct.editCategory);
catgeory.delete("/category/:CategoryId", CategoryProduct.deleteCategory);

module.exports = catgeory;
