if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { User } = require("../models");
const { compHash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
class UserClass {
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        email,
        password,
        role: "staff",
        phoneNumber,
        address,
      });
      res.status(201).json({
        msg: `user id ${user.id} success created`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (email === "") {
        throw new Error("please input email");
      }
      if (password === "") {
        throw new Error("please input password");
      }
      if (!password || !email) {
        throw new Error("please Input email or password");
      }
      // console.log(req.body);
      let data = await User.findOne({
        where: {
          email,
        },
      });
      if (!data) {
        throw new Error("INVALID EMAIL/PASSWORD");
      }
      const validatePassword = compHash(password, data.password);
      if (!validatePassword) {
        throw new Error("INVALID EMAIL/PASSWORD");
      }
      const token = signToken({ id: data.id, email, role: data.role });
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserClass;
