import express from "express"
import products from "./data/Products.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
import Product from "./models/product.js"

// 数据库建立并连接
var url = "mongodb://localhost:27017/mern-demo"
mongoose.connect(url)
var db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

// console.log(products.map((product) => ({name: product.name})))
products.map((product) => {
  Product.find({ name: product.name }, (err, docs) => {
    if (!err && !docs.length) {
      Product.create({ name: product.name }, (err, docs) => {
        if (!err) {
          console.log("成功插入:\n" + docs)
        }
      })
    }
  })
})

dotenv.config()

const app = express()

app.get("/", (req, res) => {
  res.send("server running...")
})

app.get("/api/products", (req, res) => {
  Product.find((err, docs) => {
    if (!err) {
      console.log("查询到记录:\n" + docs)
      res.json(docs)
    }
  })
  // res.json(products)
})

app.get("/api/products/:id", (req, res) => {
  Product.findById(req.params.id, (err, docs) => {
    if (!err) {
      console.log("查询到记录:\n" + docs)
      res.json(docs)
    }
  })
  // const product = products.find((product) => product._id === req.params.id)
  // res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `服务器已经以${process.env.NODE_ENV}模式在${process.env.PORT}端口运行...`
  )
)
