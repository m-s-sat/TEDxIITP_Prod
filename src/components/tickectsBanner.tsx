"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TicketBanner() {
  return (
    <section className="w-full px-3 py-3">
      <div className="relative mx-auto flex h-[80px] sm:h-[120px] lg:h-[130px] max-w-7xl items-center overflow-hidden rounded-2xl border border-red-600/20 bg-[#0B0B0B]">

        <div className="absolute -left-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute right-5 hidden text-[140px] font-black leading-none text-red-600/5 lg:block">
          X
        </div>

        <div className="flex w-[22%] justify-center">
          <Image
            src="/tickets.svg"
            alt="Tickets"
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
            <span className="text-red-600 text-lg sm:text-lg md:text-2xl lg:text-4xl leading-none">
              TICKETS
            </span>
            <span className="text-[10px] sm:text-lg md:text-2xl lg:text-4xl leading-none text-white">
              ARE LIVE
            </span>
          </h2>

          <p className="hidden sm:block mt-1 text-xs md:text-sm text-zinc-400">
            Reserve your seat before registrations close.
          </p>
        </div>

        <div className="flex w-[28%] justify-center pr-3">
          <Link
            href="/cart"
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
              md:px-5 md:py-2 md:text-sm
              lg:px-6 lg:py-3 lg:text-base
              hover:bg-red-500
              text-white
            "
          >
            Get Yours

            <ArrowRight
              className="transition-transform group-hover:translate-x-1 hidden md:flex"
              size={16}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}