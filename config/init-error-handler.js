const initErrorHandler = (app) => {
  app.use((err, _req, res, next) => {
    // headers are already sent
    if (res.headersSent) {
      return next(err);
    }

    const response = {
      code: err.status || 500,
      message: err.message,
      success: err.success || false,
      ...err.properties,
    };

    console.error(err.message || "an abnormal error occurred");

    res.status(err.status || 500).json(response);
  });
};

module.exports.initErrorHandler = initErrorHandler;
