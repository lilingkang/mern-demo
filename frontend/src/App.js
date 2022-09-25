import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap';
import HelloScreen from "./screens/HelloScreen";

function App() {
  return (
    <>
      <Header></Header>
      <main className="py-3">
        <Container>
          <HelloScreen></HelloScreen>
        </Container>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App;
