const createError = require("http-errors");

const initNotFoundHandler = (app) => {
  app.use((req, _res, next) => {
    const { params, query, url } = req;

    next(createError(404, `The url requested: '${url}', is invalid.`));
  });
};

module.exports.initNotFoundHandler = initNotFoundHandler;
