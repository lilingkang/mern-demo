import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react"
import axios from "axios"

function App() {
  const [response, setResponse] = useState(1)
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post('http://api.230123.cn/v1/c/ai_contents', {
        token: 'IWN2MjwMWIEETQ',
        title: '我要睡了'
      })
      setResponse(data)
      console.log(data)
    }
    fetchData()
  }, [])
  return (
    <>
      <h1>Hello, react!</h1>
      <p>code: { response.code }</p>
      <p>msg: { response.msg }</p>
      <p>data: { JSON.stringify(response.data) }</p>
      <p>time: { new Date(response.time*1e3).toLocaleString() }</p>
    </>
  );
}

export default App;
