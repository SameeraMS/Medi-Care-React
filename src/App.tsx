import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import HospitalsPage from './pages/HospitalsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DoctorsPage from "./pages/DoctorsPage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import Appointments from "./pages/Appointments";

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/hospitals" element={<HospitalsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/appointment" element={<Appointments />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;