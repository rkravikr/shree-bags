import React from 'react';
import { Link } from 'react-router-dom';
import {
    BadgeCheck,
    Palette,
    Ruler,
    Boxes,
    Building2,
    Sparkles,
    CheckCircle2,
    Printer,
    Brush,
    Droplets,
    MessageCircleMore,
    Factory,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const serviceCards = [
    {
        title: 'Logo Printing',
        description: 'Your brand logo printed with sharp detail and long-lasting color on multiple bag materials.',
        points: ['Single or multi-color options', 'Photo-quality print finish', 'Pantone color matching'],
        Icon: BadgeCheck,
    },
    {
        title: 'Brand Color Matching',
        description: 'Choose from a wide color range or request custom shades tailored to your identity.',
        points: ['Custom fabric shades', 'Brand-first palette selection', 'Consistent output across batches'],
        Icon: Palette,
    },
    {
        title: 'Custom Sizes',
        description: 'From compact retail pouches to large carry bags, we manufacture to your exact size.',
        points: ['Small to XL sizes', 'Custom dimensions', 'Multiple gusset options'],
        Icon: Ruler,
    },
    {
        title: 'Bulk Manufacturing',
        description: 'Production-ready setup for larger quantity orders with reliable quality checks.',
        points: ['MOQ from 500 pieces', 'Volume pricing', 'Stable quality controls'],
        Icon: Boxes,
    },
    {
        title: 'Corporate Branding',
        description: 'Purpose-built bag kits for conferences, launches, events, and employee gifting.',
        points: ['Event giveaways', 'Corporate kits', 'Professional print and finish'],
        Icon: Building2,
    },
    {
        title: 'Premium Finishes',
        description: 'Upgrade your bags with special textures and highlights for a luxury look and feel.',
        points: ['Matte or gloss options', 'Foil accents', 'Embossing support'],
        Icon: Sparkles,
    },
];

const printingMethods = [
    {
        title: 'Screen Printing',
        description: 'Cost-effective option for simple designs and large quantity runs.',
        Icon: Printer,
    },
    {
        title: 'Offset Printing',
        description: 'Great for detailed graphics and vibrant, premium-quality outputs.',
        Icon: Brush,
    },
    {
        title: 'Flexo Printing',
        description: 'Fast turnaround for text-heavy and lightweight branded artwork.',
        Icon: Droplets,
    },
];

const steps = [
    {
        title: 'Share Your Requirement',
        description: 'Tell us bag type, size, quantity, and design goals on WhatsApp.',
        Icon: MessageCircleMore,
    },
    {
        title: 'Approve Sample',
        description: 'We share mockups and sample details before bulk production starts.',
        Icon: CheckCircle2,
    },
    {
        title: 'Production & Delivery',
        description: 'We manufacture, quality-check, and dispatch your order on schedule.',
        Icon: Factory,
    },
];

const CustomPrinting = () => {
    const whatsappHref = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'}?text=${encodeURIComponent(
        'Hello Shree Bags, I need custom printed bags. Please share options and pricing.'
    )}`;

    return (
        <div className="w-full bg-neutral-50 text-neutral-900">
            <section className="relative overflow-hidden px-4 py-12 md:py-20 border-b border-neutral-200">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-14 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl"></div>
                    <div className="absolute bottom-0 right-10 h-52 w-52 rounded-full bg-sky-100/40 blur-3xl"></div>
                </div>

                <div className="relative max-w-5xl mx-auto text-center">
                    <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-emerald-700 font-semibold mb-4">Customization</p>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-serif leading-tight">
                        Custom Printing <span className="text-emerald-700 italic">& Branding</span>
                    </h1>
                    <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto mt-5">
                        Design high-impact branded bags for retail, events, and corporate campaigns with dependable quality.
                    </p>
                </div>
            </section>

            <section className="px-4 py-12 md:py-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {serviceCards.map((card) => (
                        <article key={card.title} className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
                                <card.Icon className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">{card.title}</h2>
                            <p className="text-neutral-600 mb-5">{card.description}</p>
                            <ul className="space-y-2">
                                {card.points.map((point) => (
                                    <li key={point} className="text-sm text-neutral-600 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>

            <section className="px-4 py-12 md:py-16 border-y border-neutral-200 bg-white/70">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-xs tracking-[0.2em] uppercase text-emerald-700 font-semibold mb-3">Techniques</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3">
                            Printing <span className="text-emerald-700 italic">Methods</span>
                        </h2>
                        <p className="text-neutral-600 max-w-2xl mx-auto">Choose the method that best matches your design complexity, quantity, and finish preference.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {printingMethods.map((method) => (
                            <article key={method.title} className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                                    <method.Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2">{method.title}</h3>
                                <p className="text-neutral-600">{method.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-12 md:py-16 bg-neutral-950 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3">How Custom Orders Flow</h2>
                        <p className="text-neutral-300 max-w-2xl mx-auto">Simple, clear, and transparent from requirement to final delivery.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {steps.map((step, index) => (
                            <article key={step.title} className="rounded-2xl border border-emerald-500/25 bg-emerald-900/10 p-5 sm:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-400 text-neutral-950 font-bold text-sm">
                                        {index + 1}
                                    </span>
                                    <step.Icon className="w-5 h-5 text-emerald-300" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2">{step.title}</h3>
                                <p className="text-neutral-300">{step.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-14 bg-neutral-900 text-white border-t border-neutral-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Build Your Branded Bag Line?</h2>
                    <p className="text-neutral-300 mb-8">Share your quantity and design brief. We will help you finalize the right print plan quickly.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-3.5 font-semibold text-white hover:bg-emerald-400 transition-colors w-full sm:w-auto"
                        >
                            <FaWhatsapp className="w-5 h-5" />
                            Chat on WhatsApp
                        </a>
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center rounded-full border border-neutral-600 px-8 py-3.5 font-semibold text-neutral-200 hover:bg-neutral-800 transition-colors w-full sm:w-auto"
                        >
                            Explore Products
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomPrinting;
