import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Leaf,
    ShieldCheck,
    Heart,
    Globe,
    Factory,
    Users,
    Target,
    Timer,
    Recycle,
    Truck,
} from 'lucide-react';

const sectionReveal = {
    hidden: { opacity: 0, y: 26 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: 'easeOut' },
    },
};

const cardStagger = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.06,
        },
    },
};

const cardReveal = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: 'easeOut' },
    },
};

const values = [
    {
        title: 'Sustainability First',
        description: 'Every bag is produced using recyclable materials and mindful manufacturing practices.',
        Icon: Leaf,
    },
    {
        title: 'Quality Assurance',
        description: 'Strict quality checks are followed from raw material selection to final dispatch.',
        Icon: ShieldCheck,
    },
    {
        title: 'Customer Focus',
        description: 'Whether small or bulk, every order gets personalized support and timely updates.',
        Icon: Heart,
    },
    {
        title: 'Pan-India Reach',
        description: 'Reliable logistics network serving businesses across key cities and regions.',
        Icon: Globe,
    },
];

const capabilities = [
    {
        title: 'Modern Machinery',
        description: 'High-performance cutting, stitching, and print systems for precision output.',
        Icon: Factory,
    },
    {
        title: 'Skilled Team',
        description: 'Experienced production and quality teams trained for high consistency.',
        Icon: Users,
    },
    {
        title: 'Industry Expertise',
        description: 'Over a decade of focused experience in non-woven and custom bag manufacturing.',
        Icon: Target,
    },
    {
        title: 'On-Time Delivery',
        description: 'Structured planning and dispatch workflow to keep delivery commitments accurate.',
        Icon: Timer,
    },
    {
        title: 'Eco-Friendly Process',
        description: 'Lower-waste process design and material choices that support greener operations.',
        Icon: Recycle,
    },
    {
        title: 'Wide Distribution',
        description: 'Strong transport and partner network enabling delivery across India.',
        Icon: Truck,
    },
];

const About = () => {
    return (
        <div className="w-full bg-gradient-to-b from-[#f6faf7] via-[#f7f8f8] to-[#f7fbff] text-neutral-900">
            <motion.section
                className="px-4 py-12 sm:py-14 border-b border-neutral-200/70"
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
            >
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">Our Story</p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight">
                        About <span className="text-emerald-700 italic">ShreeBags</span>
                    </h1>
                    <p className="text-neutral-600 text-base sm:text-lg mt-4 max-w-3xl mx-auto">
                        India's trusted manufacturer of premium, eco-friendly non-woven and custom printed bags.
                    </p>
                </div>
            </motion.section>

            <motion.section
                className="px-4 py-12 sm:py-16"
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <motion.div variants={cardReveal}>
                        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">Our Journey</p>
                        <h2 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-6">
                            From a Small Workshop to <span className="text-emerald-700 italic">India's Trusted Brand</span>
                        </h2>
                        <div className="space-y-4 text-neutral-600 leading-relaxed">
                            <p>
                                Founded in 2013, ShreeBags began as a compact manufacturing unit in Jaipur, focused on practical and reliable alternatives to single-use plastic bags.
                            </p>
                            <p>
                                Over the years, we scaled with better machinery, stronger process controls, and a customer-first production model that supports both retail and enterprise requirements.
                            </p>
                            <p>
                                Today we serve businesses across India with a commitment to quality, sustainability, and consistent delivery standards.
                            </p>
                        </div>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center mt-7 rounded-full bg-emerald-600 text-white font-semibold px-6 py-3 hover:bg-emerald-500 transition-colors"
                        >
                            Get in Touch
                        </Link>
                    </motion.div>

                    <motion.div className="grid grid-cols-2 gap-4 sm:gap-5" variants={cardStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
                        <motion.div variants={cardReveal} className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-5 text-center">
                            <p className="text-4xl font-bold font-serif text-emerald-700">10+</p>
                            <p className="text-sm text-neutral-500 mt-2">Years in Business</p>
                        </motion.div>
                        <motion.div variants={cardReveal} className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-5 text-center">
                            <p className="text-4xl font-bold font-serif text-emerald-700">500+</p>
                            <p className="text-sm text-neutral-500 mt-2">Happy Clients</p>
                        </motion.div>
                        <motion.div variants={cardReveal} className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-5 text-center">
                            <p className="text-4xl font-bold font-serif text-emerald-700">1M+</p>
                            <p className="text-sm text-neutral-500 mt-2">Bags Produced</p>
                        </motion.div>
                        <motion.div variants={cardReveal} className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-5 text-center">
                            <p className="text-4xl font-bold font-serif text-emerald-700">50+</p>
                            <p className="text-sm text-neutral-500 mt-2">Cities Served</p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="px-4 py-12 sm:py-16 bg-[#f2f8f4] border-y border-neutral-200/70"
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12">
                        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">Our Values</p>
                        <h2 className="text-4xl sm:text-5xl font-bold font-serif leading-tight">
                            What We <span className="text-emerald-700 italic">Stand For</span>
                        </h2>
                    </div>

                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5" variants={cardStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                        {values.map((item) => (
                            <motion.article key={item.title} variants={cardReveal} className="rounded-2xl bg-white border border-neutral-200 p-6 text-center shadow-sm">
                                <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-4">
                                    <item.Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-2">{item.title}</h3>
                                <p className="text-neutral-600 text-sm leading-relaxed">{item.description}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="px-4 py-12 sm:py-16"
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12">
                        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">Production</p>
                        <h2 className="text-4xl sm:text-5xl font-bold font-serif leading-tight">
                            Manufacturing <span className="text-emerald-700 italic">Capabilities</span>
                        </h2>
                    </div>

                    <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" variants={cardStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                        {capabilities.map((item) => (
                            <motion.article key={item.title} variants={cardReveal} className="rounded-2xl bg-white border border-neutral-200 p-5 sm:p-6 shadow-sm">
                                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                                    <item.Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-2">{item.title}</h3>
                                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default About;
