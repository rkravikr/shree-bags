import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloatingButton = ({ product }) => {
    // We will finalize this logic in Phase 10.
    // Currently, it acts as a generic contact button unless a product is specified.

    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210";
    let message = "Hello Shree Bags! I have an inquiry.";

    if (product) {
        message = `Hello, I want to order this product:\n\n*Product*: ${product.name}\n*Price*: ₹${product.price}\n*Link*: ${window.location.href}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    return (
        <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 active:scale-90 transition-all duration-300 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="w-8 h-8" />
            <span className="absolute right-full mr-4 bg-white text-neutral-900 text-sm py-1 px-3 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium z-50">
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppFloatingButton;
