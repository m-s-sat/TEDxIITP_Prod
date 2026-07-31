"use client"
import Link from "next/link";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Image from 'next/image';
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
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 text-white">
      
      <style>{`
        @keyframes letterSwing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-swing-x {
          display: inline-block;
          transform-origin: top center;
          animation: letterSwing 3s ease-in-out infinite;
        }
      `}</style>

    

      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full lg:gap-8 py-4">
        
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center select-none">
          <h1 className="relative font-molend text-4xl sm:text-6xl md:text-6xl tracking-wider leading-tight uppercase">
            Prisms 
            <span className=" text-[#EB0028] text-2xl sm:text-4xl md:text-4xl font-molend align-top -ml-1 -mt-2 sm:-mt-2.5 animate-swing-x">
              X
            </span> 
            <span className="ml-4">
              Of  
            </span>
            <br />
            <span className="flex flex-row items-start justify-center">
               Perception
            </span>
          </h1>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[50vw] -mr-20 -mt-30">
            <Image
              src="/editions/prism2.png" 
              alt="Prisms of Perception Artwork"
              width={1000} 
              height={1000}
              priority={true} 
              sizes="(max-width: 640px) 340px, (max-width: 768px) 420px, 50vw" 
              className="w-full h-auto object-contain block "
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
            We experience the world not through clear glass, but through prisms — shaped by memory, identity, culture, and belief. Each of us carries a lens that bends what we see, coloring our understanding with nuance, distortion, and depth.
            Prisms of Perception invites us to question certainty, embrace complexity, and find meaning in multiplicity. Sometimes, the shift we need isn't in what we see — but in how we choose to see it.          </p>
        </div>
      </div>

    </div>  </>
  );
}