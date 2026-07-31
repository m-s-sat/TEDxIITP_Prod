"use client"
import React from 'react';
import { Bebas_Neue, Space_Grotesk, Fredoka } from 'next/font/google';
import Link from 'next/link';
import { ChevronLeft } from "lucide-react";
import Image from 'next/image';
export const bebasNeue = Bebas_Neue({
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-bebas-neue', 
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk', 
});

export const fredoka = Fredoka({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-fredoka',
});

export default function TedxThemeSection() {
  return (
    <>
    
   {/* 1. FIXED BUTTON: Always stays in place, size scales with screen */}
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
          {/* Responsive sizing: scales from 40px to 64px based on screen */}
          <ChevronLeft className="w-8 h-8 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-17 lg:h-17" />
        </Link>
      </div>
  

     
    <div
      className={`${fredoka.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} font-sans bg-cover bg-top min-h-screen w-full relative flex flex-col items-center pb-16 px-4 sm:px-6 lg:px-8 ml-2 sm:ml-8 md:ml-9 lg:ml-10 -mt-16 `}
      style={{ 
        backgroundImage: "url('/editions/WhatsApp Image 2026-07-01 at 03.01.36 (1) copy.jpeg')",
       backgroundSize: 'cover',
        backgroundPosition: 'right top',
        
      }}
    > 
      {/* Maximum Width Wrapper */}
      <div className="w-full max-w-6xl z-10 flex flex-col items-start mt-6 sm:mt-10 relative">
        
        {/* Go back button - ONLY this container was adjusted to fix the position */}
      

        {/* Heading Container - Original negative margins restored */}
        <div className="flex flex-col gap:2 sm:gap-4 md:gap-6 lg:gap-10 bg-transparent pt-8 sm:pt-12 w-full ml-3 sm:-ml-4 md:ml-3 lg:-ml-8">
          {/* Main ROAR Heading with Responsive Text Sizes */}
        {/* ROAR Image Container - Updated with Hover Effects */}
<div className="flex flex-row items-center gap-2 sm:gap-4 md:gap-7 mt-40 w-full">
  
  {/* LETTER R */}
  <div className="w-[40px] sm:w-[50px] md:w-[50px] lg:w-[90px] h-auto transition-transform duration-300 ease-in-out hover:scale-110 origin-bottom">
    <Image 
      src="/editions/R.svg" 
      alt="R" 
      width={20} 
      height={80} 
      className="w-full h-auto object-contain"

    />
  </div>

  {/* LETTER O */}
  <div className="w-[60px] sm:w-[80px] lg:w-[150px] h-auto transition-transform duration-300 ease-in-out hover:scale-110 origin-bottom delay-75">
    <Image 
      src="/editions/Vector copy.svg" // REPLACE WITH YOUR O IMAGE PATH
      alt="O" 
      width={80} 
      height={80} 
      className="w-full h-auto object-contain"
    />
  </div>

  {/* LETTER A */}
  <div className="w-[50px] sm:w-[60px] lg:w-[120px] h-auto transition-transform duration-300 ease-in-out hover:scale-110 origin-bottom delay-100">
    <Image 
      src="/editions/A.svg" 
      alt="A" 
      width={50} 
      height={50} 
      className="w-full h-auto object-contain"
    />
  </div>

  {/* LETTER R (Second R) */}
  <div className="w-[40px] sm:w-[50px] lg:w-[90px] h-auto transition-transform duration-300 ease-in-out hover:scale-110 origin-bottom delay-150">
    <Image 
      src="/editions/R.svg" 
      alt="R" 
      width={50} 
      height={50} 
      className="w-full h-auto object-contain"
    />
  </div>
</div>

            

        {/* Replace the <p> tag with this container */}
<div className="mt-4 sm:mt-2 ml-2  w-full transition-transform duration-300 hover:scale-105 origin-left">
  <div className="relative w-[210px] sm:w-[280px] lg:w-[500px] h-auto">
    <Image 
      src="/editions/the acousitc of strength copy.svg" 
      alt="the acoustic of strength" 
      width={600} 
      height={100} 
      className="w-full h-auto object-contain"
    />
  </div>
</div></div>

        {/* About the theme Box */}
        <div className="w-full mt-40 sm:mt-70 md:mt-100 lg:mt-190 mb-8 z-10"> 
          <div className="flex flex-col p-6 sm:p-8 md:p-12 bg-[#BC1918]/10 border-[3px] border-[#EB0028CC] rounded-2xl items-start md:items-center text-white shadow-2xl ">
            {/* Shifted text to left on mobile, centered on md and up */}
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-left md:text-center mb-6 tracking-wide w-full">
              ABOUT THE THEME
            </h2>
            <p className="font-[family-name:var(--font-space-grotesk)] text-sm sm:text-base md:text-xl lg:text-2xl text-left md:text-center text-gray-200 leading-relaxed max-w-4xl mx-auto w-full">
              The 3rd edition of TEDxIIT Patna, Roar – The Acoustics of Strength, celebrated the enduring spirit of resilience and the inner voice that refuses to be silenced. It echoed the truth that the stronger one’s conviction, the greater their untapped potential. 
              <br /><br />
              Roar was a call to liberate the self, summon spiritual courage, and embrace a mindset forged not in silence, but in the sound of fearless becoming.
            </p>
          </div>
        </div>

      </div>
    </div></>
  );
}