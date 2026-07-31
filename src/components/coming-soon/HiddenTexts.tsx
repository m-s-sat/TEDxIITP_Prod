"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HiddenTexts
 * -----------
 * Placeholder text over the background, hidden until the cursor/finger passes
 * near it. Each element is opacity 0 by default; within REVEAL_RADIUS it fades
 * to full opacity, and after the pointer leaves it fades back to 0 (after
 * HOLD_MS). Reads as "wipe the fog and the text appears, then it re-fogs".
 *
 * On touch devices ONLY touch listeners are registered (never mouse), so the
 * ghost-mouse-event-after-tap bug can't re-plant a stuck pointer.
 * Sits at z-[2] (over bg1, under mist). Positions hard-placed per device.
 */

/* ---- tunables ---- */
const REVEAL_RADIUS = 30; // px — how close the pointer must be to reveal
const HOLD_MS = 2500; // how long a revealed text stays before fading back
const FADE_MS = 2800; // css fade duration
/* ------------------ */

type Pos = { top: string; left: string; rotate?: string };
type HiddenText = { text: string; desktop: Pos; mobile: Pos };

const ITEMS: HiddenText[] = [
    {
        text: "Beyond Known Horizons",
        desktop: { top: "18%", left: "12%", rotate: "-4deg" },
        mobile: { top: "10%", left: "8%", rotate: "-4deg" },
    },
    {
        text: "Charting New Frontiers",
        desktop: { top: "30%", left: "72%", rotate: "3deg" },
        mobile: { top: "22%", left: "50%", rotate: "3deg" },
    },
    {
        text: "Here Be Ideas",
        desktop: { top: "68%", left: "20%", rotate: "2deg" },
        mobile: { top: "75%", left: "10%", rotate: "2deg" },
    },
    {
        text: "The Unknown Awaits",
        desktop: { top: "74%", left: "68%", rotate: "-3deg" },
        mobile: { top: "87%", left: "45%", rotate: "-3deg" },
    },
];

const textClass =
    "absolute select-none whitespace-nowrap text-[#e8ddc4] font-semibold tracking-wide " +
    "text-sm md:text-lg";

function RevealText({
    text,
    pos,
    activeClass,
    pointerRef,
}: {
    text: string;
    pos: Pos;
    activeClass: string;
    pointerRef: React.MutableRefObject<{ x: number; y: number } | null>;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        let raf = 0;
        const tick = () => {
            const el = ref.current;
            const p = pointerRef.current;
            if (el && p) {
                const r = el.getBoundingClientRect();
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                const dist = Math.hypot(p.x - cx, p.y - cy);
                if (dist < REVEAL_RADIUS) {
                    if (hideTimer.current) {
                        clearTimeout(hideTimer.current);
                        hideTimer.current = null;
                    }
                    setVisible(true);
                } else if (visible && !hideTimer.current) {
                    hideTimer.current = setTimeout(() => {
                        setVisible(false);
                        hideTimer.current = null;
                    }, HOLD_MS);
                }
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            if (hideTimer.current) clearTimeout(hideTimer.current);
        };
    }, [visible, pointerRef]);

    return (
        <span
            ref={ref}
            className={`${textClass} ${activeClass}`}
            style={{
                top: pos.top,
                left: pos.left,
                transform: `rotate(${pos.rotate ?? "0deg"})`,
                opacity: visible ? 1 : 0,
                transition: `opacity ${FADE_MS}ms ease-out`,
            }}
        >
            {text}
        </span>
    );
}

export default function HiddenTexts() {
    const pointerRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        // touch devices: register ONLY touch listeners (no ghost-mouse re-plant)
        const isTouch =
            typeof window !== "undefined" &&
            window.matchMedia("(pointer: coarse)").matches;

        const onMove = (e: MouseEvent) => {
            pointerRef.current = { x: e.clientX, y: e.clientY };
        };
        const onTouch = (e: TouchEvent) => {
            const t = e.touches[0];
            if (t) pointerRef.current = { x: t.clientX, y: t.clientY };
        };
        const onClear = () => {
            pointerRef.current = null;
        };

        if (isTouch) {
            window.addEventListener("touchmove", onTouch, { passive: true });
            window.addEventListener("touchend", onClear);
            window.addEventListener("touchcancel", onClear);
        } else {
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseout", onClear);
        }

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseout", onClear);
            window.removeEventListener("touchmove", onTouch);
            window.removeEventListener("touchend", onClear);
            window.removeEventListener("touchcancel", onClear);
        };
    }, []);

    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
            {ITEMS.map((item, i) => (
                <div key={i}>
                    <RevealText
                        text={item.text}
                        pos={item.desktop}
                        activeClass="hidden md:block"
                        pointerRef={pointerRef}
                    />
                    <RevealText
                        text={item.text}
                        pos={item.mobile}
                        activeClass="block md:hidden"
                        pointerRef={pointerRef}
                    />
                </div>
            ))}
        </div>
    );
}