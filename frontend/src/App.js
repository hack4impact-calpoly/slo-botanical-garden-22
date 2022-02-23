import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Home from "./components/Home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*function App() {
  return (
    <>
      <button onClick={() => fetchDataFormDynamoDb()}> Fetch </button>
      <button onClick={() => addDataToDynamoDB()}> Put </button>;
    </>
  );
} */

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
