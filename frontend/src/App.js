import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/products/:id" element={<ProductScreen />}></Route>
          </Routes>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
