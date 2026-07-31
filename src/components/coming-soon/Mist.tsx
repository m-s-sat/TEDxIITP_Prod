"use client";

import { useEffect, useRef } from "react";

/**
 * Mist
 * ----
 * Wipe-to-reveal mist. Move the pointer (or swipe) to clear it; cleared areas
 * seep back. Texture is a PRE-BAKED PNG so it renders instantly with the page.
 * Motion = cheap per-frame counter-drift + breathing of two texture layers.
 * Textures: /public/mist-a.png and /public/mist-b.png (transparent PNGs).
 */

/* ============================================================
   TUNABLES
   ============================================================ */
const BRUSH_RADIUS = 25; // smaller, tighter reveal
const BRUSH_SOFTNESS = 0.9; // wider feather → no crisp brush rim to ghost
const SEEP_SECONDS = 6; // shapes the early gradual part of the re-mist
const SEEP_FINISH = 0.02; // FLAT per-frame heal alpha (not ×dt); guarantees full heal
const HAZE_ALPHA = 0;

// motion knobs
const DRIFT_AMP = 65; // px — how far each layer wanders
const DRIFT_SPEED = 0.12; // overall speed of the wandering
const BREATHE_AMP = 0.06; // scale pulse (0.06 = ±6% zoom)
const BREATHE_SPEED = 0.05;
const LAYER_ALPHA = 1; // per-layer opacity when composited
const HAZE_COLOR = "rgba(235, 238, 242, 1)";
/* ============================================================ */

export default function Mist() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const view = canvasRef.current;
        if (!view) return;
        const vctx = view.getContext("2d");
        if (!vctx) return;

        // On touch devices we register ONLY touch handlers — never mouse. This
        // removes the whole class of "ghost mouse event re-plants the pointer
        // after touchend" bugs (the tap-and-it-sticks issue).
        const isTouch =
            typeof window !== "undefined" &&
            window.matchMedia("(pointer: coarse)").matches;

        let W = 0;
        let H = 0;
        let wipeMask: HTMLCanvasElement;
        let wctx: CanvasRenderingContext2D;
        let pointer: { x: number; y: number } | null = null;
        let rafId = 0;
        let last = performance.now();

        // load the two baked textures
        const texA = new Image();
        const texB = new Image();
        texA.src = "/mist-a.png";
        texB.src = "/mist-b.png";
        let loaded = 0;
        const onLoad = () => {
            loaded++;
        };
        texA.onload = onLoad;
        texB.onload = onLoad;

        function build() {
            W = view!.width = window.innerWidth;
            H = view!.height = window.innerHeight;
            wipeMask = document.createElement("canvas");
            wipeMask.width = W;
            wipeMask.height = H;
            wctx = wipeMask.getContext("2d")!;
            wctx.fillStyle = "#fff";
            wctx.fillRect(0, 0, W, H);
            primeMask();
        }

        // PRIME: run the runtime heal to convergence across the whole mask so the
        // initial state is byte-identical to a healed region → no pristine-vs-
        // healed boundary showing as a trail.
        function primeMask() {
            wctx.globalCompositeOperation = "destination-out";
            wctx.globalAlpha = 1;
            wctx.fillStyle = "#000";
            wctx.fillRect(0, 0, W, H);
            wctx.globalCompositeOperation = "source-over";
            for (let i = 0; i < 60; i++) {
                wctx.globalAlpha = SEEP_FINISH;
                wctx.fillStyle = "#fff";
                wctx.fillRect(0, 0, W, H);
            }
            wctx.globalAlpha = 1;
        }

        // draw one texture layer, scaled to cover W×H, offset + scaled for motion
        function drawLayer(tex: HTMLImageElement, dx: number, dy: number, scale: number) {
            const w = W * scale;
            const h = H * scale;
            const ox = (W - w) / 2 + dx;
            const oy = (H - h) / 2 + dy;
            vctx!.drawImage(tex, ox, oy, w, h);
        }

        function frame(now: number) {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            const t = now / 1000;

            // --- wipe mask (persists) ---
            // heal back to fully opaque: proportional ramp (SEEP_SECONDS) plus a
            // flat step (SEEP_FINISH) that guarantees it reaches true 255.
            const proportional = dt / SEEP_SECONDS;
            const healAlpha = Math.min(1, proportional + SEEP_FINISH);
            wctx.globalCompositeOperation = "source-over";
            wctx.globalAlpha = healAlpha;
            wctx.fillStyle = "#fff";
            wctx.fillRect(0, 0, W, H);
            wctx.globalAlpha = 1;

            if (pointer) {
                const r = BRUSH_RADIUS;
                const g = wctx.createRadialGradient(
                    pointer.x, pointer.y, r * (1 - BRUSH_SOFTNESS),
                    pointer.x, pointer.y, r
                );
                g.addColorStop(0, "rgba(0,0,0,1)");
                g.addColorStop(0.5, "rgba(0,0,0,0.6)");
                g.addColorStop(0.8, "rgba(0,0,0,0.2)");
                g.addColorStop(1, "rgba(0,0,0,0)");
                wctx.globalCompositeOperation = "destination-out";
                wctx.fillStyle = g;
                wctx.beginPath();
                wctx.arc(pointer.x, pointer.y, r, 0, Math.PI * 2);
                wctx.fill();
                wctx.globalCompositeOperation = "source-over";
            }

            // --- recompose ---
            vctx!.globalCompositeOperation = "source-over";
            vctx!.clearRect(0, 0, W, H);

            if (loaded >= 2) {
                // base scale computed so overscan margin always exceeds max drift
                // on the SMALLEST dimension (fixes edge line on both desktop top
                // and narrow-mobile right side, aspect-ratio-proof).
                const minDim = Math.min(W, H);
                const needed = 1 + (2 * (DRIFT_AMP + 20)) / minDim;
                const baseScale = Math.max(1.25, needed);
                const scaleA = baseScale + Math.sin(t * BREATHE_SPEED) * BREATHE_AMP;
                const scaleB = baseScale + Math.cos(t * BREATHE_SPEED * 1.3) * BREATHE_AMP;

                // counter-drift so the overlap density churns (reads as living)
                const ax = Math.sin(t * DRIFT_SPEED) * DRIFT_AMP;
                const ay = Math.cos(t * DRIFT_SPEED * 0.8) * DRIFT_AMP;
                const bx = -Math.cos(t * DRIFT_SPEED * 0.9) * DRIFT_AMP;
                const by = -Math.sin(t * DRIFT_SPEED * 1.1) * DRIFT_AMP;

                vctx!.globalAlpha = LAYER_ALPHA;
                drawLayer(texA, ax, ay, scaleA);
                vctx!.globalAlpha = LAYER_ALPHA;
                drawLayer(texB, bx, by, scaleB);
                vctx!.globalAlpha = 1;

                // erase where wiped
                vctx!.globalCompositeOperation = "destination-in";
                vctx!.drawImage(wipeMask, 0, 0);
                vctx!.globalCompositeOperation = "source-over";
            }

            rafId = requestAnimationFrame(frame);
        }

        // --- handlers ---
        const onMouseMove = (e: MouseEvent) => {
            const r = view.getBoundingClientRect();
            const scaleX = view.width / r.width;
            const scaleY = view.height / r.height;
            pointer = {
                x: (e.clientX - r.left) * scaleX,
                y: (e.clientY - r.top) * scaleY,
            };
        };
        const onMouseLeave = () => {
            pointer = null;
        };
        const onTouchMove = (e: TouchEvent) => {
            const r = view.getBoundingClientRect();
            const tp = e.touches[0];
            const scaleX = view.width / r.width;
            const scaleY = view.height / r.height;
            pointer = {
                x: (tp.clientX - r.left) * scaleX,
                y: (tp.clientY - r.top) * scaleY,
            };
            e.preventDefault();
        };
        const onTouchEnd = () => {
            pointer = null;
        };

        // register ONLY the relevant input type
        if (isTouch) {
            view.addEventListener("touchmove", onTouchMove, { passive: false });
            view.addEventListener("touchend", onTouchEnd);
            view.addEventListener("touchcancel", onTouchEnd);
        } else {
            view.addEventListener("mousemove", onMouseMove);
            view.addEventListener("mouseleave", onMouseLeave);
        }
        window.addEventListener("resize", build);

        build();
        rafId = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(rafId);
            view.removeEventListener("mousemove", onMouseMove);
            view.removeEventListener("mouseleave", onMouseLeave);
            view.removeEventListener("touchmove", onTouchMove);
            view.removeEventListener("touchend", onTouchEnd);
            view.removeEventListener("touchcancel", onTouchEnd);
            window.removeEventListener("resize", build);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{
                touchAction: "none",
                cursor: "crosshair",
                maskImage:
                    "radial-gradient(ellipse 95% 95% at 50% 50%, #000 55%, transparent 100%)",
                WebkitMaskImage:
                    "radial-gradient(ellipse 95% 95% at 50% 50%, #000 55%, transparent 100%)",
            }}
        />
    );
}