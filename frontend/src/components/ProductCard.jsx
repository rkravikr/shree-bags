import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <Link to={`/products/${product.slug}`}>
                    <img
                        src={product.images && product.images.length > 0 ? product.images[0].url : 'https://placehold.co/400x500/e2e8f0/64748b?text=No+Image'}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </Link>
                {/* Quick Actions (Optional hover state) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                        to={`/products/${product.slug}`}
                        className="bg-neutral-900 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-neutral-800 transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-1 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {product.category?.name || 'Uncategorized'}
                </div>
                <Link to={`/products/${product.slug}`} className="mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900 line-clamp-1 group-hover:text-neutral-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-neutral-900">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.stock === 0 && (
                        <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
