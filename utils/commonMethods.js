const mongoose = require("mongoose");

const getCollections = async (model) => {
  // Access the native MongoDB driver from Mongoose
  const db = mongoose.connection.db;

  // Get all collections in the database
  const collections = await db.listCollections().toArray();

  const regex = new RegExp(`.+_${model}$`, "i");
  // Filter collections ending with "_model"
  if (model)
    return collections
      .map((col) => col.name)
      .filter((name) => regex.test(name));

  return collections.map((col) => col.name);
};

module.exports = {
  getCollections,
};
