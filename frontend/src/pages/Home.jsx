import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { Leaf, ShieldCheck, Truck, Palette, MessageCircleMore, Factory, PackageCheck, Quote } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ProductGrid from '../components/ProductGrid';
import api from '../services/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                // Show only the top 12 items on the home featured section
                setFeaturedProducts(response.data.slice(0, 12));
            } catch (error) {
                console.error('Failed to fetch home products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const trustItems = [
        {
            title: 'Premium Quality',
            description: 'Crafted with reliable materials to ensure durability and lasting style.',
            Icon: ShieldCheck,
        },
        {
            title: 'Eco Friendly',
            description: 'Sustainable materials sourced and manufactured responsibly.',
            Icon: Leaf,
        },
        {
            title: 'Custom Branding',
            description: 'High-quality logo printing and personalized bag styling for businesses.',
            Icon: Palette,
        },
        {
            title: 'Fast Delivery',
            description: 'Quick and secure dispatch across India for retail and bulk orders.',
            Icon: Truck,
        },
    ];

    const processSteps = [
        {
            title: 'Choose Products',
            description: 'Pick bag styles, materials, and quantity that suit your business needs.',
            Icon: PackageCheck,
        },
        {
            title: 'Share Requirements',
            description: 'Tell us your custom branding and order details on WhatsApp.',
            Icon: MessageCircleMore,
        },
        {
            title: 'We Manufacture',
            description: 'Our team handles production with strict quality checks at every stage.',
            Icon: Factory,
        },
        {
            title: 'Doorstep Delivery',
            description: 'Your bags are packed and delivered safely with transparent updates.',
            Icon: Truck,
        },
    ];

    const testimonials = [
        {
            name: 'Rajesh Sharma',
            role: 'Retail Store Owner, Delhi',
            quote: 'Excellent quality bags and timely service. The print finish is sharp and customers love the look.',
        },
        {
            name: 'Priya Patel',
            role: 'Event Planner, Mumbai',
            quote: 'We have placed repeat orders for events and the consistency has been impressive every single time.',
        },
        {
            name: 'Amit Gupta',
            role: 'Grocery Chain, Jaipur',
            quote: 'Very professional team, competitive pricing, and smooth bulk delivery experience.',
        },
        {
            name: 'Sneha Verma',
            role: 'Boutique Owner, Pune',
            quote: 'Custom branding quality is top-notch. The bags look premium and match our store identity perfectly.',
        },
        {
            name: 'Nikhil Jain',
            role: 'Corporate Procurement, Gurugram',
            quote: 'Bulk order handling was smooth from sampling to delivery. Communication was clear throughout.',
        },
        {
            name: 'Farah Khan',
            role: 'Cafe Founder, Hyderabad',
            quote: 'We switched to Shree Bags for eco-friendly packaging and got great feedback from customers instantly.',
        },
    ];

    const scrollingTestimonials = [...testimonials, ...testimonials];

    return (
        <div className="relative w-full flex flex-col items-center overflow-hidden bg-gradient-to-b from-[#f7faf6] via-[#f3f8f6] to-[#f5f7fb]">
            <div className="pointer-events-none absolute inset-0 opacity-70">
                <div className="absolute -top-20 -left-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"></div>
                <div className="absolute top-[28%] -right-24 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl"></div>
                <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-100/35 blur-3xl"></div>
            </div>
            {/* Hero Section */}
            <section className="w-full min-h-[58vh] lg:min-h-[85vh] bg-gradient-to-b from-[#f7f8f5]/85 via-[#f6f4ef]/80 to-[#f8f8f8]/70 text-neutral-900 flex flex-col justify-center px-4 sm:px-8 lg:px-16 overflow-hidden relative pt-4 sm:pt-8 lg:pt-0">
                <div className="pointer-events-none absolute inset-0 opacity-60">
                    <div className="absolute -top-16 right-0 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20 py-8 lg:py-24">
                    
                    {/* Left Side: Content */}
                    <Tilt
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        perspective={1000}
                        transitionSpeed={2000}
                        scale={1.02}
                        className="w-full lg:w-1/2 z-10 animate-fade-in-up mt-5 lg:mt-0 flex flex-col justify-center lg:min-h-[620px]"
                    >
                        <div className="flex flex-col items-center justify-center text-center py-6 sm:py-10 lg:py-24" style={{ transformStyle: 'preserve-3d' }}>
                            <span 
                                className="inline-block px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-neutral-900 text-white text-[10px] lg:text-xs font-bold tracking-widest uppercase mb-6 lg:mb-8 transition-transform duration-300"
                                style={{ transform: 'translateZ(30px)' }}
                            >
                                New Collection 2026
                            </span>
                            
                            <h1 
                                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-5 lg:mb-8 leading-[1.1] text-neutral-900 transition-transform duration-300 drop-shadow-sm"
                                style={{ transform: 'translateZ(60px)' }}
                            >
                                Stylish Bags for Every Occasion.
                            </h1>
                            
                            <p 
                                className="text-sm sm:text-lg md:text-xl text-neutral-600 max-w-lg mx-auto mb-8 lg:mb-12 font-light leading-relaxed transition-transform duration-300"
                                style={{ transform: 'translateZ(40px)' }}
                            >
                                Discover premium tote, travel, and custom printed bags designed for everyday style and unmatched durability.
                            </p>
                            
                            <div 
                                className="flex flex-col sm:flex-row gap-3 lg:gap-6 w-full sm:w-auto transition-transform duration-300 mb-6 lg:mb-12"
                                style={{ transform: 'translateZ(50px)' }}
                            >
                                <Link
                                    to="/products"
                                    className="bg-neutral-900 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-bold hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-xl text-center flex items-center justify-center gap-2 w-full sm:w-auto"
                                >
                                    Shop Collection <span className="text-xl leading-none">&rarr;</span>
                                </Link>
                                <Link
                                    to="/products"
                                    className="bg-transparent border-2 border-neutral-200 text-neutral-800 px-6 py-3 lg:px-8 lg:py-4 rounded-full font-bold hover:bg-neutral-50 hover:border-neutral-300 transition-all text-center w-full sm:w-auto"
                                >
                                    Explore Products
                                </Link>
                            </div>
                        </div>
                    </Tilt>

                    {/* Right Side: Featured Gallery */}
                    <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end animate-fade-in-up mt-6 lg:mt-0" style={{ animationDelay: '0.2s' }}>
                        {/* Decorative Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl opacity-70 -z-10"></div>
                        
                        <Tilt
                            tiltMaxAngleX={10}
                            tiltMaxAngleY={10}
                            perspective={1000}
                            transitionSpeed={1500}
                            scale={1.05}
                            glareEnable={true}
                            glareMaxOpacity={0.3}
                            glarePosition="all"
                            className="relative w-full max-w-[550px]"
                        >
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6" style={{ transformStyle: 'preserve-3d' }}>
                                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-12">
                                    <img 
                                        src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop" 
                                        alt="Premium Minimal Tote Bag" 
                                        className="w-full aspect-[4/5] object-cover rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-white transition-transform duration-300"
                                        style={{ transform: 'translateZ(40px)' }}
                                    />
                                    <img 
                                        src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop" 
                                        alt="Foldable Market Bag" 
                                        className="w-full aspect-square object-cover rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-white transition-transform duration-300"
                                        style={{ transform: 'translateZ(20px)' }}
                                    />
                                </div>
                                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
                                    <img 
                                        src="https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop" 
                                        alt="Leather Travel Bag" 
                                        className="w-full aspect-square object-cover rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-white transition-transform duration-300"
                                        style={{ transform: 'translateZ(10px)' }}
                                    />
                                    <img 
                                        src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop" 
                                        alt="Eco Cotton Tote" 
                                        className="w-full aspect-[4/5] object-cover rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-white transition-transform duration-300"
                                        style={{ transform: 'translateZ(50px)' }}
                                    />
                                </div>
                                
                                {/* Floating badge with highest Z-translation for maximum pop-out effect */}
                                <div 
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-1 sm:gap-3 z-10 transition-transform duration-300"
                                    style={{ transform: 'translate(-50%, -50%) translateZ(80px)' }}
                                >
                                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm sm:text-xl">✨</div>
                                    <div className="text-center sm:text-left">
                                        <p className="text-[10px] sm:text-sm font-bold text-neutral-900 leading-tight block">Premium</p>
                                        <p className="text-[8px] sm:text-xs text-neutral-500 leading-tight block">Collection</p>
                                    </div>
                                </div>
                            </div>
                        </Tilt>
                    </div>

                </div>
            </section>

            {/* Category Discovery Section */}
            <section className="relative py-12 lg:py-24 px-4 w-full bg-transparent">
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
            <section className="relative py-12 lg:py-24 px-4 w-full bg-transparent border-t border-neutral-100/70">
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
            <section className="relative py-12 lg:py-24 px-4 w-full bg-transparent border-t border-neutral-100/70">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-serif text-neutral-900 mb-4">Why Choose Shree Bags</h2>
                        <p className="text-neutral-500 text-lg max-w-2xl mx-auto">We are committed to delivering excellence through our products and service.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {trustItems.map((item, index) => (
                            <div
                                key={item.title}
                                className="p-6 rounded-3xl bg-neutral-50 hover:bg-emerald-50/40 border border-neutral-100 hover:border-emerald-200/60 transition-all duration-300"
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm border border-neutral-100 text-neutral-900">
                                    <item.Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-neutral-500 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="relative overflow-hidden py-10 lg:py-14 px-4 w-full border-t border-neutral-800 bg-neutral-950 text-white">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-16 left-12 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"></div>
                    <div className="absolute bottom-0 right-8 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-transparent to-neutral-950"></div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center mb-8 lg:mb-10">
                        <p className="text-emerald-300/80 tracking-[0.22em] text-xs font-semibold uppercase mb-3">Process</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-3">
                            How It <span className="text-emerald-400 italic">Works</span>
                        </h2>
                        <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">A simple 4-step process to get premium bags delivered for your personal or business needs.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                        {processSteps.map((step, index) => (
                            <div
                                key={step.title}
                                className="relative rounded-2xl border border-emerald-500/20 bg-emerald-900/10 backdrop-blur-sm p-4 lg:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-900/20"
                            >
                                {index < processSteps.length - 1 && (
                                    <span className="hidden lg:block absolute top-10 left-full w-6 h-px bg-emerald-400/30"></span>
                                )}

                                <span className="absolute -top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-400 text-neutral-950 text-xs font-bold shadow-lg shadow-emerald-500/25">
                                    {index + 1}
                                </span>

                                <div className="w-10 h-10 rounded-lg bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 flex items-center justify-center mb-3">
                                    <step.Icon className="w-5 h-5" />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-2 tracking-tight">{step.title}</h3>
                                <p className="text-sm text-neutral-300 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative py-12 lg:py-24 px-4 w-full bg-transparent border-t border-neutral-100/70">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-neutral-900 mb-4">What Our Clients Say</h2>
                        <p className="text-neutral-500 text-base sm:text-lg max-w-2xl mx-auto">Businesses across India trust Shree Bags for quality, turnaround, and long-term consistency.</p>
                    </div>

                    <div className="testimonial-marquee relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

                        <div className="testimonial-track py-2">
                            {scrollingTestimonials.map((testimonial, index) => (
                                <article
                                    key={`${testimonial.name}-${index}`}
                                    className="w-[260px] sm:w-[320px] md:w-[360px] shrink-0 rounded-3xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-5 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <Quote className="w-8 h-8 text-emerald-700 mb-4" />
                                    <p className="text-neutral-700 leading-relaxed mb-6">"{testimonial.quote}"</p>
                                    <div>
                                        <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                                        <p className="text-sm text-neutral-500">{testimonial.role}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Business CTA */}
            <section className="relative py-12 lg:py-20 px-4 w-full bg-neutral-900 text-white border-t border-neutral-800 overflow-hidden">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/18 blur-3xl"></div>
                    <div className="absolute left-1/2 top-[46%] h-[300px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-yellow-100/20 blur-2xl"></div>
                    <div className="absolute left-1/2 top-[41%] h-[170px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-yellow-50/25 blur-xl"></div>
                    <div className="absolute left-1/2 top-[58%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-100/20"></div>
                </div>

                <div className="relative max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif mb-4">Need Custom Printed Bags for Your Business?</h2>
                    <p className="text-neutral-300 text-base sm:text-lg mb-8">Share your requirements on WhatsApp and get a quick quote with material and quantity options.</p>
                    <a
                        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'}?text=${encodeURIComponent('Hello Shree Bags, I need custom printed bags for my business. Please share details and pricing.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-white hover:bg-emerald-400 transition-colors w-full sm:w-auto"
                    >
                        <FaWhatsapp className="w-5 h-5" />
                        Chat on WhatsApp
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
