import AddBookModal from "@/pages/AddBookModal";
import { Menu, X } from "lucide-react"; // You can also use other icons if you prefer
import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <div className="flex-shrink-0 text-xl font-bold text-blue-600">
              Book Manager
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden ml-5 md:flex md:justify-center md:items-center space-x-6">
            <Link to="books" className="text-gray-700 hover:text-blue-600">
              Books
            </Link>
            <Link to="borrow" className="text-gray-700 hover:text-blue-600">
              Borrow
            </Link>

            <AddBookModal />
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2">
          <Link to="books" className="block text-gray-700 hover:text-blue-600">
            Books
          </Link>
          <Link to="borrow" className="block text-gray-700 hover:text-blue-600">
            Borrow
          </Link>
          <AddBookModal />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
