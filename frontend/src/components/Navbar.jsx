import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Navbar = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" onClick={handleScrollToTop} className="flex items-center gap-2">
                        <ShoppingBag className="h-8 w-8 text-neutral-900" />
                        <span className="font-bold text-xl tracking-tight">Shree Bags</span>
                    </Link>
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" onClick={handleScrollToTop} className="text-neutral-600 hover:text-neutral-900 transition-colors">Home</Link>
                        <Link to="/products" onClick={handleScrollToTop} className="text-neutral-600 hover:text-neutral-900 transition-colors">Products</Link>
                        <Link to="/about" onClick={handleScrollToTop} className="text-neutral-600 hover:text-neutral-900 transition-colors">About</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
