import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';
import { FaWhatsapp } from 'react-icons/fa';

const ProductDetails = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${slug}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 py-16 animate-pulse flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/2 aspect-square bg-neutral-200 rounded-3xl"></div>
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="h-10 bg-neutral-200 rounded w-3/4"></div>
                    <div className="h-6 bg-neutral-200 rounded w-1/4"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mt-10"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full"></div>
                    <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                    <div className="h-16 bg-neutral-200 rounded-full w-48 mt-12"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-32 px-4">
                <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
                <p className="text-neutral-500 mb-8">The product you are looking for does not exist or has been removed.</p>
                <Link to="/products" className="bg-neutral-900 text-white px-8 py-3 rounded-full hover:bg-neutral-800 transition-colors">
                    Back to Store
                </Link>
            </div>
        );
    }

    const images = product.images && product.images.length > 0
        ? product.images
        : [{ url: 'https://placehold.co/800x1000/e2e8f0/64748b?text=No+Image' }];

    const generateWhatsAppObj = () => {
        const message = `Hello, I want to order this product:\n\n*Product*: ${product.name}\n*Price*: ₹${product.price}\n*Link*: ${window.location.href}`;
        return {
            message: message,
            phone: import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210"
        };
    };

    const waData = generateWhatsAppObj();

    return (
        <div className="w-full bg-white min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">

                {/* Image Gallery */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div className="aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-100">
                        <img
                            src={images[currentImageIndex].url}
                            alt={`${product.name} view ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Thumbnail Gallery (if multiple) */}
                    {images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 noscrollbar">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-neutral-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2 flex flex-col py-6">
                    <div className="mb-2 text-sm font-semibold tracking-wider text-neutral-500 uppercase">
                        {product.category?.name || 'Uncategorized'}
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold font-serif text-neutral-900 mb-6">
                        {product.name}
                    </h1>

                    <div className="text-3xl font-bold text-neutral-900 mb-8 pb-8 border-b border-neutral-100 flex items-center gap-4">
                        ₹{product.price.toLocaleString('en-IN')}
                        {product.stock === 0 && (
                            <span className="text-base font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full align-middle">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed mb-12" dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }} />

                    {/* Call To Action Buttons */}
                    <div className="mt-auto flex flex-col sm:flex-row gap-4">
                        <a
                            href={`https://wa.me/${waData.phone}?text=${encodeURIComponent(waData.message)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex justify-center items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg ${product.stock === 0 ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed pointer-events-none' : 'bg-[#25D366] text-white hover:bg-[#128C7E] hover:scale-105 active:scale-95'}`}
                        >
                            <FaWhatsapp className="w-6 h-6 flex-shrink-0" />
                            <span>Order on WhatsApp</span>
                        </a>
                    </div>

                    {/* Product Details Accodion (Static Mockup) */}
                    <div className="mt-12 space-y-4 pt-8 border-t border-neutral-100 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-neutral-100 text-neutral-600">
                            <span className="font-semibold">Shipping & Returns</span>
                            <span>Free shipping across India</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-neutral-100 text-neutral-600">
                            <span className="font-semibold">Material</span>
                            <span>{product.material || "Premium Quality Material"}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Global FAB */}
            <WhatsAppFloatingButton product={product} />
        </div>
    );
};

export default ProductDetails;
