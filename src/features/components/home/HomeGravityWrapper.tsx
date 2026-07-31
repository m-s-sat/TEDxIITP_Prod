"use client";
import React, { useEffect, Children } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { useJourneyStore } from "@/src/store/useJourneyStore";

// ─── Physics config per section ──────────────────────────────────────────────
interface SectionPhysics {
  fallPx: number;       // max downward travel (px) at g=1
  maxRotateDeg: number; // max Z-rotation at g=1 (positive = clockwise)
  driftPx: number;      // max horizontal drift at g=1
}

const SECTION_PHYSICS: SectionPhysics[] = [
  { fallPx: 280,  maxRotateDeg: -2,   driftPx:  16 },  // HeroHome
  { fallPx: 400,  maxRotateDeg:  1.5, driftPx: -22 },  // AboutTheTheme
  { fallPx: 540,  maxRotateDeg: -1.2, driftPx:  14 },  // SpeakerHome
  { fallPx: 460,  maxRotateDeg:  2.5, driftPx: -18 },  // BuyTickets
  { fallPx: 330,  maxRotateDeg: -1.8, driftPx:  10 },  // MerchBanner
  { fallPx: 420,  maxRotateDeg:  1.2, driftPx: -12 },  // EventBanner
  { fallPx: 360,  maxRotateDeg: -2,   driftPx:  11 },  // TicketBanner
];

const MAX_G = 9.8; // m/s² shown in HUD

// ─── Per-section physics wrapper ─────────────────────────────────────────────
function PhysicsSection({
  children,
  physics,
  gSpring,
}: {
  children: React.ReactNode;
  physics: SectionPhysics;
  gSpring: MotionValue<number>;
}) {
  const y = useTransform(gSpring, [0, 1], [0, physics.fallPx]);
  const rotate = useTransform(gSpring, [0, 1], [0, physics.maxRotateDeg]);
  const x = useTransform(gSpring, [0, 1], [0, physics.driftPx]);

  return (
    <motion.div style={{ y, rotate, x, transformOrigin: "center top", willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

// ─── Main wrapper ─────────────────────────────────────────────────────────────
export default function HomeGravityWrapper({ children }: { children: React.ReactNode }) {
  const rulerProgress = useJourneyStore((state) => state.rulerProgress);
  const resetJourney = useJourneyStore((state) => state.resetJourney);

  // Single spring that all sections share — one animation loop
  const gSpring = useSpring(0, { stiffness: 55, damping: 22, mass: 1.2 });

  // Push store value into spring every time ruler is dragged
  useEffect(() => {
    gSpring.set(rulerProgress);
  }, [rulerProgress, gSpring]);

  // Clean up when navigating away from home
  useEffect(() => {
    return () => { resetJourney(); };
  }, [resetJourney]);

  const childArray = Children.toArray(children);
  const gDisplay = (rulerProgress * MAX_G).toFixed(1);
  const showHUD = rulerProgress > 0.005;

  return (
    <>
      {childArray.map((child, i) => (
        <PhysicsSection
          key={i}
          physics={SECTION_PHYSICS[i] ?? SECTION_PHYSICS[SECTION_PHYSICS.length - 1]}
          gSpring={gSpring}
        >
          {child}
        </PhysicsSection>
      ))}

      {/* ── Floating Gravity HUD (desktop + mobile) ── */}
      <motion.div
        className="fixed bottom-20 right-4 md:right-8 z-[200] pointer-events-none select-none"
        animate={{ opacity: showHUD ? 1 : 0, scale: showHUD ? 1 : 0.75, y: showHUD ? 0 : 12 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative rounded-xl border border-red-700/50 bg-black/85 backdrop-blur-md px-3 py-2 md:px-4 md:py-3 flex flex-col items-center gap-0.5 shadow-xl shadow-red-900/25 min-w-[96px] md:min-w-[116px]">
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.018) 3px, rgba(255,255,255,0.018) 4px)",
            }}
          />
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-red-500 font-semibold font-mono z-10">
            Gravity
          </span>
          <span className="text-xl md:text-[28px] font-mono font-black text-white leading-none tabular-nums z-10">
            {gDisplay}
          </span>
          <span className="text-[9px] md:text-[10px] text-red-400/80 font-mono tracking-widest z-10">
            m/s²
          </span>
          {/* Live progress bar */}
          <div className="w-full h-[3px] bg-red-900/30 rounded-full mt-1.5 overflow-hidden z-10">
            <div
              className="h-full rounded-full transition-[width] duration-75"
              style={{
                width: `${rulerProgress * 100}%`,
                background: "linear-gradient(90deg, #dc2626, #f87171)",
              }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}


