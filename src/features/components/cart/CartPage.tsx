"use client"; 

import React from "react";
import Image from "next/image";

import CartMain from "./CartMain";

import bgImg from "./background.png"; 

export default function CartPage() {
  return (
    <div className="min-h-screen w-full text-white flex flex-col">
      
      {/* 1. SECTION WITH BACKGROUND (Navbar + Main Content) */}
      <div className="relative overflow-hidden flex-1 flex flex-col">
        
        {/* Dark Overlay Mask */}
        <div className="absolute inset-0 bg-black/50 z-0" />
          
        {/* Background Image */}
        <Image
          src={bgImg}
          alt="Cart background"
          fill
          className="object-cover z-0 pointer-events-none opacity-75"
          priority
        /> 
      
     
      
        {/* Actual Content Sitting Above the Background */}
        <div className="relative z-10 flex-1 flex flex-col">
        
          <CartMain />
        </div>

      </div>

     

    </div>
  );
}