import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Headphones className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">PodcastAI</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium">
              About
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block btn-primary inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;