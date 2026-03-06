import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { ShoppingBag } from "lucide-react"
import api from '../services/api';

const ProductsManager = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        material: '',
        price: '',
        stock: '',
        categoryId: '',
        isActive: true
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [prodsRes, catsRes] = await Promise.all([
                api.get('/products'),
                api.get('/categories')
            ]);
            setProducts(prodsRes.data);
            setCategories(catsRes.data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openModal = (product = null) => {
        setError('');
        setSelectedFile(null);
        setPreviewUrl(null);

        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                material: product.material || '',
                price: product.price,
                stock: product.stock !== null ? product.stock : '',
                categoryId: product.categoryId,
                isActive: product.isActive
            });
            if (product.images && product.images.length > 0) {
                setPreviewUrl(product.images[0].url);
            }
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                material: '',
                price: '',
                stock: '',
                categoryId: categories.length > 0 ? categories[0].id : '',
                isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setSelectedFile(null);
        setPreviewUrl(null);
        setError('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.match('image.*')) {
                setError('Please select an image file (jpg, png, webp)');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError('');
        }
    };

    const uploadImage = async (productId) => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        await api.post(`/products/${productId}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSaving(true);

        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                stock: formData.stock ? parseInt(formData.stock) : null,
                categoryId: parseInt(formData.categoryId)
            };

            let productId;

            if (editingProduct) {
                const res = await api.put(`/products/${editingProduct.id}`, payload);
                productId = res.data.id;
            } else {
                const res = await api.post('/products', payload);
                productId = res.data.id;
            }

            // Handle Image Upload if a new file was selected
            if (selectedFile) {
                await uploadImage(productId);
            }

            closeModal();
            fetchData();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || err.message || 'Operation failed');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchData();
            } catch (err) {
                alert(err.response?.data?.error || 'Failed to delete product');
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-neutral-900">Products</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-neutral-900 text-white px-4 py-2 pl-3 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" /> Add Product
                </button>
            </div>

            {isLoading ? (
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white rounded-xl"></div>)}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 text-sm font-semibold">
                                    <th className="py-4 px-6 w-20">Image</th>
                                    <th className="py-4 px-6">Product Details</th>
                                    <th className="py-4 px-6">Price</th>
                                    <th className="py-4 px-6">Stock</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right w-32 border-l border-neutral-100">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-neutral-500">
                                            No products found. Start by adding one!
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((prod) => (
                                        <tr key={prod.id} className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200">
                                                    {prod.images && prod.images.length > 0 ? (
                                                        <img src={prod.images[0].url} alt={prod.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-neutral-400"><ImageIcon size={20} /></div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-neutral-900 line-clamp-1">{prod.name}</div>
                                                <div className="text-sm text-neutral-500">{prod.category?.name || 'Uncategorized'}</div>
                                            </td>
                                            <td className="py-4 px-6 font-medium text-neutral-900">₹{prod.price.toLocaleString('en-IN')}</td>
                                            <td className="py-4 px-6">
                                                {prod.stock !== null ? (
                                                    <span className={`px-2 py-1 rounded-md text-sm font-medium ${prod.stock > 10 ? 'bg-green-50 text-green-700' : prod.stock > 0 ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700'}`}>
                                                        {prod.stock} instock
                                                    </span>
                                                ) : <span className="text-neutral-400 text-sm">N/A</span>}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`flex items-center gap-1.5 text-sm font-medium ${prod.isActive ? 'text-green-600' : 'text-neutral-500'}`}>
                                                    <span className={`w-2 h-2 rounded-full ${prod.isActive ? 'bg-green-500' : 'bg-neutral-400'}`}></span>
                                                    {prod.isActive ? 'Active' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 border-l border-neutral-100">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => openModal(prod)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Product">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(prod.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Product">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 md:p-8 overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-fade-in-up my-auto flex flex-col md:max-h-[90vh]">

                        <div className="flex justify-between items-center px-6 lg:px-8 py-5 border-b border-neutral-100 bg-white sticky top-0 z-10 shrink-0">
                            <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-3">
                                {editingProduct ? <><Edit2 className="w-6 h-6 text-blue-600" /> Edit Product</> : <><ShoppingBag className="w-6 h-6 text-green-600" /> New Product</>}
                            </h2>
                            <button disabled={isSaving} onClick={closeModal} className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-6 lg:px-8 grow">
                            {error && (
                                <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <span className="font-medium whitespace-pre-wrap">{error}</span>
                                </div>
                            )}

                            <form id="productForm" onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                                {/* Left Col: Main Info */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Premium Backpack"
                                            className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all outline-none"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Description <span className="text-red-500">*</span></label>
                                        <textarea
                                            required
                                            rows="5"
                                            placeholder="Detailed description of the bag..."
                                            className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all outline-none resize-y"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Material</label>
                                        <input
                                            type="text"
                                            placeholder="Premium Faux Leather, Nylon, etc."
                                            className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all outline-none"
                                            value={formData.material}
                                            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Price (₹) <span className="text-red-500">*</span></label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                required
                                                placeholder="1999"
                                                className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all outline-none"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Stock Inventory</label>
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Unlimited (Leave blank)"
                                                className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all outline-none"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Col: Meta & Image */}
                                <div className="w-full lg:w-72 lg:shrink-0 space-y-8">

                                    {/* Image Upload Area */}
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-3">Product Image</label>
                                        <div
                                            className={`relative aspect-[4/5] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-colors group cursor-pointer
                        ${previewUrl ? 'border-neutral-200 bg-neutral-50' : 'border-neutral-300 hover:border-neutral-900 bg-neutral-50/50 hover:bg-neutral-50'}`}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {previewUrl ? (
                                                <>
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white font-medium flex items-center gap-2"><UploadCloud size={18} /> Change Image</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-4">
                                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-neutral-500 group-hover:text-neutral-900 transition-colors">
                                                        <UploadCloud size={24} />
                                                    </div>
                                                    <p className="text-sm font-medium text-neutral-900 mb-1">Upload Photo</p>
                                                    <p className="text-xs text-neutral-500">PNG, JPG up to 5MB</p>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/jpeg, image/png, image/webp"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    {/* Settings */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Category <span className="text-red-500">*</span></label>
                                            <select
                                                required
                                                className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all outline-none cursor-pointer appearance-none"
                                                value={formData.categoryId}
                                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                                            >
                                                <option value="" disabled>Select Category</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                            {categories.length === 0 && <p className="text-xs text-red-500 mt-2">Please create a category first.</p>}
                                        </div>

                                        <label className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl bg-white cursor-pointer hover:border-neutral-300 transition-colors">
                                            <div className="relative flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900 cursor-pointer accent-neutral-900"
                                                        checked={formData.isActive}
                                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-sm font-semibold text-neutral-900">Active Status</span>
                                                <span className="block text-xs text-neutral-500">Visible on storefront</span>
                                            </div>
                                        </label>
                                    </div>

                                </div>

                            </form>
                        </div>

                        <div className="border-t border-neutral-100 p-6 lg:px-8 bg-neutral-50 shrink-0 flex justify-end gap-3 rounded-b-3xl">
                            <button
                                type="button"
                                disabled={isSaving}
                                onClick={closeModal}
                                className="px-6 py-3 rounded-xl font-medium text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 transition-all disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                form="productForm"
                                type="submit"
                                disabled={isSaving || (categories.length === 0)}
                                className="px-8 py-3 rounded-xl font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/20 disabled:opacity-70 flex items-center gap-2"
                            >
                                {isSaving ? (
                                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</>
                                ) : (
                                    <>{editingProduct ? 'Save Changes' : 'Publish Product'}</>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsManager;
