import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Components
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import AdminRoute from './admin/AdminRoute';

// Page Transition Wrapper Component
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
};

// Layout Wrapper to hide Navbar/Footer on Admin routes
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Automatically scroll to the top of the page on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isAdminRoute) {
    return <main className="flex-grow bg-neutral-100">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// The Animated Routes Component handles actual routing logic with useLocation
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/products/:slug" element={<PageTransition><ProductDetails /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route
          path="/admin/dashboard/*"
          element={
            <AdminRoute>
              <PageTransition><Dashboard /></PageTransition>
            </AdminRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
