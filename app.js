require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET, POST, DELETE, PUT, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((req,res,next) => {
  console.log(req.url, req.method, req.ip);
  next();
})

app.use((req, res, next) =>{
	res.json({
		message: "Hello World"
	})
});

app.listen(process.env.PORT || 8080);
