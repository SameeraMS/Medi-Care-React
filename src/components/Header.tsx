import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Menu, X, LogIn, LogOut, ChevronDown, Stethoscope} from 'lucide-react';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('email')) {
            setUser({ email: localStorage.getItem('email')!, name: localStorage.getItem('email')!.split('@')[0] });
        }
    }, []);

  const handleAuthSuccess = (userData: { email: string; name: string }) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowProfileMenu(false);
    localStorage.clear()
  };

  return (
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">MediCare</span>
            </Link>

            {/* Mobile menu button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-blue-600" /> : <Menu className="h-6 w-6 text-blue-600" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link to="/doctors" className="text-gray-600 hover:text-blue-600">Doctors</Link>
              <Link to="/hospitals" className="text-gray-600 hover:text-blue-600">Hospitals</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>

              {user && (
                  <Link
                      to="/appointment"
                      className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <span>My Appointments</span>
                  </Link>
              )}

              {user ? (
                  <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                      </div>
                      <span>{user.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-red-700 hover:bg-red-600 rounded-md shadow-lg py-1 z-50">
                          <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-sm text-white"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                          </button>
                        </div>
                    )}
                  </div>
              ) : (
                  <button
                      onClick={() => setShowAuthModal(true)}
                      className="flex items-center space-x-2 text-white bg-blue-950 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </button>
              )}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 right-0 bg-blue-950 p-4 opacity-95 shadow-lg z-50 rounded-2xl`}>
            <div className="flex flex-col space-y-7 p-4 items-center">
              <Link to="/" className="text-white hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/doctors" className="text-white hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Doctors</Link>
              <Link to="/hospitals" className="text-white hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Hospitals</Link>
              <Link to="/about" className="text-white hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="text-white hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>

              {user && (
                  <Link
                      to="/appointment"
                      className="flex items-center text-white hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                  >
                    <span>My Appointments</span>
                  </Link>
              )}

              {user ? (
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 px-2 mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                      </div>
                      <span className="text-white">{user.name}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center mt-3 w-full px-2 py-2 text-white bg-red-700 hover:bg-red-600 rounded-md"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
              ) : (
                  <button
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-blue-950 hover:text-white bg-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </button>
              )}
            </div>
          </nav>
        </div>

        {showAuthModal && (
            <AuthModal
                onClose={() => setShowAuthModal(false)}
                onSuccess={handleAuthSuccess}
            />
        )}
      </header>
  );
}