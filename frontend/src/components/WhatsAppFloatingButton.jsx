import React from 'react';

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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
            >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.183-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.765-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.573-.187-.981-.342-1.714-.651-2.835-2.435-2.918-2.546-.084-.112-.697-.927-.697-1.769 0-.843.439-1.258.594-1.42.155-.163.338-.204.45-.204.113 0 .226 0 .324.004.103.005.241-.039.376.287.144.347.492 1.2.535 1.287.043.088.072.19.014.305-.057.115-.086.183-.172.285-.084.101-.182.222-.256.305-.086.096-.177.202-.075.378.102.176.455.751 1.05 1.282.769.685 1.332.894 1.503.985.172.091.272.076.376-.041.104-.117.447-.52.569-.699.123-.178.242-.148.406-.087.164.06 1.036.488 1.213.577.177.089.295.138.338.214.043.076.043.438-.101.843z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.122 1.54 5.86L.26 23.74l6.02-1.24C7.892 23.46 9.89 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.031 18.919h-.008c-1.841 0-3.645-.494-5.232-1.431l-.375-.221-3.89.805.82-3.79-.243-.386C2.176 12.38 1.63 10.59 1.63 8.74c0-4.476 3.644-8.118 8.12-8.12 2.169 0 4.208.845 5.742 2.38 1.533 1.534 2.376 3.575 2.376 5.745 0 4.476-3.644 8.119-8.122 8.119z" fillRule="evenodd" clipRule="evenodd" />
            </svg>
            <span className="absolute right-full mr-4 bg-white text-neutral-900 text-sm py-1 px-3 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium z-50">
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppFloatingButton;
