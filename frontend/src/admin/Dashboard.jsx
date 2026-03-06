import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, FolderTree, LogOut } from 'lucide-react';

// Placeholders for now, will create next
import ProductsManager from './ProductsManager';
import CategoriesManager from './CategoriesManager';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('adminInfo');
        navigate('/admin/login');
    };

    const navItems = [
        { label: 'Products', path: '/admin/dashboard/products', icon: ShoppingBag },
        { label: 'Categories', path: '/admin/dashboard/categories', icon: FolderTree },
    ];

    return (
        <div className="flex h-screen bg-neutral-100 font-sans">

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col hidden md:flex">
                <div className="p-6 flex items-center gap-3 border-b border-neutral-200">
                    <div className="bg-neutral-900 p-2 rounded-lg">
                        <LayoutDashboard className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg text-neutral-900 tracking-tight">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname.includes(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                        ? 'bg-neutral-900 text-white shadow-md'
                                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-neutral-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-neutral-200 p-4 flex justify-between items-center">
                    <span className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5" /> Admin
                    </span>
                    <button onClick={handleLogout} className="text-red-600 p-2"><LogOut className="w-5 h-5" /></button>
                </header>

                {/* Mobile Nav (Simple row) */}
                <div className="md:hidden bg-white border-b border-neutral-200 px-4 py-2 flex gap-4 overflow-x-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`px-4 py-2 text-sm font-medium rounded-full ${location.pathname.includes(item.path)
                                    ? 'bg-neutral-900 text-white'
                                    : 'bg-neutral-100 text-neutral-600'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <Routes>
                        <Route path="/" element={<div className="p-8 text-neutral-500 text-center">Select an option from the menu to get started.</div>} />
                        <Route path="/products" element={<ProductsManager />} />
                        <Route path="/categories" element={<CategoriesManager />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
