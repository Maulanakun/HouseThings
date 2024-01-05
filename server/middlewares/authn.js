const { decode } = require("../helpers/jwt");

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error("please login first");
    }
    let authen = authorization.split(" ")[1];
    console.log(authen);
    const { id, email, role } = decode(authen);
    req.loginInfo = { id, email, role };
    next();
  } catch (error) {
    let code = 500;
    let msg = "INTERNAL SERVER ERROR";
    if (error.message === "please login first") {
      code = 401;
      msg = "please login first";
    }
    next(error);
  }
};
module.exports = auth;
