import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <header className="bg-white shadow-md relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">MediCare</span>
            </Link>

            {/* Mobile menu button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link to="/doctors" className="text-gray-600 hover:text-blue-600">Doctors</Link>
              <Link to="/hospitals" className="text-gray-600 hover:text-blue-600">Hospitals</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
            </nav>
          </div>

          {/* Mobile Navigation */}
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50`}>
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/doctors" className="text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Doctors</Link>
              <Link to="/hospitals" className="text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Hospitals</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </div>
          </nav>
        </div>
      </header>
  );
}