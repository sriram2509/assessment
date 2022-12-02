const express = require("express");
const app = express();

//import 
require('express-async-errors');
require("dotenv/config");
require("./model/dbconfig");
require("./model/user");


// import middlewares
const cors = require("cors");
const { errorHandler } = require('./middleware/errorhandler');
const notFound = require("./middleware/notfound");

//import routes
const user = require("./router/user");
const post = require("./router/post");



// Middleware
app.use(
  cors({
    origin: "https://findcity.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/user", user);
app.use("/api/v1/post", post);

app.use(notFound); // handle invalid routes
app.use(errorHandler) // handle errors


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server Running in ${port}`));
