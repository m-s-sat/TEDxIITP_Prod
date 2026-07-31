'use client';

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroHomeLeft() {
  return (
    <div
  className="
    flex
    items-center
    justify-center
    w-full
    lg:w-[calc(50%-14px)]
    px-2 md:px-4 lg:px-6
    lg:pl-[4.58vw]
    pt-0
    lg:py-0
    shrink-0
    lg:-mt-4
  "
>
      <div
        className="
          relative
          w-full
          max-w-[650px]
          lg:max-w-[873px]
          aspect-[873/318]
          select-none
        "
      >
        {/* BASE LAYER: Logo without the needle */}
        <Image
          src="/terraIncognitaLogoWithoutNeedle.svg"
          alt="Terra Incognita"
          width={873}
          height={318}
          className="
            w-full
            h-auto
            object-contain
            pointer-events-none
          "
          priority
        />

        {/* ADJUSTED POSITION FOR THE "O" IN INCOGNITA */}
        <div 
          className="
            absolute 
            left-[39.2%] 
            top-[68%] 
            -translate-x-1/2 
            -translate-y-1/2 
            w-[10%] 
            aspect-square 
            flex 
            items-center 
            justify-center
          "
        >
          <motion.div 
            className="w-full h-full flex items-center justify-center cursor-pointer"
            whileHover={{ 
              rotate: 360,
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
            }}
          >
            <Image
              src="/compass_needle.svg"
              alt="Compass Needle"
              width={100}
              height={100}
              className="
                w-[90%] 
                h-[90%] 
                object-contain
              "
              priority
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}