import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
      <ChakraProvider>
        <Router>
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
  );
}

export default App;
