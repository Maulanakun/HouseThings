const express = require("express");
const router = express.Router();
const category = require("./category");
const product = require("./product");
const auth = require("../middlewares/authn");
const UserClass = require("../Controllers/user");
const PubClient = require("../Controllers/pub");
const { authorizeAdmin } = require("../middlewares/authorize");

//
router.get("/pubReadProduct", PubClient.readProduct);
router.get("/pubReadProduct/:productId", PubClient.readProductDetail);

router.post("/login", UserClass.login);

router.use(auth);
router.post("/regist", authorizeAdmin, UserClass.register);
router.use(category);
router.use(product);
module.exports = router;
