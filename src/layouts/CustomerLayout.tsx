import { Link, Outlet } from 'react-router-dom';
import { Printer, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Printer className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">PrintEase</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
            <Link to="/services" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Services</Link>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">How It Works</a>
            <Link to="/track" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Track Order</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium flex items-center gap-2">
              <User size={18} /> Login
            </Link>
            <Link to="/order" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-sm hover:shadow-md">
              Start Printing
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 pb-4 px-4 space-y-3">
          <Link to="/" className="block text-gray-600 hover:text-indigo-600 font-medium py-2">Home</Link>
          <Link to="/services" className="block text-gray-600 hover:text-indigo-600 font-medium py-2">Services</Link>
          <Link to="/track" className="block text-gray-600 hover:text-indigo-600 font-medium py-2">Track Order</Link>
          <Link to="/dashboard" className="block text-gray-600 hover:text-indigo-600 font-medium py-2">Login</Link>
          <Link to="/order" className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-full font-medium mt-4">Start Printing</Link>
        </div>
      )}
    </nav>
  );
};

export default function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Printer className="h-6 w-6 text-gray-400" />
            <span className="font-bold text-lg text-gray-900">PrintEase</span>
          </div>
          <p>© 2024 PrintEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
