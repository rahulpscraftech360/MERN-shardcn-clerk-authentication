const mongoose = require("mongoose");

const DB = "mongodb+srv://rahul:GrXn32L6uq02SYVd@cluster0.afu5ge6.mongodb.net/";
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log("errr", err));
