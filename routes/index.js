var express = require("express");
var router = express.Router();
const books = require("../models/book");
const upload = require("../utils/multer").single("image");
const fs = require("fs");
const path = require("path");





/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});






router.get("/library", async function (req, res, next) {
  try {
    const allBooks = await books.find();
    res.render("library", { books: allBooks });
  } catch (error) {
    res.send(error);
  }
});





router.get("/create", function (req, res, next) {
  res.render("create");
});






router.post("/create", async (req, res, next) => {
  try {
    upload(req, res, async function (error) {
      if (error) {
        res.send(error);
        return;
      }
      const newbook = new books({ ...req.body, image:req.file.filename});
      await newbook.save();
      res.redirect("/library");
    });
    
    // res.json({ body: req.body, file: req.file });
  } catch (error) {
    res.send(error);
  }
});





router.get("/delete/:id", async function (req, res, next) {
  try {
    const book = await books.findByIdAndDelete(req.params.id);
    fs.unlinkSync(path.join(__dirname, "..", "public", "images", book.image));
    res.redirect("/library");
  } catch (error) {
    res.send(error);
  }
});





router.get("/about", function (req, res, next) {
  res.render("about");
});






router.get("/update/:id", async function (req, res, next) {
  try {
    const updateBook = await boo;
    ks.findById(req.params.id);
    res.render("update", { books: updateBook });
  } catch (error) {
    res.send(error);
  }
});






router.post("/update/:id", async function (req, res, next) {
  try {
    await books.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/library");
  } catch (error) {
    res.send(error);
  }
});





module.exports = router;
