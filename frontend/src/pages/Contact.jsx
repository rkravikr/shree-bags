import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send an email or save to DB.
        alert('Thank you for reaching out! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="w-full bg-neutral-50 py-20 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-center mb-16">Get In Touch</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Info */}
                    <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-neutral-100 flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <p className="text-neutral-500 mb-10 leading-relaxed">
                            Have a question about a product, order, or just want to say hi? We'd love to hear from you. Fill out the form or reach out directly using the details below.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-neutral-700">
                                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-neutral-400 uppercase tracking-wider">Email</h4>
                                    <p className="font-medium">info@shreebags.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-neutral-700">
                                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-neutral-400 uppercase tracking-wider">Phone</h4>
                                    <p className="font-medium">+91 12345 67890</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-neutral-700">
                                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-neutral-400 uppercase tracking-wider">Location</h4>
                                    <p className="font-medium">Mumbai, Maharashtra, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-neutral-100">
                        <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow bg-neutral-50"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow bg-neutral-50"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow bg-neutral-50 resize-y"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-neutral-900 text-white font-semibold py-4 rounded-xl hover:bg-neutral-800 transition-colors flex justify-center items-center gap-2 mt-4"
                            >
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
