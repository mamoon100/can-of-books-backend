const mongoose = require("mongoose");
const BookModel = require("../models/Book.model");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const BookFunction = (req, res) => {
  const client = jwksClient({
    jwksUri: ` https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });
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
    BookModel.find({}, (err, value) => {
      res.send(value);
    });
  });
};

const createBook = (req, res) => {
  const client = jwksClient({
    jwksUri: ` https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });
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
      res.status(500).send("invalid token");
    }
    let newBook = new BookModel({
      title: req.body.title,
      desc: req.body.desc,
      status: req.body.status,
      email: req.body.email,
    });
    newBook
      .save()
      .then(() => {
        BookModel.find({}, (err, value) => {
          if (err) {
            res.status(400).send("please check for the requirement data");
          }
          res.status(201).send(value);
        });
      })
      .catch((err) => {
        res.status(400).send("check the input data maybe check the email");
      });
  });
};

const deleteBook = (req, res) => {
  const client = jwksClient({
    jwksUri: ` https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });
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
      res.status(500).send("invalid token");
    }
    BookModel.findByIdAndDelete(req.params.id, (error, item) => {
      if (error) {
        res.status(404).send("item not found");
      } else {
        BookModel.find({}, (errors, items) => {
          if (errors) {
            res.status(500).send("There Was a problem with the server");
          } else {
            res.status(201).send(items);
          }
        });
      }
    });
    // .then(() => {
    //   BookModel.find({}, (error, items) => {
    //     if (error) {
    //       res.status(500).send("there is an error from the server");
    //     }
    //     res.status(201).send(items);
    //   });
    // });
  });
};

module.exports = { BookFunction, createBook, deleteBook };
