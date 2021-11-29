const protectRoute = require("../middlewares/protected-route.middleware");
const authenticationRoutes = require("./authentication.routes");
const taskRoutes = require("./task.routes");

const initRoutes = (app) => {
  app.use("/api/auth", authenticationRoutes);
  app.use("/api/tasks", protectRoute, taskRoutes);
};

module.exports = initRoutes;
