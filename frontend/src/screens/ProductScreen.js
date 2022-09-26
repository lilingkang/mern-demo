import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const ProductScreen = () => {
  const [product, setProduct] = useState({})
  const params = useParams() // 路由传参
  const {id} = params
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [id])
  return <div>{product.name} 产品详情</div>
}

export default ProductScreen
