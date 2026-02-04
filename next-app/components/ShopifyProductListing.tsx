"use client";

import React, { useState } from "react";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import Link from "next/link";

interface Product {
    shopifyId: string;
    title: string;
    description: string;
    price: string;
    imageUrl?: string;
}

interface ShopifyProductListingProps {
    title?: string;
    description?: string;
    products: Product[];
    buttonText?: string;
}

const ShopifyProductListing: React.FC<ShopifyProductListingProps> = ({
    title,
    description,
    products = [],
    buttonText = "Show More",
}) => {
    const [visibleCount, setVisibleCount] = useState(4);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    if (!products || products.length === 0) return null;

    return (
        <section className="section-spacing py-10">
            <div className="container">
                {title && (
                    <div className="section_title mb-10 border-b border-background-gray pb-4">
                        <h2 className="font-heading text-primary">{stegaClean(title)}</h2>
                        {description && <p className="text-secondary mt-2">{stegaClean(description)}</p>}
                    </div>
                )}

                <div className="flex flex-col gap-12">
                    {products.slice(0, visibleCount).map((product, index) => (
                        <div key={index} className="flex flex-wrap items-center gap-8 lg:gap-16">
                            {/* Left Column: Product Info */}
                            <div className="w-full md:w-[calc(60%-32px)] order-2 md:order-1">
                                <h3 className="font-heading text-2xl lg:text-3xl mb-4 text-primary">
                                    {stegaClean(product.title)}
                                </h3>
                                <p className="text-secondary text-base lg:text-lg mb-8 leading-relaxed">
                                    {stegaClean(product.description)}
                                </p>

                                <div className="flex flex-wrap items-center gap-6 mt-6">
                                    <span className="text-tertiary font-bold text-2xl">
                                        {product.price}
                                    </span>

                                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                                        <span className="p-1 px-2 border border-background-gray rounded-sm">
                                            🎁 Make it a gift
                                        </span>
                                    </div>

                                    <button className="bg-tertiary text-white px-8 py-3 font-bold hover:opacity-90 transition-opacity">
                                        Add to cart
                                    </button>
                                </div>
                            </div>

                            {/* Right Column: Product Image */}
                            <div className="w-full md:w-[calc(40%-32px)] order-1 md:order-2 flex justify-center">
                                {product.imageUrl ? (
                                    <Image
                                        src={product.imageUrl}
                                        alt={stegaClean(product.title)}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto shadow-xl"
                                    />
                                ) : (
                                    <div className="w-full h-[500px] bg-background-gray flex items-center justify-center text-gray-400">
                                        No Image Available
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount < products.length && (
                    <div className="flex justify-center mt-16">
                        <button
                            onClick={handleShowMore}
                            className="border border-tertiary text-tertiary px-10 py-3 font-bold hover:bg-tertiary hover:text-white transition-all"
                        >
                            {stegaClean(buttonText)}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShopifyProductListing;
