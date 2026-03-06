import React from 'react';

const About = () => {
    return (
        <div className="w-full bg-white py-20 px-4 min-h-[70vh]">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-8">Our Story</h1>
                <div className="w-24 h-1 bg-neutral-900 mx-auto mb-10"></div>
                <div className="prose prose-lg text-neutral-600 mx-auto leading-relaxed">
                    <p className="mb-6">
                        Founded with a passion for exceptional craftsmanship, Shree Bags was created to bring premium, stylish, and functional bags to individuals who appreciate fine quality.
                    </p>
                    <p className="mb-6">
                        We believe that a bag is more than just an accessory; it is a companion that journeys with you through everyday life. From selecting the most durable materials to ensuring every stitch is perfect, our artisans dedicate their expertise to creating pieces that are built to last.
                    </p>
                    <p>
                        Whether you're looking for an elegant tote for the office, a rugged backpack for your adventures, or a classic clutch for an evening out, our collection is curated to meet your unique style and needs.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
