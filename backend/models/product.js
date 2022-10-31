import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductsSchema = new Schema({
    name: String
})

//将stuSchema映射到一个MongoDB collection并定义这个文档的构成
export default mongoose.model("products", ProductsSchema)