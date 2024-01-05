const express = require("express");
const UserClass = require("../Controllers/user");
const loginRegist = express.Router();

loginRegist.post("/regist", UserClass.register);
loginRegist.post("/login", UserClass.login);

module.exports = loginRegist;
