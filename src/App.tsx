import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./layouts";
import Cart from "./pages/Cart.page";
import Home from "./pages/Home.page";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
