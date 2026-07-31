"use client"
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronLeft } from "lucide-react";

export default function Theme() {
  return (
    <>
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
    <div className="flex flex-col gap-6 w-full  text-white">
      
      <style>{`
        @keyframes letterSwing {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(360deg); }
        }
        .animate-swing-a {
          display: inline-block;
          transform-origin: top center;
          animation: letterSwing 3s ease-in-out infinite;
        }
      `}</style>

   

      <div className="flex flex-row justify-center w-full gap-2 sm:gap-4 md:gap-8 py-4">
        
        <div className="w-full md:w-1/2 flex justify-center align-top">
          <div className="relative w-full max-w-[50vw] sm:max-w-[40vw] md:max-w-[40vw] pb-[15%] sm:mt-15 mt-5">
            <Image
              src="/editions/vv1.png"
              alt="Veiled Veracity Text"
              width={1200}
              height={1200}
              priority
              className="relative z-10 w-full h-auto object-contain"
            />
            <Image
              src="/editions/a.png"
              alt="A"
              width={600}
              height={600}
              priority
              className="absolute z-0 top-[24%] left-[35.4%] md:top-[28%] w-[27%] h-auto object-contain animate-swing-a"
            />
            
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-[70vw] sm:max-w-[50vw] md:max-w-[50vw]">
            <Image
              src="/editions/vv.png"
              alt="Veiled Veracity Artwork"
              width={1200}
              height={1200}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

      </div>

      <div className="w-full mt-4">
        <div className="flex flex-col p-4 border-[2px] sm:border-[3px] border-[#EB0028CC] rounded-lg items-center  bg-[#BC1918]/10 text-white">
          <h1 className="font-bebas text-[30px] sm:text-[50px] md:text-[60px] lg:text-[70px] text-center">
            ABOUT THE THEME
          </h1>
          <p className="font-space text-[12px] sm:text-[22px] md:text-[28px] lg:text-[32px] text-center">
            "Veiled Veracity" reminds us that amidst confusion and uncertainty, there's always the beacon of hope guiding us towards clarity and strength. It challenges us to confront the illusions that shape our lives and embrace the courage to seek out authentic understanding.
            "Veiled" suggests that beneath the surface lies something waiting to be revealed, similar to a treasure hidden behind a curtain. "Veracity" underscores the importance of truthfulness and honesty in our exploration.
          </p>
        </div>
      </div>
    </div>  </>
  );
}