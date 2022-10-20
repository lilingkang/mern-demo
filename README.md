# MERN全栈框架搭建
项目仓库：[https://github.com/lilingkang/mern-demo.git](https://github.com/lilingkang/mern-demo.git)
<a name="d4310aa4"></a>
# 创建一个项目目录
创建项目目录`mern-demo`
<a name="99df7073"></a>
# 搭建前端react框架
进入项目目录`mern-demo`，初始化前端react框架
```bash
npx create-react-app frontend
```
初始化完成后，前端项目目录格式如下<br />![](https://img2022.cnblogs.com/blog/2748903/202209/2748903-20220925155946107-287653445.png#crop=0&crop=0&crop=1&crop=1&id=u5Isn&originHeight=300&originWidth=395&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />运行
```bash
cd frontend
npm start
```
可以看到界面<br />![](https://img2022.cnblogs.com/blog/2748903/202209/2748903-20220925155423452-1320911043.jpg#crop=0&crop=0&crop=1&crop=1&height=276&id=Pj1hy&originHeight=1420&originWidth=2487&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=483)<br />关闭eslint代码检测，修改package.json中`eslintConfig`
```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest",
  ],
  "rules": {
    "no-undef": "off",
    "no-restricted-globals": "off",
    "no-unused-vars": "off"
  }
},
```
删除不需要的文件
```
frontend/src/App.css
frontend/src/App.test.js
frontend/src/logo.svg
```
清空默认主页，并简单测试<br />![](https://img2022.cnblogs.com/blog/2748903/202209/2748903-20220925162334860-1506171531.png#crop=0&crop=0&crop=1&crop=1&height=343&id=xR7jP&originHeight=936&originWidth=1655&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=606)<br />效果<br />![](https://img2022.cnblogs.com/blog/2748903/202209/2748903-20220925162428065-1518338303.png#crop=0&crop=0&crop=1&crop=1&height=280&id=Gxybv&originHeight=1420&originWidth=2487&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=491)<br />删除frontend中.git文件，将.gitignore移动到项目根路径，并两处作修改<br />![](https://img2022.cnblogs.com/blog/2748903/202209/2748903-20220925163430324-492861965.png#crop=0&crop=0&crop=1&crop=1&height=610&id=xbKp1&originHeight=931&originWidth=699&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=458)<br />其中<br />`node_modules\`用于忽略子路径下的node_modiles文件夹<br />`.env`用于忽略项目环境变量（敏感信息）<br />将整个项目用git进行管理
```bash
git init
git add .
git commit -m 'react setup'
```
<a name="14f022ec"></a>
# 搭建后端express框架
在项目根路径新建文件夹backend，进入backend运行
```bash
npm init
npm i express --save
```
创建文件及文件夹
```
backend/server.js
backend/data/
```
编写server.js
```javascript
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
```
浏览器输入`http://localhost:5000`可以看到页面输出<br />![](https://img2022.cnblogs.com/blog/2748903/202209/2748903-20220926122131753-1272005219.png#crop=0&crop=0&crop=1&crop=1&height=224&id=doHJ0&originHeight=299&originWidth=644&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=482)<br />前端利用axios请求数据
```javascript
import axios from "axios"

const fetchProducts = async () => {
    const { data } = await axios.get("/api/products")
    console.log(data)
}
fetchProducts()
```
<a name="6bba427a"></a>
# 配置开发依赖项
在项目根路径下运行
```bash
npm init
```
安装开发依赖
```bash
npm i -D nodemon concurrently
```
其中<br />nodemon可以实现服务器动态刷新<br />concurrently可以实现同时启动前后端

修改package.json(项目根路径下)
```json
{
  "name": "demo02",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "server": "nodemon backend/server",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "concurrently": "^7.4.0",
    "nodemon": "^2.0.20"
  }
}
```
<a name="309ecf60"></a>
# 搭建mongodb数据库
[mongodb官网](https://www.mongodb.com/try/download/community)下载压缩包<br />![](https://img2022.cnblogs.com/blog/2748903/202209/2748903-20220926212450510-152802707.png#crop=0&crop=0&crop=1&crop=1&height=312&id=Qv0KU&originHeight=459&originWidth=492&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=334)<br />将压缩包加压到安装路径，进入安装目录创建文件夹
```
data/db
```
进入bin目录，运行
```bash
mongod --dbpath=..\data\db
```
即可启动数据库
<a name="abf9e51c"></a>
# 后端连接并查询数据库
连接
```javascript
// server.js
import mongoose from "mongoose"

// 数据库建立并连接
var url = "mongodb://localhost:27017/mern-demo"
mongoose.connect(url)
var db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))
```
查询
```javascript
// server.js
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
```
