import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import api from '../services/api';

const CategoriesManager = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '' });
    const [error, setError] = useState('');

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const openModal = (category = null) => {
        setError('');
        if (category) {
            setEditingCategory(category);
            setFormData({ name: category.name });
        } else {
            setEditingCategory(null);
            setFormData({ name: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: '' });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (editingCategory) {
                await api.put(`/categories/${editingCategory.id}`, formData);
            } else {
                await api.post('/categories', formData);
            }
            closeModal();
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await api.delete(`/categories/${id}`);
                fetchCategories();
            } catch (err) {
                alert(err.response?.data?.error || 'Failed to delete category');
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-neutral-900">Categories</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-neutral-900 text-white px-4 py-2 pl-3 rounded-lg flex items-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" /> Add Category
                </button>
            </div>

            {isLoading ? (
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white rounded-xl"></div>)}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 border-b border-neutral-200">
                                <th className="py-4 px-6 font-semibold text-neutral-600 text-sm w-16">ID</th>
                                <th className="py-4 px-6 font-semibold text-neutral-600 text-sm">Name</th>
                                <th className="py-4 px-6 font-semibold text-neutral-600 text-sm">Slug</th>
                                <th className="py-4 px-6 font-semibold text-neutral-600 text-sm w-32 border-l border-neutral-100 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-neutral-500">No categories found.</td>
                                </tr>
                            ) : (
                                categories.map((cat) => (
                                    <tr key={cat.id} className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
                                        <td className="py-4 px-6 text-neutral-500">{cat.id}</td>
                                        <td className="py-4 px-6 font-medium text-neutral-900">{cat.name}</td>
                                        <td className="py-4 px-6 text-neutral-500 font-mono text-sm">{cat.slug}</td>
                                        <td className="py-4 px-6 border-l border-neutral-100 flex justify-end gap-3">
                                            <button onClick={() => openModal(cat)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-100">
                            <h2 className="text-xl font-bold text-neutral-900">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>
                            <button onClick={closeModal} className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Category Name</label>
                                <input
                                    type="text"
                                    required
                                    autoFocus
                                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Travel Bags"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ name: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button type="button" onClick={closeModal} className="px-5 py-2.5 rounded-xl font-medium text-neutral-600 hover:bg-neutral-100 transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-md">
                                    {editingCategory ? 'Save Changes' : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesManager;
