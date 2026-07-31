"use client"
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useCallback, useLayoutEffect } from "react"
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { useJourneyStore } from "@/src/store/useJourneyStore";
import FooterGravityContent from "./FooterGravityContent";

const leftLinks = [
    { label: "TED Website", href: "https://www.ted.com/" },
    { label: "Terms and Conditions", href: "https://www.ted.com/participate/organize-a-local-tedx-event/before-you-start/tedx-rules" },
    { label: "About TEDx", href: "https://www.ted.com/about/programs-initiatives/tedx-program" }
];

const socialLinks = [
    { icon: FaInstagram, href: "https://www.instagram.com/tedxiitpatna" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/tedxiitpatna" },
    { icon: FaFacebookF, href: "https://www.facebook.com/tedxiitpatna" },
    { icon: FaXTwitter, href: "https://twitter.com/tedxiitpatna" },
];

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Speakers", href: "/speakers" },
    /*{ label: "Past Editions", href: "/past-editions" },
    { label: "Pre - event", href: "/funfair" },
    { label: "Your Cart", href: "/cart" },*/
];
const FRICTION = 0.95;       // per-16.67ms-frame velocity decay
const MIN_VELOCITY = 0.02;   // px/ms — stop inertia below this

export default function Footer() {
    const rulerRef = useRef<HTMLDivElement>(null);
    const [spotX, setSpotX] = useState<number | null>(null);
    const addJourneyDistance = useJourneyStore((state) => state.addJourneyDistance);

    const isDraggingRuler = useRef(false);
    const startX = useRef(0);
    const startScrollLeft = useRef(0);

    // Distance-delta tracking (drives infinite-scroll wrap + journeyDistance)
    const lastScrollLeft = useRef(0);
    const patternWidthRef = useRef(0);

    // Velocity tracking for inertia
    const dragLastX = useRef(0);
    const dragLastTime = useRef(0);
    const velocityRef = useRef(0); // scrollLeft px per ms
    const inertiaFrame = useRef<number | null>(null);

    const stopInertia = useCallback(() => {
        if (inertiaFrame.current !== null) {
            cancelAnimationFrame(inertiaFrame.current);
            inertiaFrame.current = null;
        }
    }, []);

    const runInertia = useCallback(() => {
        let lastTime = performance.now();

        const step = (time: number) => {
            const el = rulerRef.current;
            if (!el) {
                inertiaFrame.current = null;
                return;
            }

            const dt = time - lastTime;
            lastTime = time;

            el.scrollLeft += velocityRef.current * dt;
            // frame-rate independent exponential decay
            velocityRef.current *= Math.pow(FRICTION, dt / 16.67);

            if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
                inertiaFrame.current = requestAnimationFrame(step);
            } else {
                inertiaFrame.current = null;
            }
        };

        inertiaFrame.current = requestAnimationFrame(step);
    }, []);

    const handleGlobalMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDraggingRuler.current || !rulerRef.current) return;

        const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? startX.current) : e.clientX;
        const walk = (clientX - startX.current) * 1.5; // smooth 1.5x speed multiplier
        rulerRef.current.scrollLeft = startScrollLeft.current - walk;

        const now = performance.now();
        const dt = now - dragLastTime.current;
        if (dt > 0) {
            const dx = clientX - dragLastX.current;
            velocityRef.current = (-dx / dt) * 1.5;
        }
        dragLastX.current = clientX;
        dragLastTime.current = now;
    }, []);

    const handleGlobalUp = useCallback(() => {
        isDraggingRuler.current = false;
        window.removeEventListener("mousemove", handleGlobalMove);
        window.removeEventListener("mouseup", handleGlobalUp);
        window.removeEventListener("touchmove", handleGlobalMove);
        window.removeEventListener("touchend", handleGlobalUp);
        window.removeEventListener("touchcancel", handleGlobalUp);
        runInertia();
    }, [handleGlobalMove, runInertia]);

    const handleStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        stopInertia();
        isDraggingRuler.current = true;
        const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
        startX.current = clientX;
        startScrollLeft.current = rulerRef.current?.scrollLeft || 0;
        dragLastX.current = clientX;
        dragLastTime.current = performance.now();
        velocityRef.current = 0;
        window.addEventListener("mousemove", handleGlobalMove);
        window.addEventListener("mouseup", handleGlobalUp);
        window.addEventListener("touchmove", handleGlobalMove, { passive: true });
        window.addEventListener("touchend", handleGlobalUp);
        window.addEventListener("touchcancel", handleGlobalUp);
    }, [handleGlobalMove, handleGlobalUp, stopInertia]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = rulerRef.current?.getBoundingClientRect();
        if (rect) setSpotX(e.clientX - rect.left);
    };

    const handleMouseLeave = () => setSpotX(null);

    // Single source of truth for distance + the infinite-scroll illusion.
    // Fires for drag (we set scrollLeft directly), inertia (same), and native
    // wheel/trackpad scrolling on the ruler — so all three "just work".
    const handleScroll = useCallback(() => {
        const el = rulerRef.current;
        if (!el) return;

        const current = el.scrollLeft;
        const delta = current - lastScrollLeft.current;
        lastScrollLeft.current = current;

        if (delta !== 0) {
            addJourneyDistance(delta);
        }

        const patternWidth = patternWidthRef.current;
        if (patternWidth > 0) {
            if (el.scrollLeft < patternWidth * 0.5) {
                el.scrollLeft += patternWidth;
                lastScrollLeft.current += patternWidth;
            } else if (el.scrollLeft > patternWidth * 1.5) {
                el.scrollLeft -= patternWidth;
                lastScrollLeft.current -= patternWidth;
            }
        }
    }, [addJourneyDistance]);

    const RulerPattern = () => (
        <div className="flex items-end justify-between h-full w-[3500px] shrink-0 pb-[2px]">
            {Array.from({ length: 300 }).map((_, i) => (
                <div
                    key={i}
                    className={`w-[2px] shrink-0 bg-red-800 ${i % 10 === 0 ? 'h-[24px]' :
                        i % 5 === 0 ? 'h-[16px]' :
                            'h-[8px] opacity-40'
                        }`}
                />
            ))}
        </div>
    );

    useLayoutEffect(() => {
        return () => {
            window.removeEventListener("mousemove", handleGlobalMove);
            window.removeEventListener("mouseup", handleGlobalUp);
            window.removeEventListener("touchmove", handleGlobalMove);
            window.removeEventListener("touchend", handleGlobalUp);
            window.removeEventListener("touchcancel", handleGlobalUp);
            stopInertia();
        };
    }, [handleGlobalMove, handleGlobalUp, stopInertia]);

    useLayoutEffect(() => {
        if (!rulerRef.current) return;
        const patternWidth = rulerRef.current.scrollWidth / 3;
        patternWidthRef.current = patternWidth;
        rulerRef.current.scrollLeft = patternWidth;
        lastScrollLeft.current = patternWidth;
    }, []);

    return (
        <footer className="bg-black text-white flex flex-col mt-0 overflow-x-hidden relative z-[60]">
            {/* Ruler */}
            <div className="w-full relative h-10 bg-black border-t border-red-900/30">
                <div
                    ref={rulerRef}
                    onMouseDown={handleStart}
                    onTouchStart={handleStart}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleMouseLeave}
                    onScroll={handleScroll}
                    className="w-full h-full overflow-x-auto overflow-y-hidden flex items-end cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    style={{ touchAction: "pan-y" }}
                >
                    {/* CSS Ruler - guaranteed horizontal scroll width */}
                    <div className="flex shrink-0">
                        <RulerPattern />
                        <RulerPattern />
                        <RulerPattern />
                    </div>
                </div>

                {/* Fixed overlays that don't scroll */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                {spotX !== null && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle 80px at ${spotX}px 50%, rgba(220,38,38,0.4) 0%, transparent 100%)`,
                        }}
                    />
                )}
            </div>

            {/* Google Gravity — footer content with Matter.js physics */}
            <FooterGravityContent />
        </footer >
    );
}