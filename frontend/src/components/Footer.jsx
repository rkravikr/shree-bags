import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-neutral-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                        Shree Bags
                    </h3>
                    <p className="text-sm">Premium quality bags for every occasion.</p>
                </div>
                <div>
                    <h4 className="text-white outline-none mb-4 font-semibold">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/products" className="hover:text-white transition-colors">Our Collection</a></li>
                        <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white outline-none mb-4 font-semibold">Contact</h4>
                    <p className="text-sm">Email: info@shreebags.com</p>
                    <p className="text-sm mt-2">Phone: +91 1234567890</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-800 text-sm text-center">
                &copy; {new Date().getFullYear()} Shree Bags. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
