"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  BookFunction,
  createBook,
  deleteBook,
} = require("./controllers/Book.controller");
const mongoose = require("mongoose");
const app = express();
const url = "mongodb://localhost:27017/Book";
const PORT = process.env.PORT || 3001;

mongoose.connect(url, { useNewUrlParser: true });
app.use(express.json());
app.use(cors());

app.get("/book", BookFunction);
app.post("/book", createBook);
app.delete("/book/:id", deleteBook);

app.get("/", (req, res) => res.status(201).send("welcome"));

app.listen(PORT, () => console.log(`listening on ${PORT}`));
