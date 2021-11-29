const mongoose = require("mongoose");

const initDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB connected");

  return connection;
};

module.exports.initDB = initDB;
