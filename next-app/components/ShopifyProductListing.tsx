"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { stegaClean } from "next-sanity";

interface Product {
    shopifyId: string;
    title: string;
    description: string;
    price: string;
    imageUrl?: string;
}

interface ShopifyProductListingProps {
    products: Product[];
    buttonText?: string;
}

const ShopifyProductListing: React.FC<ShopifyProductListingProps> = ({
    products = [],
    buttonText = "Show More",
}) => {
    const [visibleCount, setVisibleCount] = useState(4);
    const [sortBy, setBySort] = useState("oldest");

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    const sortedProducts = useMemo(() => {
        const list = [...products];
        if (sortBy === "newest") {
            return list.reverse();
        }
        return list; // Assuming default is newest to oldest as provided by Sanity array
    }, [products, sortBy]);

    if (!products || products.length === 0) return null;

    return (
        <section className="py-10">
            <div className="container px-4 mx-auto max-w-7xl">
                {/* Sorting Dropdown */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-medium">Sort By:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setBySort(e.target.value)}
                            className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-tertiary"
                        >
                            <option value="newest">Newest to Oldest</option>
                            <option value="oldest">Oldest to Newest</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-16 lg:gap-24">
                    {sortedProducts.slice(0, visibleCount).map((product, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center gap-8 lg:gap-20 border-b border-gray-100 pb-16 last:border-0">
                            {/* Left Column: Product Info */}
                            <div className="w-full md:w-3/5 order-2 md:order-1">
                                <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-4 text-primary leading-tight">
                                    {stegaClean(product.title)}
                                </h3>
                                <div className="text-secondary text-base lg:text-lg mb-8 leading-relaxed max-w-2xl">
                                    {stegaClean(product.description)}
                                </div>

                                <div className="flex flex-wrap items-center gap-6 md:gap-10 mt-6 mt-auto">
                                    <span className="text-tertiary font-bold text-2xl">
                                        {/* Ensure $ prefix if not present */}
                                        {product.price?.startsWith('$') ? product.price : `$${product.price?.split(' ')[0] || '0'}`}
                                    </span>

                                    <div className="flex items-center gap-2 cursor-pointer group">
                                        <span className="text-tertiary text-xl hover:scale-110 transition-transform">📍</span>
                                        <span className="text-gray-800 text-sm font-bold border-b border-black group-hover:text-tertiary group-hover:border-tertiary transition-colors">
                                            Make it a gift
                                        </span>
                                    </div>

                                    <button className="bg-tertiary text-white px-10 py-3 font-bold rounded-sm hover:opacity-90 active:scale-95 transition-all shadow-md">
                                        Add to cart
                                    </button>
                                </div>
                            </div>

                            {/* Right Column: Product Image */}
                            <div className="w-full md:w-2/5 order-1 md:order-2 flex justify-center">
                                {product.imageUrl ? (
                                    <div className="relative w-full aspect-[4/5] max-w-[400px]">
                                        <Image
                                            src={product.imageUrl}
                                            alt={stegaClean(product.title)}
                                            fill
                                            className="object-contain shadow-2xl rounded-sm"
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full aspect-[4/5] max-w-[400px] bg-gray-100 flex items-center justify-center text-gray-400 rounded-sm">
                                        No Image Available
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                {visibleCount < products.length && (
                    <div className="flex justify-center mt-16">
                        <button
                            onClick={handleShowMore}
                            className="border-2 border-gray-200 text-gray-600 px-12 py-3 font-bold hover:border-tertiary hover:text-tertiary transition-all rounded-sm uppercase tracking-wider text-sm"
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
