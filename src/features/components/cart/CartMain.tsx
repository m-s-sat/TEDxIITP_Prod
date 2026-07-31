"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Trash2, Plus, Minus, ArrowRight, Compass, ChevronDown, ChevronUp } from "lucide-react";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation"; 

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

interface CustomDropdownProps {
  id: number;
  currentSize: string;
  options: string[];
  onSelect: (id: number, size: string) => void;
}

const CustomSizeDropdown = ({ id, currentSize, options, onSelect }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${bebasNeue.className} flex items-center justify-between gap-1 sm:gap-2 bg-zinc-950/80 border border-zinc-700 hover:border-red-600 text-white rounded px-2 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-[13px] font-bold tracking-wider outline-none min-w-[50px] sm:min-w-[65px] transition-colors`}
      >
        <span>{currentSize}</span>
        <ChevronDown size={10} className={`transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-[50px] sm:w-[65px] rounded border border-zinc-700 bg-zinc-950 shadow-xl z-50 overflow-hidden">
          <div className="flex flex-col">
            {options.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  onSelect(id, size);
                  setIsOpen(false);
                }}
                className={`${bebasNeue.className} text-left px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-[13px] text-zinc-300 tracking-wider hover:bg-red-600 hover:text-white transition-colors w-full`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function CartMain() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "TEDx IIT Patna Pass",
      description: "GENERAL ACCESS",
      price: 20, 
      quantity: 0,
      size: null, 
    },
    {
      id: 2,
      name: "TEDx Hoodie",
      description: "EXPLORER BLACK",
      size: "L",
      price: 10, 
      quantity: 0,
    },
    {
      id: 3,
      name: "TEDx T-Shirt",
      description: "DRAGON WARRIOR",
      size: "M",
      price: 10, 
      quantity: 0,
    },
  ]);

  const incrementQuantity = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 0 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  const updateItemSize = (id: number, selectedSize: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, size: selectedSize } : item
      )
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const activeItems = items.filter(item => item.quantity > 0);
  
  const convenienceFee = subtotal > 0 ? 2.50 : 0.00;
  const tax = subtotal > 0 ? 2.50 : 0.00;
  const grandTotal = subtotal + convenienceFee + tax;

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  return (
    <div 
      className="w-full min-h-full h-full bg-cover bg-center bg-no-repeat relative flex flex-col justify-between"
      style={{ backgroundImage: "url('/your-background-image.jpg')" }} 
    >
      {/* Main Container */}
      <div className="w-full mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-white relative z-10 flex-grow pb-10 md:pb-12">
        
        {/* LEFT COLUMN */}
        <div className="md:col-span-2 flex flex-col">
          <header className="mb-8 flex flex-col gap-0">
            <h1 className={`${bebasNeue.className} text-[50px] sm:text-[70px] tracking-wide uppercase text-white leading-none`}>
              Your Expedition Kit
            </h1>
            <p className={`${spaceGrotesk.className} text-xl text-zinc-400 tracking-wider leading-tight mt-2`}>
              Items collected for your journey
            </p>
          </header>

          <div className="flex flex-row items-center gap-4 w-full mb-6">
            <h2 className={`${bebasNeue.className} text-2xl tracking-widest text-red-600 uppercase whitespace-nowrap`}>
              Items in your kit
            </h2>
            <hr className="grow border-t-[1.5px] border-red-600/80 opacity-90" />
          </div>

          {/* Dynamic Cart Items List */}
          <div className="flex flex-col gap-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center relative z-0 hover:z-10 focus-within:z-10 justify-between bg-[#181818]/90 border border-zinc-800/50 rounded-xl p-5 gap-4 backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] hover:border-zinc-700/80 hover:bg-zinc-900/60"
              >
                <div className="flex flex-row items-center gap-5">
                  <div className={`${bebasNeue.className} w-28 h-20 bg-zinc-900/50 border border-white rounded-lg flex items-center justify-center text-[20px] text-zinc-400 font-bold uppercase tracking-wider`}>
                    Image
                  </div>
                  
                  <div className="flex flex-col">
                    <h3 className={`${spaceGrotesk.className} ml-5 text-[20px] font-semibold tracking-wide`}>
                      {item.name}
                    </h3>
                    <p className={`${bebasNeue.className} ml-5 text-sm text-zinc-400 tracking-wide mt-0.5`}>
                      {item.description}
                    </p>
                    
                    {item.size !== null && (
                      <div className="text-[11px] ml-5 text-zinc-400 mt-2 flex items-center gap-2 font-medium">
                        <span>SIZE:</span>
                        <CustomSizeDropdown
                          id={item.id}
                          currentSize={item.size}
                          options={["S", "M", "L", "XL", "XXL"]}
                          onSelect={updateItemSize}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls & Price Allocation Columns */}
                <div className="flex flex-row items-center justify-between sm:justify-end gap-8 w-full sm:w-auto mt-2 sm:mt-0">
                  <div className="flex flex-col items-center sm:items-center gap-1">
                    <span className={`${spaceGrotesk.className} text-xs text-zinc-500 font-semibold uppercase tracking-wider`}>Quantity</span>
                    <div className="flex items-center border border-zinc-600 rounded-lg bg-zinc-950/60 text-sm font-mono p-1 gap-0.5 shadow-inner">
                      <button onClick={() => decrementQuantity(item.id)} className="p-1 text-zinc-400 hover:text-red-500 cursor-pointer transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="px-2 font-bold w-6 text-center text-white text-sm">{item.quantity}</span>
                      <button onClick={() => incrementQuantity(item.id)} className="p-1 text-zinc-400 hover:text-red-500 cursor-pointer transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <span className={`${spaceGrotesk.className} font-bold text-2xl tracking-wide text-red-600 w-16 text-right`}>
                    ${item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Exploring */}
          <div className="flex flex-row items-center justify-between mb-8 mt-4">
            <button onClick={() => router.push('/')} className={`${spaceGrotesk.className} text-[20px] scale-y-135 font-bold uppercase tracking-wider flex items-center gap-2 text-white hover:text-red-500 transition-colors group`}>
              <span className="text-red-600 group-hover:-translate-x-1 font-bold transition-transform">←</span> Continue Exploring
            </button>
          </div>
        </div>

        {/* DESKTOP SIDEBAR PANEL */}
        <div className="hidden md:block md:col-span-1 md:mt-29">
          <div className="bg-black/95 border-[1.5px] border-[#FE1212] rounded-[24px] p-3 pt-5 flex flex-col shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="flex flex-row justify-between items-center border-b border-red-950/40 pb-4 mb-6">
              <h2 className={`${bebasNeue.className} text-[30px] tracking-wide text-[#C30000] uppercase`}>Journey Summary</h2>
              <Compass size={40} className="text-[#FE1212]" />
            </div>

            <div className={`${spaceGrotesk.className} flex flex-col gap-4 font-lighter tracking-wide text-white`}>
              <div className="flex justify-between">
                <span className="text-[19px]">Subtotal ({totalItemsCount} items)</span>
                <span className="text-[19px] text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[19px]">Convenience Fee</span>
                <span className="text-[19px] text-white">${convenienceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-red-950/40 pb-4">
                <span className="text-[19px]">Tax</span>
                <span className="text-[19px] text-white">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <label className={`${spaceGrotesk.className} text-[19px] scale-y-150 font-bold text-[#C30000] uppercase block mt-4`}>Expedition Code</label>
              <div className="relative flex items-center mt-2">
                <input type="text" placeholder="Enter code" className="w-full bg-transparent border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-red-600 text-[14px]" />
                <button className="absolute right-3 text-zinc-500 hover:text-red-600"><ArrowRight size={14} /></button>
              </div>
            </div>

            <div className="flex justify-between items-baseline border-t border-zinc-900 mt-6 pt-4">
              <span className={`${spaceGrotesk.className} text-[20px] uppercase text-white`}>Total</span>
              <span className={`${spaceGrotesk.className} text-[20px] font-mono text-white`}>${grandTotal.toFixed(2)}</span>
            </div>

            <Link href={subtotal > 0 ? "/checkout" : "#"} className={`w-full text-white text-[20px] font-bold uppercase tracking-widest mt-3 py-3.5 rounded-lg flex items-center justify-center gap-2 mb-6 shadow-lg transition-all ${subtotal > 0 ? "bg-[#B90000] hover:opacity-90 active:scale-[0.99]" : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"}`}>
              Proceed to Pay <span className="text-xl font-black">→</span>
            </Link>
          </div>
        </div>

      </div>

      {/* MOBILE EXPANDABLE BOTTOM DRAWER INTERFACE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        
        {/* Semi-transparent tint overlay backdrop */}
        {isDrawerOpen && <div onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300" />}

        {/* Dynamic drawer container transition alignment */}
        <div 
          className={`relative bg-black/95 border-t-[1.5px] border-[#FE1212] rounded-t-[24px] px-5 pb-5 pt-1 text-white z-50 shadow-[0_-12px_40px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 transform ${
            isDrawerOpen ? "translate-y-0" : "translate-y-[calc(100%-76px)]"
          }`}
        >
          {/* Centered Trigger Handle Area */}
          <div 
            onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
            className="w-full flex flex-col items-center justify-center py-2 cursor-pointer group"
          >
            <div className="w-12 h-1 bg-zinc-700 rounded-full group-hover:bg-zinc-500 transition-colors" />
            <div className="text-zinc-500 mt-0.5 flex items-center gap-1">
              {isDrawerOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} className="animate-bounce" />}
            </div>
          </div>

          {/* MODIFIED: Changed the literal "Total" label to dynamically show the formatted total price */}
          <div className="flex flex-row justify-between items-center border-b border-red-950/40 pb-2 mb-1">
            <h2 className={`${spaceGrotesk.className} text-[22px] font-bold tracking-wide text-white scale-y-125 uppercase`}>
              Order Summary
            </h2>
            <h2 className={`${spaceGrotesk.className} text-[22px] font-bold text-white font-mono scale-y-125`}>
              ${grandTotal.toFixed(2)}
            </h2>
          </div>

          {/* INTERNAL CONTENT */}
          <div className={`transition-all duration-300 overflow-y-auto ${isDrawerOpen ? "max-h-[380px] opacity-100 my-4" : "max-h-0 opacity-0 pointer-events-none"}`}>
            
            {/* Display Separated List Items */}
            <div className={`${spaceGrotesk.className} space-y-3 font-normal text-sm max-h-[120px] overflow-y-auto pr-1 mb-4 border-b border-red-950/40 pb-3`}>
              {activeItems.length === 0 ? (
                <p className="text-zinc-500 italic text-xs">No active items inside kit.</p>
              ) : (
                activeItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-zinc-300 text-[14px]">
                    <span className="truncate pr-4">{item.name} <span className="text-zinc-500 text-xs font-sans">x{item.quantity}</span></span>
                    <span className="text-white font-mono shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            {/* Display Calculations Breakdown */}
            <div className={`${spaceGrotesk.className} space-y-3 text-[14px] font-lighter tracking-wide text-white`}>
              <div className="flex justify-between">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Convenience Fee</span>
                <span className="font-mono">${convenienceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span>Tax</span>
                <span className="font-mono">${tax.toFixed(2)}</span>
              </div>
            </div>

            {/* Expedition Code Block */}
            <div className="mt-2">
              <label className={`${spaceGrotesk.className} text-[15px] font-bold text-[#C30000] uppercase block mt-3`}>Expedition Code</label>
              <div className="relative flex items-center mt-1">
                <input type="text" placeholder="Enter code" className="w-full bg-transparent border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-600 text-[13px]" />
                <button className="absolute right-3 text-zinc-500 hover:text-red-600"><ArrowRight size={14} /></button>
              </div>
            </div>
          </div>

          {/* FIXED BOTTOM ACTION PANEL BAR LAYER */}
          <div className="flex flex-row items-center justify-between border-t border-zinc-900/60 pt-3 mt-1 gap-4">
            <div className="flex flex-col shrink-0">
              <span className={`${spaceGrotesk.className} text-[11px] uppercase tracking-wider text-zinc-500 font-bold`}>
                Total Due
              </span>
              <span className={`${spaceGrotesk.className} text-2xl font-bold tracking-tight text-white font-mono`}>
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex-grow max-w-[65%]">
              <Link 
                href={subtotal > 0 ? "/checkout" : "#"} 
                className={`w-full text-center text-white text-[15px] font-bold uppercase tracking-widest py-3 rounded-lg block transition-all ${
                  subtotal > 0 ? "bg-[#B90000] active:scale-[0.98] shadow-lg" : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"
                }`}
              >
                Proceed to Pay
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Explore, Discover, Inspire Navigation Links */}
      <div className="w-full flex justify-center pb-10 md:pb-8 pt-4 relative z-10">
        <div className={`${spaceGrotesk.className} flex flex-row items-center gap-6 text-base sm:text-[20px] font-bold tracking-widest text-gray-400 uppercase`}>
          <span className="hover:text-red-500 cursor-pointer transition-colors">Explore</span>
          <span className="text-neutral-700">•</span> 
          <span className="hover:text-white cursor-pointer transition-colors">Discover</span>
          <span className="text-neutral-700">•</span> 
          <span className="hover:text-white cursor-pointer transition-colors">Inspire</span>
        </div>
      </div>

    </div>
  );
}