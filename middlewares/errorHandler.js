module.exports = (err, req, res, next) => {
  let errorStatus = err.status || 500;
  let errorMessage = err.message;

  // register unique username
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
  if (["invalid-token", "invalid-login"].includes(err.name)) {
    errorStatus = 401;
  }

  // not found
  if (err.name === "not-found") {
    errorStatus = 404;
  }

  res.status(errorStatus).json({ error: errorStatus, message: errorMessage });
};
