import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, isLoading }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse bg-neutral-100 rounded-2xl aspect-[4/5] object-cover"></div>
                ))}
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-20 px-4 w-full">
                <h3 className="text-2xl font-semibold text-neutral-800 mb-2">No products found</h3>
                <p className="text-neutral-500">Try adjusting your filters or check back later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
