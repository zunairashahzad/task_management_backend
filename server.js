const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { initDB } = require("./config/init-db");
const { initErrorHandler } = require("./config/init-error-handler");
const initRoutes = require("./routes");
const { initPassport } = require("./config/init-passport");
const { initNotFoundHandler } = require("./config/init-not-found-handler");

initDB()
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use(cors());

    initPassport(app);

    initRoutes(app);

    initNotFoundHandler(app);

    initErrorHandler(app);

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server running on port: ${port}`));
  })
  .catch((error) =>
    console.error(`an error occurred configuring express application`, error)
  );
