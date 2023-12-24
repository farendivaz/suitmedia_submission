import Navbar from "./components/Navbar";
import Ideas from "./pages/Ideas";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Career from "./pages/Career";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/career" element={<Career />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
