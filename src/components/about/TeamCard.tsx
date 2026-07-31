"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa6";

interface TeamCardProps {
    name: string;
    img: string;
    role?: string;
    subRole?: string;
    linkedin?: string;
    featured?: boolean;
}

export default function TeamCard({ name, img, role, subRole, linkedin, featured = false }: TeamCardProps) {
    const isLinkValid = linkedin && linkedin !== "#";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-full"
        >
            <div
                className={`relative w-full rounded-2xl border-2 sm:border-[2.5px] border-[#EB0028] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-red-600/30 bg-black group ${
                    featured ? "aspect-[3/4] sm:aspect-square" : "aspect-[3/4]"
                }`}
            >
                {/* Background Texture */}
                <Image
                    src="/bg2.png"
                    alt="background"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 z-10" />

                {/* Portrait Image */}
                <div className="absolute inset-0 z-0 w-full h-full">
                    <Image
                        src={img || "/pic.png"}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* LinkedIn Profile Button */}
                <a
                    href={isLinkValid ? linkedin : "#"}
                    target={isLinkValid ? "_blank" : undefined}
                    rel={isLinkValid ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                        if (!isLinkValid) e.preventDefault();
                    }}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 size-7 sm:size-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] hover:scale-110 transition-all duration-300"
                    title={isLinkValid ? `Connect with ${name} on LinkedIn` : "LinkedIn link coming soon"}
                    aria-label={`LinkedIn profile for ${name}`}
                >
                    <FaLinkedinIn className="size-3.5 sm:size-4" />
                </a>

                {/* Name & Role Typography */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 z-30 flex flex-col select-none pointer-events-none">
                    {role && (
                        <span
                            className={`text-white/90 font-space font-light tracking-wide leading-tight truncate ${
                                featured
                                    ? "text-xs sm:text-lg md:text-xl lg:text-2xl"
                                    : "text-[10px] sm:text-xs md:text-sm"
                            }`}
                        >
                            {role}
                        </span>
                    )}

                    {subRole && (
                        <span
                            className={`text-white/75 font-space font-light tracking-wide leading-tight truncate mb-0.5 ${
                                featured
                                    ? "text-[11px] sm:text-base md:text-lg lg:text-xl"
                                    : "text-[9px] sm:text-[11px] md:text-xs"
                            }`}
                        >
                            {subRole}
                        </span>
                    )}

                    <h3
                        className={`text-white font-bebas tracking-wider uppercase leading-none drop-shadow-md truncate ${
                            featured
                                ? "text-xl sm:text-3xl md:text-5xl lg:text-6xl"
                                : "text-base sm:text-xl md:text-2xl"
                        }`}
                    >
                        {name}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
}