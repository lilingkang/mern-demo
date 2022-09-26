import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/products/:id" component={ProductScreen}></Route>
        </Container>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App;
