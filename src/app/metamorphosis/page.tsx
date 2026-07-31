"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from "lucide-react";

export default function TedxThemeSection() {
  return (
    <>
      {/* 1. FIXED BUTTON */}
      <div className="absolute top-14 left-6 sm:top-14 sm:left-10 md:top-20 md:left-10 lg:left-11 lg:top-19 z-[100]">
        <Link 
          className="text-[#EB0028] hover:text-[#EB0028CC] transition-colors" 
          href="/past-editions"
          onClick={(e) => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              e.preventDefault();
              window.history.back();
            }
          }}
        >
          <ChevronLeft className="w-8 h-8 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-17 lg:h-17" />
        </Link>
      </div>
  
      <div
        className="relative flex w-full flex-col items-center bg-black bg-cover bg-top min-h-screen overflow-hidden ml-2 sm:ml-8 md:ml-9 lg:ml-10"
        style={{ 
          backgroundImage: "url('/editions/image 59 (1).png')",
          backgroundPosition:"center 20%"
        }}
      >
        <div className="w-full max-w-7xl z-10 flex flex-col items-start  pt-20 md:pt-32 relative">
          
          {/* 1. Heading Container with SVG */}
        {/* 1. Heading Container with Stacked Layers */}
<div className="relative text-left w-full z-10 flex flex-col select-none mt-20 md:mt-32">
  
  {/* Hover Container */}
  <div className="relative w-[300px] sm:w-[600px] lg:w-[900px] h-auto transition-transform duration-500 hover:scale-105 origin-left cursor-pointer">
    
   {/* --- LAYER 1: The Red Shadows (Background) --- */}

  {/* Each image has a relative position, and we add 'left' to create the gap */}
{/* --- LAYER 1: The Red Shadows (Background) --- */}
{/* Absolute container handles the stacking, classes handle the responsive positioning */}
{/* --- LAYER 1: The Red Shadows (Background) --- */}
<div className="absolute inset-0 z-0 pointer-events-none w-full h-[30px] sm:h-[50px] sm:h-[60px] md:h-[70px] lg:h-[100px] -translate-y-0.5 sm:-translate-y-1 md:-translate-y-2 lg:-translate-y-2">
  
  {/* Wrap each image in a div that handles the positioning */}
  <div className="absolute w-full h-full left-[-140px] sm:left-[-280px] lg:left-[-420px]">
    <Image src="/editions/M copy.svg" alt="" fill className="object-contain" />
  </div>

  <div className="absolute w-full h-full left-[-98px] sm:left-[-198px] lg:left-[-290px]">
    <Image src="/editions/E (2).svg" alt="" fill className="object-contain" />
  </div>

  <div className="absolute w-full h-full left-[-118px] sm:left-[-235px] lg:left-[-350px]">
    <Image src="/editions/E copy.svg" alt="" fill className="object-contain" />
  </div>

  <div className="absolute w-full h-full left-[88px] sm:left-[180px] lg:left-[270px]">
    <Image src="/editions/E (1) copy.svg" alt="" fill className="object-contain" />
  </div>
  
</div>

    {/* --- LAYER 2: The Main White Text (Foreground) --- */}
    <div className="relative sm:w-[570px] md:w-[580px] lg:w-[890px]  z-10 w-full h-full">
      <Image 
        src="/editions/METAMORPHOSIS.svg" 
        alt="METAMORPHOSIS" 
        width={1200} 
        height={300} 
        className="w-full h-auto object-contain"
        priority
      />
    </div>

  </div>
</div>

          {/* 2. About the Theme Box */}
          <div className="w-full mt-60 sm:mt-90 md:mt-100 lg:mt-180 mb-16 z-10">
            <div className="flex flex-col p-6 sm:p-8 md:p-12 bg-[#BC1918]/10 border-2 sm:border-[3px] border-[#EB0028CC] rounded-2xl items-start text-white shadow-2xl">
              <h2 className="font-bebas text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] text-left mb-6 tracking-wide w-full">
                ABOUT THE THEME
              </h2>
              <p className="font-space text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-left text-gray-200 leading-relaxed max-w-5xl w-full">
                The 2nd edition of TEDxIIT Patna, Metamorphosis, embraced the idea that permanence is an illusion — that everything in existence is in a constant state of becoming. Change is not something to resist, but to understand; it often holds within it the potential for growth, renewal, and transformation.
                <br /><br />
                The edition brought together experts who reflected on the impact of rapid, often disruptive changes in technology, entertainment, and — most profoundly — on people and societal values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}