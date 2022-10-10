const mongoose = require("mongoose");
const config = require("./config");
const dbURL = config.db.url;

//database connection
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
