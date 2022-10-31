import React, { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import axios from "axios"
// import products from "./Products"

const HelloScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // console.log('hello')
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products")
      // console.log(data)
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HelloScreen
