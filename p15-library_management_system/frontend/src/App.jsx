import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Books from "./pages/Books";
import Members from "./pages/Members";
import Borrow from "./pages/Borrow";

function App() {
  return (
    <>
    
      <Navbar />

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/members" element={<Members />} />
        <Route path="/borrow" element={<Borrow />} />
      </Routes>
    
    </>
  );
}

export default App;