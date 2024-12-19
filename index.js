const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { getCollections } = require("./utils/commonMethods");

const port = 6000;

const db = "mongodb+srv://Kashif:Kashif2023@cluster0.bkcuqkh.mongodb.net/revo";
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => console.log(err));

// Endpoint to fetch all collections ending with "_leads"
app.get("/collections/leads", async (req, res) => {
  try {
    const collections = await getCollections("leads");

    // Return the filtered collection names
    res.json({ data: collections });
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Failed to fetch collections" });
  }
});

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
