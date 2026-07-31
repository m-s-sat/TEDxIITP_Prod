"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { useRouter } from "next/navigation"; 

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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Checkoutp3Props {
  onBack: () => void;
  onStepChange?: (step: number) => void;
  onComplete: () => void;
}

export default function Checkoutp3({ onBack, onStepChange, onComplete }: Checkoutp3Props) {
  const router = useRouter();
  const [explorerData, setExplorerData] = useState({ name: "Loading...", email: "Loading...", phone: "Loading..." });
  const [dropPoint, setDropPoint] = useState({ line1: "Loading...", line2: "", isOutCampus: false });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedName = localStorage.getItem("explorer_name") || "Not provided";
    const savedEmail = localStorage.getItem("explorer_email") || "Not provided";
    const savedPhone = localStorage.getItem("explorer_phone") || "Not provided";
    setExplorerData({ name: savedName, email: savedEmail, phone: savedPhone });

    const savedLocationType = localStorage.getItem("location_type") || "in-campus";
    if (savedLocationType === "out-campus") {
      const address = localStorage.getItem("out_address") || "Address Unspecified";
      const city = localStorage.getItem("out_city") || "";
      const state = localStorage.getItem("out_state") || "";
      const postal = localStorage.getItem("out_postal") || "";
      
      setDropPoint({
        line1: address,
        line2: `${city}${city && state ? ", " : ""}${state} ${postal}`.trim(),
        isOutCampus: true
      });
    } else {
      const sector = localStorage.getItem("hostel_sector") || "N/A";
      const room = localStorage.getItem("room_coordinate") || "N/A";
      setDropPoint({
        line1: `Sector: ${sector}`,
        line2: `Room: ${room}`,
        isOutCampus: false
      });
    }

    try {
      const savedCart = localStorage.getItem("cart_items");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        const filteredCart = parsedCart.filter(item => item.quantity > 0);
        setCartItems(filteredCart);
      }
    } catch (err) {
      console.error("Failed to parse cart local storage", err);
    }
  }, []);

  const handleTransmission = () => {
    onComplete();
  };

  const handleEditStep = (step: number) => {
    if (onStepChange) {
      onStepChange(step);
      return;
    }

    if (step === 1) {
      router.push("/checkoutp1");
    } else if (step === 2) {
      router.push("/checkoutp2");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const platformFee = subtotal > 0 ? 5.00 : 0.00;
  const discount = subtotal > 0 ? 10.00 : 0.00; 
  const grandTotal = Math.max(0, subtotal + platformFee - discount);

  return (
    <div className="min-h-full h-full text-white relative overflow-x-hidden flex flex-col justify-between">
      
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

      <Image
        src={bgImg}
        alt="Cart background"
        fill
        className="object-cover z-0 pointer-events-none opacity-100"
        priority
      />

      {/* Changed: Reverted to strict h-[580px] to match desktop and mobile heights exactly */}
      <main className="max-w-4xl w-[calc(100%-2rem)] md:w-full mx-auto border border-red-950/80 bg-black/40 rounded-2xl overflow-hidden shadow-2xl shadow-red-950/10 my-4 sm:my-8 md:mt-12 md:mb-20 flex flex-col h-[580px] relative z-10">
        
        <div className="flex justify-between items-center px-6 py-4 border-b bg-black border-b-red-950/50 h-[73px] shrink-0">
          <div>
            <p className={`${spaceGrotesk.className} text-[12px] uppercase text-white tracking-widest font-lighter`}>Checkout Protocol</p>
            <h2 className={`${spaceGrotesk.className} text-xl font-semibold scale-y-125 tracking-tighter text-white mt-0.5 uppercase`}>IDENTIFY EXPLORER</h2>
          </div>
          <Link href="/cart">
            <button className={`${spaceGrotesk.className} text-xs text-white hover:text-red-500 flex items-center gap-1.5 uppercase tracking-wide group transition-colors focus:outline-none focus:ring-0`}>
              <span className="text-red-500 group-hover:scale-110 transition-transform">✕</span> Abort
            </button>
          </Link>
        </div>

        {/* Changed: Added overflow-hidden to the row wrapper */}
        <div className="flex flex-col md:flex-row flex-1 h-[calc(100%-73px)] overflow-hidden">
          
          <div className="w-full md:w-1/4 p-6 border-b bg-[#1D1D1D] md:border-b-0 md:border-r border-red-950/50 flex flex-row md:flex-col justify-between items-start md:items-stretch relative shrink-0">
            <div className="space-y-4 md:space-y-6 relative">
              <p className={`${spaceGrotesk.className} text-[10px] uppercase text-zinc-500 tracking-widest font-bold`}>Progress</p>
              
              <div className="items-center gap-3 cursor-pointer hidden sm:flex" onClick={() => handleEditStep(1)}>
                <span className="text-red-600 text-[10px] font-bold">✓</span>
                <span className="text-xs text-zinc-500 font-normal tracking-wide hover:text-zinc-300 transition-colors">Coordinates</span>
              </div>
              
              <div className="items-center gap-3 cursor-pointer hidden sm:flex" onClick={() => handleEditStep(2)}>
                <span className="text-red-600 text-[10px] font-bold">✓</span>
                <span className="text-xs text-zinc-500 font-normal tracking-wide hover:text-zinc-300 transition-colors">Route</span>
              </div>

              <div className="flex items-center gap-3 pl-0.5">
                <div className="w-2.5 h-2.5 bg-red-600 transform rotate-45 shadow-md shadow-red-500/50"></div>
                <span className="text-xs font-semibold text-white tracking-wide">Manifest</span>
              </div>
            </div>

            <button onClick={onBack} className="mt-0 md:mt-12 w-24 py-1.5 bg-red-950/20 border border-red-600/70 text-[11px] font-bold text-white rounded uppercase tracking-wider hover:bg-red-600 transition-colors cursor-pointer shrink-0">
              ← BACK
            </button>
          </div>

          {/* Changed: Added overflow-y-auto and hide-scrollbar */}
          <div className="w-full md:w-3/4 p-6 md:p-10 flex flex-col justify-between bg-black/50 overflow-y-auto hide-scrollbar">
            <div>
              <h3 className={`${bebasNeue.className} text-[30px] font-black uppercase tracking-normal scale-y-[1.10] text-white leading-none`}>
                Final Manifest Review
              </h3>
              <p className={`${spaceGrotesk.className} text-[15px] font-medium text-white/90 mt-2 mb-6 tracking-[0.02em]`}>
                Verify your coordinates and expedition kit before initiating secure transmission
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-[#141414] border border-zinc-800/60 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">Explorer Data 👤</span>
                      <button type="button" onClick={() => handleEditStep(1)} className="text-[9px] text-zinc-500 hover:text-red-500 uppercase tracking-widest font-bold focus:outline-none focus:ring-0 transition-colors">Edit</button>
                    </div>
                    <div className="space-y-1 text-xs text-zinc-400/80 font-mono">
                      <p><span className="text-zinc-600 font-sans">Name:</span> {explorerData.name}</p>
                      <p><span className="text-zinc-600 font-sans">Email:</span> <span className="break-all">{explorerData.email}</span></p>
                      <p><span className="text-zinc-600 font-sans">Phone:</span> {explorerData.phone}</p>
                    </div>
                  </div>

                  <div className="bg-[#141414] border border-zinc-800/60 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">Drop Point 📍</span>
                      <button type="button" onClick={() => handleEditStep(2)} className="text-[9px] text-zinc-500 hover:text-red-500 uppercase tracking-widest font-bold focus:outline-none focus:ring-0 transition-colors">Edit</button>
                    </div>
                    <div className="space-y-1 text-xs text-zinc-400/80 font-mono break-words">
                      <p>{dropPoint.line1}</p>
                      {dropPoint.line2 && <p>{dropPoint.line2}</p>}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 bg-[#141414] border border-zinc-800/60 p-4 rounded-xl h-full flex flex-col justify-between min-h-[220px]">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase block mb-3 pb-1 border-b border-zinc-900">
                      Your Expedition Kit
                    </span>
                    
                    <div className="space-y-2 text-xs font-mono text-zinc-400/80 max-h-[120px] overflow-y-auto pr-1 mb-2">
                      {cartItems.length === 0 ? (
                        <p className="text-zinc-600 italic">No items found in kit.</p>
                      ) : (
                        cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <span className="truncate max-w-[150px] sm:max-w-40">{item.name} <span className="text-[10px] text-zinc-600 font-sans">x{item.quantity}</span></span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="space-y-1 text-[11px] font-mono text-zinc-500 pt-1.5 border-t border-zinc-900/60">
                      <div className="flex justify-between"><span>Items Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>Platform Fee</span><span>${platformFee.toFixed(2)}</span></div>
                      <div className="flex justify-between text-red-500"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800 mt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Total</span>
                    <span className="text-xl font-black font-mono text-white">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex justify-end mt-6 md:mt-0 shrink-0">
              <button 
                onClick={handleTransmission}
                className="bg-red-600 border border-red-600 px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded hover:bg-transparent transition duration-200 text-white cursor-pointer focus:outline-none focus:ring-0 w-full md:w-auto"
              >
                Initiate Transmission
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}