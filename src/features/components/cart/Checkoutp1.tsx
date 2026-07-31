"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { useRouter } from "next/navigation"; 

import bgImg from "./background.png"; 

import { Bebas_Neue, Space_Grotesk, Ancizar_Serif } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const ancizarSerif = Ancizar_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  fallback: ["times new roman", "times", "serif"],
  adjustFontFallback: false
});

interface Checkoutp1Props {
  onNext: () => void;
  onStepChange?: (stepNumber: number) => void;
}

export default function Checkoutp1({ onNext }: Checkoutp1Props) {
  const router = useRouter();
  
  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("explorer_name") || "";
    }
    return "";
  });

  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("explorer_email") || "";
    }
    return "";
  });

  const [phone, setPhone] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("explorer_phone") || "";
    }
    return "";
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    phoneInvalid: false,
  });

  useEffect(() => {
    const savedName = localStorage.getItem("explorer_name");
    const savedEmail = localStorage.getItem("explorer_email");
    const savedPhone = localStorage.getItem("explorer_phone");

    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  const handleTransmission = () => {
    localStorage.removeItem("explorer_name");
    localStorage.removeItem("explorer_email");
    localStorage.removeItem("explorer_phone");
    router.push("/cart");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); 
    if (value.length <= 10) {
      setPhone(value);
      setErrors(prev => ({
        ...prev, 
        phone: value.trim() === "", 
        phoneInvalid: value.length > 0 && value.length < 10
      }));
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameEmpty = !name.trim();
    const emailEmpty = !email.trim();
    const phoneEmpty = !phone.trim();
    const phoneLengthInvalid = !phoneEmpty && phone.length !== 10;

    setErrors({
      name: nameEmpty,
      email: emailEmpty,
      phone: phoneEmpty,
      phoneInvalid: phoneLengthInvalid,
    });

    if (nameEmpty || emailEmpty || phoneEmpty || phoneLengthInvalid) {
      return;
    }

    localStorage.setItem("explorer_name", name);
    localStorage.setItem("explorer_email", email);
    localStorage.setItem("explorer_phone", phone);

    onNext();
  };

  return (
    <div className="min-h-full h-full bg-black text-white relative overflow-x-hidden selection:bg-red-600 flex flex-col justify-between">
      
      <style dangerouslySetInnerHTML={{__html: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0px 1000px #000000 inset !important;
          box-shadow: 0 0 0px 1000px #000000 inset !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
        /* Optional: Hide scrollbar for cleaner UI */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <Image
        src={bgImg}
        alt="Cart background"
        fill
        className="object-cover z-0 pointer-events-none opacity-100"
        priority
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />
      
      {/* Changed: Reverted back to h-[580px] strictly */}
      <main className="max-w-4xl w-[calc(100%-2rem)] md:w-full mx-auto border border-red-950/80 rounded-2xl overflow-hidden shadow-2xl shadow-red-950/10 relative z-10 my-4 sm:my-8 md:mt-12 md:mb-20 flex flex-col h-[580px]">
        
        <div className="flex justify-between items-center px-6 py-4 bg-black border-b border-red-950/50 h-[73px] shrink-0">
          <div>
            <p className={`${spaceGrotesk.className} text-[12px] uppercase text-white tracking-widest font-lighter`}>Checkout Protocol</p>
            <h2 className={`text-xl font-semibold scale-y-125 ${spaceGrotesk.className} tracking-tighter text-white mt-0.5 uppercase`}>IDENTIFY EXPLORER</h2>
          </div>
          <Link href="/cart"> 
            <button className={`${spaceGrotesk.className} text-xs text-white hover:text-red-500 flex items-center gap-1.5 uppercase tracking-wide group transition-colors`}>
              <span className="text-red-500 group-hover:scale-110 transition-transform">✕</span> Abort
            </button>
          </Link> 
        </div>

        <div className="flex flex-col md:flex-row flex-1 h-[calc(100%-73px)] overflow-hidden">
          
          <div className="w-full md:w-1/4 p-6 border-b md:border-b-0 md:border-r border-red-950/50 flex flex-row md:flex-col justify-between items-start md:items-stretch bg-[#1D1D1D] relative shrink-0">
            <div className="space-y-4 md:space-y-6 relative">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Progress</p>
              <div className="flex items-center gap-3 pl-0.5">
                <div className="w-2.5 h-2.5 bg-red-600 transform rotate-45 shadow-md shadow-red-500/50"></div>
                <span className="text-xs font-semibold text-white tracking-wide">Coordinates</span>
              </div>
              <div className="flex items-center gap-3 hidden sm:flex">
                <div className="w-[18px] h-[18px] rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center text-[9px] text-zinc-400">2</div>
                <span className="text-xs text-zinc-500 tracking-wide">Route</span>
              </div>
              <div className="flex items-center gap-3 hidden sm:flex">
                <div className="w-[18px] h-[18px] rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center text-[9px] text-zinc-400">3</div>
                <span className="text-xs text-zinc-500 tracking-wide">Manifest</span>
              </div>
            </div>
            <button onClick={handleTransmission} className="mt-0 md:mt-12 w-24 py-1.5 bg-red-950/20 border border-red-600/70 text-[11px] font-bold text-white rounded uppercase tracking-wider hover:bg-red-600 transition-colors shrink-0">
              ← BACK
            </button>
          </div>

          {/* Changed: Added overflow-y-auto and hide-scrollbar */}
          <div className="w-full md:w-3/4 p-6 md:p-10 bg-black/50 flex flex-col justify-between overflow-y-auto hide-scrollbar">
            <div>
              <h3 className={`${bebasNeue.className} text-[30px] font-black uppercase tracking-normal scale-y-[1.10] text-white leading-none`}>
                Transmission Details
              </h3>
              <p className={`${spaceGrotesk.className} text-[15px] font-medium text-white/90 mt-2 mb-4 tracking-[0.02em]`}>
                Please identify yourself for the expedition log
              </p>

              <div className="h-4 md:h-[38px] w-full shrink-0" />

              <div className="w-full max-w-md space-y-8 md:space-y-10 md:ml-5 mb-8 md:mb-0">
                
                <div className="relative pb-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <label className={`${spaceGrotesk.className} text-xs text-white w-full sm:w-44 scale-y-125 font-lighter tracking-wide`}>Enter Name :</label>
                    <input 
                      type="text" 
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if(e.target.value.trim()) setErrors(prev => ({...prev, name: false}));
                      }}
                      placeholder="Full name" 
                      className={`flex-1 w-full bg-transparent border-b outline-none text-sm pb-1 text-white placeholder:text-zinc-600 ${
                        errors.name ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-red-500 absolute top-[100%] left-0 sm:left-[184px] mt-0.5">This destination identification coordinate field cannot be blank.</p>}
                </div>

                <div className="relative pb-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <label className={`${spaceGrotesk.className} text-xs text-white w-full sm:w-44 scale-y-125 font-lighter tracking-wide`}>Enter Email-address :</label>
                    <input 
                      type="email" 
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if(e.target.value.trim()) setErrors(prev => ({...prev, email: false}));
                      }}
                      placeholder="Email Address" 
                      className={`flex-1 w-full bg-transparent border-b outline-none text-sm pb-1 text-white placeholder:text-zinc-600 ${
                        errors.email ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-500 absolute top-[100%] left-0 sm:left-[184px] mt-0.5">A valid core comm directory link route is required.</p>}
                </div>

                <div className="relative pb-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <label className={`${spaceGrotesk.className} text-xs text-white w-full sm:w-44 scale-y-125 font-lighter tracking-wide`}>Enter Phone-Number:</label>
                    <input
                      type="tel" 
                      name="phone"
                      autoComplete="off"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="Phone Number" 
                      className={`flex-1 w-full bg-transparent border-b outline-none text-sm pb-1 text-white placeholder:text-zinc-600 transition-colors ${
                        errors.phone || errors.phoneInvalid ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                      }`}
                      style={{
                        backgroundColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                      }}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-500 absolute top-[100%] left-0 sm:left-[184px] mt-0.5">Secure log transmissions require a priority frequency link line.</p>}
                  {errors.phoneInvalid && <p className="text-[10px] text-red-500 absolute top-[100%] left-0 sm:left-[184px] mt-0.5">Priority frequency configuration protocol requires exactly 10 digits.</p>}
                </div>

              </div>
            </div>

            <div className="flex justify-end mt-6 md:mt-0 shrink-0">
              <button 
                onClick={handleContinue}
                className="bg-red-600 border border-red-600 px-5 py-2 text-[11px] font-black uppercase tracking-widest rounded hover:bg-transparent transition duration-200 text-white cursor-pointer w-full md:w-auto"
              >
                CONTINUE →
              </button>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}