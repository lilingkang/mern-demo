const express = require("express")
const products = require("./data/Products")

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

app.listen(5000, console.log("服务器已经在5000端口运行..."))
