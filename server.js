"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const BookFunction = require("./controllers/Book.controller");
const mongoose = require("mongoose");
const app = express();
const url = "mongodb://localhost:27017/Book";
const PORT = process.env.PORT || 3001;

mongoose.connect(url, { useNewUrlParser: true });
app.use(cors());

app.get("/book", BookFunction);

// TODO:
// STEP 1: get the jwt from the headers
// STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
// jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
// STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

const router = express.Router();

app.listen(PORT, () => console.log(`listening on ${PORT}`));
