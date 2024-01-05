const errHandling = (err, req, res, next) => {
  let code = 500;
  let msg = "INTERNAL_SERVER_ERROR";
  if (err.message === "please input image") {
    code = 400;
    msg = "please input image";
  }
  if (err.message === "please login first") {
    code = 401;
    msg = "please login first";
  }
  if (err.message === "please input email") {
    code = 401;
    msg = "please input email";
  }
  if (err.message === "please input password") {
    code = 401;
    msg = "please input password";
  }
  if (err.name === "JsonWebTokenError") {
    code = 400;
    msg = "invalid token";
  }
  if (err.message === "please Input email or password") {
    code = 401;
    msg = "please Input email or password";
  }
  if (err.message === "INVALID EMAIL/PASSWORD") {
    code = 401;
    msg = "INVALID EMAIL/PASSWORD";
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = "email already exist";
  }
  if (err.name === "SequelizeDatabaseError") {
    code = 400;
    msg = err.message;
  }
  if (err.name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors[0].message;
  }
  if (err.message === "data not found") {
    code = 404;
    msg = "data not found";
  }

  if (err.message === "not found") {
    code = 404;
    msg = "not found";
  }

  if (err.message === "forbidden") {
    code = 403;
    msg = "forbidden";
  }
  console.log(err);
  res.status(code).json({
    code,
    msg,
  });
};

module.exports = errHandling;
