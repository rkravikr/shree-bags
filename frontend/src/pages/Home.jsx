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
                // Just take the first 3 for the home page feature section
                setFeaturedProducts(response.data.slice(0, 3));
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
            <section className="w-full min-h-[80vh] bg-gradient-to-b from-neutral-900 to-neutral-800 text-white flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
                {/* Abstract Background Element */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500 blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500 blur-[120px]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
                    <span className="block text-sm md:text-base font-medium tracking-[0.2em] uppercase text-neutral-400 mb-4">Shree Bags Collection</span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif mb-6 leading-tight">
                        Carry Confidence. <br /> Carry Style.
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 font-light">
                        Premium craftsmanship meets modern design in our latest collection of everyday essentials and travel companions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/products"
                            className="bg-white text-neutral-900 px-8 py-4 rounded-full font-medium hover:bg-neutral-100 transition-all hover:scale-105 active:scale-95 shadow-xl w-full sm:w-auto text-center"
                        >
                            Shop Collection
                        </Link>
                        <Link
                            to="/about"
                            className="bg-transparent border border-neutral-600 text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-800 transition-all hover:border-neutral-400 w-full sm:w-auto text-center"
                        >
                            Our Story
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Section */}
            <section className="py-24 px-4 w-full bg-neutral-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold font-serif text-neutral-900 mb-4">New Arrivals</h2>
                            <p className="text-neutral-500 text-lg">Discover the latest additions to our store.</p>
                        </div>
                        <Link to="/products" className="hidden md:inline-flex items-center font-medium text-neutral-900 hover:text-neutral-600 transition-colors border-b border-neutral-900 hover:border-neutral-600 pb-1">
                            View All Products &rarr;
                        </Link>
                    </div>

                    <ProductGrid products={featuredProducts} isLoading={isLoading} />

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/products" className="inline-flex items-center font-medium text-neutral-900 hover:text-neutral-600 transition-colors border-b border-neutral-900 pb-1">
                            View All Products &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 px-4 w-full bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="p-6">
                        <div className="w-16 h-16 bg-neutral-100 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl">✨</div>
                        <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                        <p className="text-neutral-500">Crafted with the finest materials to ensure durability and lasting style.</p>
                    </div>
                    <div className="p-6">
                        <div className="w-16 h-16 bg-neutral-100 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl">🌍</div>
                        <h3 className="text-xl font-bold mb-3">Sustainable</h3>
                        <p className="text-neutral-500">Ethically sourced and responsibly manufactured for a better tomorrow.</p>
                    </div>
                    <div className="p-6">
                        <div className="w-16 h-16 bg-neutral-100 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl">🚚</div>
                        <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
                        <p className="text-neutral-500">Quick and secure shipping straight to your doorstep across India.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
