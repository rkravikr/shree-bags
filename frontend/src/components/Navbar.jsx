import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/custom-printing', label: 'Custom Printing' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavClick = () => {
        handleScrollToTop();
        setIsMobileMenuOpen(false);
    };

    const isActiveLink = (to) => {
        if (to === '/') {
            return location.pathname === '/';
        }
        return location.pathname === to || location.pathname.startsWith(`${to}/`);
    };

    return (
        <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-neutral-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" onClick={handleNavClick} className="flex items-center gap-2">
                        <ShoppingBag className="h-8 w-8 text-neutral-900" />
                        <span className="font-bold text-lg sm:text-xl tracking-tight">Shree Bags</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => {
                            const active = isActiveLink(item.to);
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={handleNavClick}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        active
                                            ? 'text-neutral-900 bg-neutral-100'
                                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4 pt-2 border-t border-neutral-200">
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => {
                                const active = isActiveLink(item.to);
                                return (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        onClick={handleNavClick}
                                        className={`px-3 py-2.5 rounded-lg transition-colors ${
                                            active
                                                ? 'bg-neutral-900 text-white font-medium'
                                                : 'text-neutral-700 hover:bg-neutral-100'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
