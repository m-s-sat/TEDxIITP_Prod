"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  type CSSProperties,
} from "react";
import Image from "next/image";

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

export interface LogoItem {
  image: string;
  alt: string;
}

export interface ResponsiveSize {
  /** value for mobile (< 640px) */
  mobile: number;
  /** value for tablet (640px – 1023px) */
  tablet?: number;
  /** value for desktop (>= 1024px) */
  desktop: number;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  /** pixels per second */
  speed?: number;
  direction?: "left" | "right";
  /** height of the outer strip container */
  stripHeight: ResponsiveSize;
  /** height of each logo image */
  logoHeight: ResponsiveSize;
  /** gap between logos */
  gap: ResponsiveSize;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
}

type Breakpoint = "mobile" | "tablet" | "desktop";

const useBreakpoint = (): Breakpoint => {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
};

const resolveSize = (size: ResponsiveSize, bp: Breakpoint): number => {
  if (bp === "mobile") return size.mobile;
  if (bp === "tablet") return size.tablet ?? size.desktop;
  return size.desktop;
};

const useResizeObserver = (
  callback: () => void,
  elements: React.RefObject<HTMLElement | null>[],
  dependencies: unknown[]
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => observers.forEach((o) => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, elements, ...dependencies]);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: unknown[]
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remaining = images.length;
    const handleLoad = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };
    images.forEach((img) => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleLoad();
      } else {
        htmlImg.addEventListener("load", handleLoad, { once: true });
        htmlImg.addEventListener("error", handleLoad, { once: true });
      }
    });
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, seqRef, ...dependencies]);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  isHovered: boolean,
  hoverSpeed: number | undefined
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;

    // Do not start until LogoLoop has measured its width.
    if (!track || seqWidth <= 0) return;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;

      lastTimestampRef.current = timestamp;

      const target =
        isHovered && hoverSpeed !== undefined
          ? hoverSpeed
          : targetVelocity;

      const easing =
        1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);

      velocityRef.current +=
        (target - velocityRef.current) * easing;

      let nextOffset =
        offsetRef.current + velocityRef.current * deltaTime;

      nextOffset =
        ((nextOffset % seqWidth) + seqWidth) % seqWidth;

      offsetRef.current = nextOffset;

      track.style.transform = `translate3d(${-nextOffset}px, 0, 0)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Important: reset timestamp when returning to this page.
      lastTimestampRef.current = null;

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startAnimation();
      }
    };

    startAnimation();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      lastTimestampRef.current = null;

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [
    targetVelocity,
    seqWidth,
    isHovered,
    hoverSpeed,
    trackRef,
  ]);
};
export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 80,
  direction = "left",
  stripHeight,
  logoHeight,
  gap,
  fadeOut = true,
  fadeOutColor = "#000000",
  scaleOnHover = true,
  ariaLabel = "Logo loop",
  className,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const seqRef = useRef<HTMLUListElement | null>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const bp = useBreakpoint();
  const resolvedStripHeight = resolveSize(stripHeight, bp);
  const resolvedLogoHeight = resolveSize(logoHeight, bp);
  const resolvedGap = resolveSize(gap, bp);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = direction === "left" ? 1 : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction]);

  const hoverSpeed = scaleOnHover ? targetVelocity * 0.4 : undefined;

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect?.().width ?? 0;

    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, resolvedGap, resolvedLogoHeight]);
  useImageLoader(seqRef, updateDimensions, [logos, resolvedGap, resolvedLogoHeight]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, hoverSpeed);

  const handleMouseEnter = useCallback(() => {
    if (scaleOnHover) setIsHovered(true);
  }, [scaleOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (scaleOnHover) setIsHovered(false);
  }, [scaleOnHover]);

  const itemStyle: CSSProperties = { marginRight: `${resolvedGap}px` };

  const renderLogoItem = useCallback(
    (item: LogoItem, key: React.Key) => (
      <li
        className={[
          "flex-none flex items-center justify-center h-full shrink-0",
          scaleOnHover && "group overflow-visible",
        ]
          .filter(Boolean)
          .join(" ")}
        style={itemStyle}
        key={key}
        role="listitem"
      >
        <div
          className={[
            "relative flex items-center justify-center transition-transform duration-300 ease-out",
            scaleOnHover && "group-hover:scale-[1.15]",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ height: `${resolvedLogoHeight}px` }}
        >
          {/* Wrapper gives a sized box; Image with fill + object-contain preserves aspect ratio */}
          <div
            className="relative"
            style={{ height: `${resolvedLogoHeight}px`, width: `${resolvedLogoHeight * 1.8}px` }}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-contain select-none pointer-events-none"
              draggable={false}
              unoptimized
            />
          </div>
        </div>
      </li>
    ),
    [itemStyle, resolvedLogoHeight, scaleOnHover]
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="flex items-center h-full"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
        </ul>
      )),
    [copyCount, logos, renderLogoItem]
  );

  return (
    <div
      ref={containerRef}
      className={["relative w-full overflow-hidden flex justify-center", className]
        .filter(Boolean)
        .join(" ")}
      style={{ height: `${resolvedStripHeight}px` }}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="flex w-max h-full items-center will-change-transform select-none relative z-0"
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {logoLists}
      </div>

      {fadeOut && (
        <>
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 z-10"
            style={{
              width: "clamp(24px, 8%, 120px)",
              background: `linear-gradient(to right, ${fadeOutColor} 0%, rgba(0,0,0,0) 100%)`,
            }}
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 right-0 z-10"
            style={{
              width: "clamp(24px, 8%, 120px)",
              background: `linear-gradient(to left, ${fadeOutColor} 0%, rgba(0,0,0,0) 100%)`,
            }}
          />
        </>
      )}
    </div>
  );
});

export default LogoLoop;