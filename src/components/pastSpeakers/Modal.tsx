"use client";

import { Speaker } from "@/types/speaker";
import Image from "next/image";
import {
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog"; 
import { ExternalLink, X } from "lucide-react";
import Link from "next/link";

interface SpeakerModalProps {
  speaker: Speaker;
}

export default function SpeakerModal({ speaker }: SpeakerModalProps) {
  return (
    <DialogContent 
      className="flex flex-col max-w-4xl sm:max-w-4xl md:max-w-4xl w-[92vw] max-h-[82vh] sm:max-h-[85vh] bg-zinc-950/95 border border-zinc-800 rounded-2xl p-4 sm:p-7 md:p-8 text-white gap-0 focus:outline-none [&>button]:hidden shadow-2xl backdrop-blur-md overflow-hidden relative"
    >
      <DialogTitle className="sr-only">
        {speaker.name}
      </DialogTitle>
      <DialogDescription className="sr-only">
        Talk details and bio for {speaker.name}
      </DialogDescription>

      <DialogClose className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-zinc-900/90 hover:bg-red-600 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600 transition-all cursor-pointer">
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </DialogClose>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col md:flex-row gap-4 md:gap-8 items-stretch md:items-start w-full pr-1 md:pr-1.5 pt-1 pb-2">
        {/* Left column / Mobile top section */}
        <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 shrink-0">
          <div className="group relative w-24 h-24 sm:w-32 sm:h-32 md:w-60 md:h-60 lg:w-72 lg:h-72 aspect-square shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl">
            <Image
              src={speaker.image}
              alt={speaker.name}
              fill
              className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
              sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 288px"
              priority
            />
          </div>

          {/* On mobile: show name & title next to the compact image */}
          <div className="flex flex-col md:hidden text-left min-w-0 flex-1 pr-8">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-red-600 font-bebas leading-tight mb-1">
              {speaker.name}
            </h2>
            {speaker.title && (
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400 font-sourceSans line-clamp-3">
                {speaker.title}
              </p>
            )}
          </div>
        </div>

        {/* Right column / Bio and actions */}
        <div className="flex flex-col grow text-left min-w-0">
          {/* On desktop: show name & title at top of right column */}
          <div className="hidden md:block">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-red-600 font-bebas leading-none mb-1.5">
              {speaker.name}
            </h2>

            {speaker.title && (
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3 font-sourceSans">
                {speaker.title}
              </p>
            )}
          </div>

          <div className="text-zinc-300 text-xs sm:text-sm lg:text-base font-sourceSans leading-relaxed space-y-2">
            {speaker.body}
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {speaker.talk && (
              <p className="text-xs sm:text-sm text-zinc-400 font-medium font-sourceSans">
                Spoke On: <span className="text-white italic">"{speaker.talk}"</span>
              </p>
            )}
{speaker.ytLink && speaker.ytLink.trim() !== "" && speaker.ytLink.trim() !== "#" && (
  <Link 
    href={speaker.ytLink}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm py-2 px-5 sm:py-2.5 sm:px-6 rounded-full transition-all shadow-md hover:shadow-red-600/30 font-sourceSans cursor-pointer shrink-0"
  >
    <ExternalLink className="w-4 h-4" /> Watch talk on YouTube
  </Link>
)}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}