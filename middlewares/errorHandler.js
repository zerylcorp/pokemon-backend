module.exports = (err, req, res, next) => {
  let errorStatus = err.status || 500;
  let errorMessage = err.message;

  // register unique email
  if (err.name === "SequelizeUniqueConstraintError") {
    errorStatus = 400;
    errorMessage = err.errors[0].message;
  }

  // register empty / null input
  if (err.name === "SequelizeValidationError") {
    errorStatus = 400;
    errorMessage = { errorType: err.errors[0].message, message: err.errors[0].validatorArgs[0].message };
  }

  // login empty / null input
  if (err.name === "InvalidLogin") {
    errorStatus = 401;
  }

  // not found product
  if (err.name === "notFoundProduct") {
    errorStatus = 404;
  }
  // not found user
  if (err.name === "notFoundUser") {
    errorStatus = 404;
  }

  // invalid access_token
  if (err.name === "invalidToken") {
    errorStatus = 401;
  }

  res.status(errorStatus).json({ error: errorStatus, message: errorMessage });
};
