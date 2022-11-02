const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config"); //Configuring dotenv to store Database password and user in env file
const bodyparser = require("body-parser");
const cors = require("cors");

//Import routes
const authRoute = require("./routes/authentication");
const postRoute = require("./routes/post");

//Importing middleware
app.use(cors());
app.use(bodyparser.json());
app.use("/api/user", authRoute);
app.use("/posts", postRoute);

//Connection to Mongo DB
//Add DB connection link in .env file
// DB_CONNECTION = mongodb+srv://<user>:<password>@cluster0.yoz9w.mongodb.net/<DbName>?retryWrites=true&w=majority
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("DB Connected");
  }
);

//Server listen
app.listen(3500, () => {
  console.log("Server Started");
});
