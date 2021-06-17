const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");

// needed so that we can use a .env file
require("dotenv").config();

global.__basedir = __dirname;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const xRayFile = require("./app/models/dataSchema");

// set port, listen for requests
const PORT = process.env.PORT || 8081;

const corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

const initRoutes = require("./app/routes/xRayFile.routes");

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// we are granting access to the image folder to be accessible when a request is made
const path = require("path");
app.use(express.static(path.join(__dirname, "client", "dist")));
app.use("/public", express.static(path.join("public")));

// the value of MONGODB_URI is provided in the .env file.
// Alternatively, "mongodb://localhost:27017/coronaTest" together with the quotation marks can be used to replace process.env.MONGODB_URI.
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connection Open!!!");
  })
  .catch((e) => {
    console.log("MongoDB Connection Error!!");
    console.log(e);
  });

app.get("/", (req, res) => {
  res.send("CoronaTest app");
});

//creating a sample data to save in the database
// const sampleData = new xRayFile({name: 'Bolaji Koyi', file: 'jpeg', description: 'Sample file to test the database'});
// sampleData.save()
//     .then(()=> console.log('New data successfully saved in the database'))
//     .catch(()=> console.log('ERROR!! unable to save data in the database'))

// this is a demonstration of how we can communicate with python files from DS/AI groups
// you can paste the below url in the browser
// http://localhost:8081/name?firstname=Ram&lastname=Sharma
// app.get("/name", (req, res) => {
//   let spawn = require("child_process").spawn;
//   let process = spawn("python", [
//     "../python-files/hello.py",
//     req.query.firstname,
//     req.query.lastname,
//   ]);
//   process.stdout.on("data", (data) => {
//     res.send(data.toString());
//   });
// });

// hadling all requests that is made to the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
