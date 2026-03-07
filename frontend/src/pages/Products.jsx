import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import api from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/categories')
                ]);

                setProducts(productsRes.data);
                setCategories(categoriesRes.data);

                // Auto-filter by category slug from URL if present
                const searchParams = new URLSearchParams(location.search);
                const categorySlug = searchParams.get('category');
                
                if (categorySlug && categoriesRes.data) {
                    const foundCategory = categoriesRes.data.find(c => c.slug === categorySlug);
                    if (foundCategory) {
                        setActiveCategory(foundCategory.id);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [location.search]);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = activeCategory ? product.categoryId === activeCategory : true;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="w-full bg-neutral-50 min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header & Search */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-neutral-900 mb-6">Our Collection</h1>
                    <div className="max-w-md">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-3 rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 mb-12">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === null
                                ? 'bg-neutral-900 text-white shadow-md'
                                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
                            }`}
                    >
                        All Collections
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
                                    ? 'bg-neutral-900 text-white shadow-md'
                                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Products */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-neutral-100">
                    <ProductGrid products={filteredProducts} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
};

export default Products;
