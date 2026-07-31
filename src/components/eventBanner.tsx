"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

export default function EventBanner() {
  return (
    <section className="w-full px-3 py-3">
      <div className="relative mx-auto flex h-[80px] sm:h-[120px] lg:h-[130px] max-w-7xl items-center overflow-hidden rounded-2xl border border-red-600/20 bg-[#0B0B0B]">
        <div className="absolute -left-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-red-600/20 blur-3xl" />

        <div className="absolute right-5 hidden text-[140px] font-black leading-none text-red-600/5 lg:block">
          X
        </div>

        <div className="flex w-[22%] justify-center">
          <Image
            src="/calendar.svg"
            alt="Calendar"
            width={140}
            height={140}
            className="
              h-[55px]
              w-auto
              object-contain
              sm:h-[65px]
              md:h-[75px]
              lg:h-[90px]
              ml-6
            "
          />
        </div>

        <div className="flex-1 text-center">
          <h2 className="font-black flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-2 sm:whitespace-nowrap">
            <span className="text-white text-lg sm:text-lg md:text-2xl lg:text-4xl leading-none">
              EVENT ON
            </span>
            <span className="text-[15px] sm:text-lg md:text-2xl lg:text-4xl leading-none text-red-600">
              12 OCT 2026
            </span>
          </h2>
        </div>

        <div className="flex w-[28%] justify-center pr-3">
          <Link
            href="/events"
            className="
              group
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-red-600
              transition

              px-2 py-1 text-[12px]
              sm:px-3 sm:py-1.5 sm:text-xs
              md:px-5 md:py-2 md:text-lg
              lg:px-6 lg:py-3 lg:text-base
              hover:bg-red-500
              text-white
            "
          >
            <span className="ml-0.5">Register</span>
          </Link>
        </div>
      </div>
    </section>
  );
}