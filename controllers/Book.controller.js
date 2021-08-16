const mongoose = require("mongoose");
const BookModel = require("../models/Book.model");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const BookFunction = (req, res) => {
  const Book = mongoose.model("Book", BookModel);
  const client = jwksClient({
    jwksUri: ` https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });
  /*  const mamoon = new Book({
      title: "mamoon",
      desc: "This Book is for student of Physics",
      status: "On Stock",
      email: "Mamoon.husen1006@gmail.com",
    });
    const ahmad = new Book({
      title: "ahmad",
      desc: "This Book is for  Developer",
      status: "On Stock",
      email: "example@gmail.com",
    });
    const user = new Book({
      title: "user",
      desc: "This Book is for user",
      status: "Sold",
      email: "user@gmail.com",
    });
    let Books = { mamoon, ahmad, user };
    mamoon.save();
    ahmad.save();
    user.save();*/
  const getKey = (header, callback) => {
    client.getSigningKey(header.kid, function (err, key) {
      // @ts-ignore
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  };
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      res.send("invalid token");
    }
    let Books = Book.find({});
    Book.find({}, (err, value) => {
      res.send(value);
    });
  });
};

module.exports = BookFunction;
