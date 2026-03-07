import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import api from '../services/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                // Just take the first 4 for the home page feature section
                setFeaturedProducts(response.data.slice(0, 4));
            } catch (error) {
                console.error('Failed to fetch home products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full min-h-[85vh] bg-[#f9f9f9] text-neutral-900 flex flex-col justify-center px-4 sm:px-8 lg:px-16 overflow-hidden relative">
                <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 pt-20 pb-16">
                    
                    {/* Left Side: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10 animate-fade-in-up">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-bold tracking-widest uppercase mb-6">
                            New Collection 2026
                        </span>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-[1.1] text-neutral-900">
                            Stylish Bags for Every Occasion.
                        </h1>
                        
                        <p className="text-lg md:text-xl text-neutral-600 max-w-lg mb-10 font-light leading-relaxed">
                            Discover premium tote, travel, and custom printed bags designed for everyday style and unmatched durability.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                to="/products"
                                className="bg-neutral-900 text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-xl text-center flex items-center justify-center gap-2"
                            >
                                Shop Collection <span className="text-xl leading-none">&rarr;</span>
                            </Link>
                            <Link
                                to="/about"
                                className="bg-transparent border-2 border-neutral-200 text-neutral-800 px-8 py-4 rounded-full font-bold hover:bg-neutral-50 hover:border-neutral-300 transition-all text-center"
                            >
                                Explore Products
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: Featured Image */}
                    <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        {/* Decorative Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl opacity-70 -z-10"></div>
                        
                        <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-neutral-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img 
                                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop" 
                                alt="Premium Minimal Tote Bag" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Floating elements (Optional for extra premium feel) */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">✨</div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900">Bestseller</p>
                                <p className="text-xs text-neutral-500">Minimal Tote</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Category Discovery Section */}
            <section className="py-24 px-4 w-full bg-white">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <h2 className="text-4xl font-bold font-serif text-neutral-900 mb-4 text-center">Shop by Category</h2>
                    <p className="text-neutral-500 text-lg mb-12 text-center max-w-2xl">Find exactly what you're looking for by browsing our premium bag collections.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {/* Category Card 1 */}
                        <Link to="/products?category=tote-bags" className="group rounded-3xl overflow-hidden aspect-square relative shadow-lg">
                            <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop" alt="Tote Bags" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white font-bold text-2xl mb-1">Tote Bags</h3>
                                <p className="text-white/80 font-medium text-sm">Shop Now &rarr;</p>
                            </div>
                        </Link>
                        
                        {/* Category Card 2 */}
                        <Link to="/products?category=travel-bags" className="group rounded-3xl overflow-hidden aspect-square relative shadow-lg">
                            <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop" alt="Travel Bags" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white font-bold text-2xl mb-1">Travel Bags</h3>
                                <p className="text-white/80 font-medium text-sm">Shop Now &rarr;</p>
                            </div>
                        </Link>

                        {/* Category Card 3 */}
                        <Link to="/products?category=shopping-bags" className="group rounded-3xl overflow-hidden aspect-square relative shadow-lg">
                            <img src="https://plus.unsplash.com/premium_photo-1677995700946-f6ea044f5291?q=80&w=665&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Shopping Bags" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white font-bold text-2xl mb-1">Shopping Bags</h3>
                                <p className="text-white/80 font-medium text-sm">Shop Now &rarr;</p>
                            </div>
                        </Link>

                        {/* Category Card 4 */}
                        <Link to="/products?category=custom-printed-bags" className="group rounded-3xl overflow-hidden aspect-square relative shadow-lg">
                            <img src="https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600&auto=format&fit=crop" alt="Custom Printed Bags" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-white font-bold text-2xl mb-1 flex flex-wrap">Custom Printed</h3>
                                <p className="text-white/80 font-medium text-sm">Shop Now &rarr;</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Section */}
            <section className="py-24 px-4 w-full bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold font-serif text-neutral-900 mb-4">Featured Collection</h2>
                            <p className="text-neutral-500 text-lg">Our most popular and premium bags handpicked for you.</p>
                        </div>
                        <Link to="/products" className="hidden md:inline-flex items-center font-bold text-neutral-900 hover:text-neutral-600 transition-colors border-b-2 border-neutral-900 hover:border-neutral-600 pb-1">
                            View All Products &rarr;
                        </Link>
                    </div>

                    <ProductGrid products={featuredProducts} isLoading={isLoading} />

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/products" className="inline-flex items-center font-bold text-neutral-900 hover:text-neutral-600 transition-colors border-b-2 border-neutral-900 pb-1">
                            View All Products &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-24 px-4 w-full bg-white border-t border-neutral-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-serif text-neutral-900 mb-4">Why Choose Shree Bags</h2>
                        <p className="text-neutral-500 text-lg max-w-2xl mx-auto">We are committed to delivering excellence through our products and service.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div className="p-6 rounded-3xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                            <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl shadow-sm border border-neutral-100">✨</div>
                            <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                            <p className="text-neutral-500 text-sm">Crafted with the finest materials to ensure durability and lasting style.</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                            <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl shadow-sm border border-neutral-100">�</div>
                            <h3 className="text-xl font-bold mb-3">Eco Friendly</h3>
                            <p className="text-neutral-500 text-sm">Sustainable materials sourced and manufactured responsibly.</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                            <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl shadow-sm border border-neutral-100">🧵</div>
                            <h3 className="text-xl font-bold mb-3">Durable Craft</h3>
                            <p className="text-neutral-500 text-sm">Expertly stitched to withstand heavy weights and daily wear and tear.</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                            <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl shadow-sm border border-neutral-100">�</div>
                            <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
                            <p className="text-neutral-500 text-sm">Quick and secure shipping straight to your doorstep across India.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
