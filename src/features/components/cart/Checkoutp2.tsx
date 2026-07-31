"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

import bgImg from "./background.png"; 
import { Bebas_Neue, Space_Grotesk } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

interface Checkoutp2Props {
  onNext: () => void;
  onBack: () => void;
  onStepChange?: (stepNumber: number) => void;
}

export default function Checkoutp2({ onNext, onBack, onStepChange }: Checkoutp2Props) {
  const [locationType, setLocationType] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("location_type") || "in-campus";
    }
    return "in-campus";
  });

  const [sector, setSector] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("hostel_sector") || "";
    }
    return "";
  });
  
  const [room, setRoom] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("room_coordinate") || "";
    }
    return "";
  });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [address, setAddress] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("out_address") || "";
    }
    return "";
  });
  
  const [city, setCity] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("out_city") || "";
    }
    return "";
  });
  
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("out_state") || "";
    }
    return "";
  });
  
  const [postalCode, setPostalCode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("out_postal") || "";
    }
    return "";
  });

  const [errors, setErrors] = useState({
    sector: false,
    room: false,
    address: false,
    city: false,
    state: false,
    postalCode: false,
  });

  const SECTORS = ["CV Raman", "Aryabhatta", "Kalam", "Asima"];

  useEffect(() => {
    const savedType = localStorage.getItem("location_type");
    if (savedType) {
      setLocationType(savedType);
      if (savedType === "in-campus") {
        setSector(localStorage.getItem("hostel_sector") || "");
        setRoom(localStorage.getItem("room_coordinate") || "");
      } else {
        setAddress(localStorage.getItem("out_address") || "");
        setCity(localStorage.getItem("out_city") || "");
        setState(localStorage.getItem("out_state") || "");
        setPostalCode(localStorage.getItem("out_postal") || "");
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (locationType === "in-campus") {
      const sectorInvalid = !sector || sector === "";
      const roomEmpty = !room.trim();

      setErrors(prev => ({
        ...prev,
        sector: sectorInvalid,
        room: roomEmpty,
        address: false,
        city: false,
        state: false,
        postalCode: false
      }));

      if (sectorInvalid || roomEmpty) return;

      localStorage.setItem("location_type", "in-campus");
      localStorage.setItem("hostel_sector", sector);
      localStorage.setItem("room_coordinate", room);

    } else {
      const addressEmpty = !address.trim();
      const cityEmpty = !city.trim();
      const stateEmpty = !state.trim();
      const postalEmpty = !postalCode.trim();

      setErrors(prev => ({
        ...prev,
        sector: false,
        room: false,
        address: addressEmpty,
        city: cityEmpty,
        state: stateEmpty,
        postalCode: postalEmpty
      }));

      if (addressEmpty || cityEmpty || stateEmpty || postalEmpty) return;

      localStorage.setItem("location_type", "out-campus");
      localStorage.setItem("out_address", address);
      localStorage.setItem("out_city", city);
      localStorage.setItem("out_state", state);
      localStorage.setItem("out_postal", postalCode);
    }

    onNext();
  };

  return (
    <div className="min-h-full h-full bg-black text-white relative overflow-x-hidden selection:bg-red-600 flex flex-col justify-between">
      
      <style dangerouslySetInnerHTML={{__html: `
        /* Hide scrollbar for cleaner UI on the scrollable container */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-75"
        style={{
          backgroundImage: `url(${bgImg.src})`,
          backgroundPosition: 'center top',
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
         }}
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />
   
      {/* Changed: Reverted back to strictly h-[580px] */}
      <main className="max-w-4xl w-[calc(100%-2rem)] md:w-full mx-auto border border-red-950/80 rounded-2xl overflow-hidden shadow-2xl shadow-red-950/10 relative z-10 my-4 sm:my-8 md:mt-12 md:mb-20 flex flex-col h-[580px]">
        
        <div className="flex justify-between items-center px-6 py-4 border-b bg-black border-red-950/50 h-[73px] shrink-0">
          <div>
            <p className={`${spaceGrotesk.className} text-[12px] uppercase text-white tracking-widest font-lighter`}>Checkout Protocol</p>
            <h2 className={`${spaceGrotesk.className} text-xl font-semibold scale-y-125 tracking-tighter text-white mt-0.5 uppercase`}>IDENTIFY EXPLORER</h2>
          </div>
          <Link href="/cart"> 
            <button className={`${spaceGrotesk.className} text-xs text-white hover:text-red-500 flex items-center gap-1.5 uppercase tracking-wide group transition-colors`}>
              <span className="text-red-500 group-hover:scale-110 transition-transform">✕</span> Abort
            </button>
          </Link> 
        </div>

        <div className="flex flex-col md:flex-row flex-1 h-[calc(100%-73px)] overflow-hidden">
          
          <div className="w-full md:w-1/4 p-6 border-b bg-[#1D1D1D] md:border-b-0 md:border-r border-red-950/50 flex flex-row md:flex-col justify-between items-start md:items-stretch relative shrink-0">
            <div className="space-y-4 md:space-y-6 relative">
              <p className={`${spaceGrotesk.className} text-[10px] uppercase text-zinc-500 tracking-widest font-bold`}>Progress</p>
              
              <div 
                className="flex items-center gap-3 cursor-pointer" 
                onClick={() => onStepChange && onStepChange(1)}
              >
                <span className="text-red-600 text-[10px] font-bold">✓</span>
                <span className="text-xs text-zinc-500 font-normal tracking-wide hover:text-zinc-300 transition-colors">Coordinates</span>
              </div>
              
              <div className="flex items-center gap-3 pl-0.5">
                <div className="w-2.5 h-2.5 bg-red-600 transform rotate-45 shadow-md shadow-red-500/50"></div>
                <span className="text-xs font-semibold text-white tracking-wide">Route</span>
              </div>

              <div className="flex items-center gap-3 hidden sm:flex">
                <div className="w-[18px] h-[18px] rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center text-[9px] text-zinc-400">3</div>
                <span className="text-xs text-zinc-500 tracking-wide">Manifest</span>
              </div>
            </div>

            <button 
              onClick={onBack} 
              className="mt-0 md:mt-12 w-24 py-1.5 bg-red-950/20 border border-red-600/70 text-[11px] font-bold text-white rounded uppercase tracking-wider hover:bg-red-600 transition-colors cursor-pointer shrink-0"
            >
              ← BACK
            </button>
          </div>

          {/* Changed: Added overflow-y-auto and hide-scrollbar */}
          <div className="w-full md:w-3/4 p-6 md:p-10 bg-black/50 flex flex-col justify-between overflow-y-auto hide-scrollbar">
            <div>
              <h3 className={`${bebasNeue.className} text-[30px] font-black uppercase tracking-normal scale-y-[1.10] text-white leading-none`}>
                Collection Route
              </h3>
              <p className={`${spaceGrotesk.className} text-[15px] font-medium text-white/90 mt-2 mb-4 tracking-[0.02em]`}>
                Designate the drop point for your artifacts and passes
              </p>

              <div className="inline-flex bg-[#303030] p-1 border border-zinc-800 rounded-lg mb-6 shrink-0">
                <button 
                  type="button"
                  onClick={() => setLocationType("in-campus")}
                  className={`${spaceGrotesk.className} px-4 py-1.5 text-xs font-lighter tracking-wide transition-all rounded-md ${
                    locationType === "in-campus" 
                      ? "bg-black border border-zinc-700 text-white shadow-md" 
                      : "text-white hover:text-red-500"
                  }`}
                >
                  In Campus
                </button>
                <button 
                  type="button"
                  onClick={() => setLocationType("out-campus")}
                  className={`${spaceGrotesk.className} px-4 py-1.5 text-xs font-lighter tracking-wide transition-all rounded-md ${
                    locationType === "out-campus" 
                      ? "bg-black border border-zinc-700 text-white shadow-md" 
                      : "text-white hover:text-red-500"
                  }`}
                >
                  Out of Campus
                </button>
              </div>

              <div className="w-full max-w-md mb-8 md:mb-0">
                
                {locationType === "in-campus" && (
                  <div className="space-y-8 md:ml-5">
                    
                    <div className="relative" ref={dropdownRef}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className={`${spaceGrotesk.className} text-xs scale-y-125 text-white w-full sm:w-36 font-lighter tracking-wide`}>
                          Hostel Sector :
                        </label>
                        
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`${spaceGrotesk.className} bg-[#2a2a2a] border px-3 py-1.5 text-xs text-white text-left tracking-wide cursor-pointer w-full sm:w-44 font-normal rounded flex items-center justify-between transition-colors ${
                            errors.sector ? "border-red-600 focus:border-red-600" : "border-white"
                          }`}
                        >
                          <span className={sector ? "text-white" : "text-zinc-400"}>
                            {sector || "SECTOR"}
                          </span>
                          <span className={`text-[9px] text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
                            ▼
                          </span>
                        </button>
                      </div>

                      {isDropdownOpen && (
                        <div className="absolute left-0 sm:left-[152px] top-[100%] mt-1 w-full sm:w-44 bg-[#1a1a1a] border border-zinc-800 rounded shadow-2xl z-50 overflow-hidden">
                          {SECTORS.map((sec) => (
                            <button
                              key={sec}
                              type="button"
                              onClick={() => {
                                setSector(sec);
                                setErrors(p => ({ ...p, sector: false }));
                                setIsDropdownOpen(false);
                              }}
                              className={`${spaceGrotesk.className} w-full text-left px-3 py-2 text-xs text-zinc-300 hover:bg-red-600 hover:text-white transition-colors uppercase tracking-wider`}
                            >
                              {sec}
                            </button>
                          ))}
                        </div>
                      )}

                      {errors.sector && (
                        <p className="text-[10px] text-red-500 mt-0.5 absolute left-0 sm:left-[152px] top-[100%]">
                          Please designate an active hostel deployment sector block.
                        </p>
                      )}
                    </div>

                    <div className="relative pt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className={`${spaceGrotesk.className} text-xs text-white w-full sm:w-36 scale-y-125 font-lighter tracking-wide`}>Room / Coordinate :</label>
                        <input 
                          type="text" 
                          value={room}
                          onChange={(e) => {
                            setRoom(e.target.value);
                            if (e.target.value.trim()) setErrors(p => ({ ...p, room: false }));
                          }}
                          placeholder="e.g. A-101" 
                          className={`flex-1 w-full bg-transparent border-b outline-none text-sm pb-1 text-white placeholder:text-zinc-700 transition-colors ${
                            errors.room ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                          }`}
                        />
                      </div>
                      {errors.room && <p className="text-[10px] text-red-500 mt-0.5 absolute left-0 sm:left-[152px] top-[100%]">Specify room parameters to establish drop-point routing maps.</p>}
                    </div>
                  </div>
                )}

                {locationType === "out-campus" && (
                  <div className="space-y-8 md:ml-5">
                    <div className="relative">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className={`${spaceGrotesk.className} text-xs text-zinc-400 w-full sm:w-32 font-normal tracking-wide`}>Address Line :</label>
                        <input 
                          type="text" 
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                            if (e.target.value.trim()) setErrors(p => ({ ...p, address: false }));
                          }}
                          placeholder="Street Address" 
                          className={`flex-1 w-full bg-transparent border-b outline-none text-sm pb-1 text-white placeholder:text-zinc-700 transition-colors ${
                            errors.address ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                          }`}
                        />
                      </div>
                      {errors.address && <p className="text-[10px] text-red-500 mt-0.5 absolute left-0 sm:left-[136px] top-[100%]">Address route coordinates are required.</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 pt-2">
                      <div className="relative">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className={`${spaceGrotesk.className} text-xs text-zinc-400 w-full sm:w-16 font-normal tracking-wide`}>City :</label>
                          <input 
                            type="text" 
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                              if (e.target.value.trim()) setErrors(p => ({ ...p, city: false }));
                            }}
                            className={`flex-1 w-full bg-transparent border-b outline-none text-sm pb-1 text-white transition-colors ${
                              errors.city ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                            }`}
                          />
                        </div>
                        {errors.city && <p className="text-[10px] text-red-500 mt-0.5 absolute left-0 sm:left-[72px] top-[100%]">Specify City location.</p>}
                      </div>
                      
                      <div className="relative">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <label className={`${spaceGrotesk.className} text-xs text-zinc-400 w-full sm:w-16 font-normal tracking-wide sm:pl-2`}>State :</label>
                          <input 
                            type="text" 
                            value={state}
                            onChange={(e) => {
                              setState(e.target.value);
                              if (e.target.value.trim()) setErrors(p => ({ ...p, state: false }));
                            }}
                            className={`flex-1 w-full bg-transparent border-b outline-none text-sm pb-1 text-white transition-colors ${
                              errors.state ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                            }`}
                          />
                        </div>
                        {errors.state && <p className="text-[10px] text-red-500 mt-0.5 absolute left-0 sm:left-[72px] top-[100%]">Specify State sector.</p>}
                      </div>
                    </div>

                    <div className="relative pt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className={`${spaceGrotesk.className} text-xs text-zinc-400 w-full sm:w-32 font-normal tracking-wide`}>Postal Code :</label>
                        <input 
                          type="text" 
                          value={postalCode}
                          onChange={(e) => {
                            setPostalCode(e.target.value);
                            if (e.target.value.trim()) setErrors(p => ({ ...p, postalCode: false }));
                          }}
                          className={`w-full sm:w-40 bg-transparent border-b outline-none text-sm pb-1 text-white transition-colors ${
                            errors.postalCode ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                          }`}
                        />
                      </div>
                      {errors.postalCode && <p className="text-[10px] text-red-500 mt-0.5 absolute left-0 sm:left-[136px] top-[100%]">Valid postal sequence routing key required.</p>}
                    </div>
                  </div>
                )}

              </div>
            </div>

            <div className="flex justify-end mt-6 md:mt-0 shrink-0">
              <button 
                onClick={handleContinue}
                className="bg-red-600 border border-red-600 px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded hover:bg-transparent transition duration-200 text-white cursor-pointer w-full md:w-auto"
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