const mongoose = require('mongoose')


const bookModel = mongoose.Schema({
    bookname:String,
    image:String,
    author:String,
    price:Number,
    description:String
})



const books = mongoose.model("book", bookModel)


module.exports = books