const mongoose = require("mongoose");

const mongoose_connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db connected success");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose_connection;