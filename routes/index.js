var express = require("express");
var router = express.Router();
const books = require("../models/book");
const upload = require("../utils/multer").single("image");

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

router.post("/create", upload, async function (req, res, next) {

  try {
    const newbook = new books({...req.body, image:req.file.filename})
    // res.json({ body: req.body, file: req.file });
    await newbook.save()
    res.redirect("/library",)
  } catch (error) {
    res.send(error);
  }
});

router.get("/delete/:id", async function (req, res, next) {
  try {
    await books.findByIdAndDelete(req.params.id);
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
    const updateBook = await books.findById(req.params.id);
    res.render("update", { books: updateBook });
  } catch (error) {}
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
