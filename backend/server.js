import express from "express"
import products from "./data/Products.js"
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get("/", (req, res) => {
  res.send("server running...")
})

app.get("/api/products", (req, res) => {
  res.json(products)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`服务器已经以${process.env.NODE_ENV}模式在${process.env.PORT}端口运行...`))
