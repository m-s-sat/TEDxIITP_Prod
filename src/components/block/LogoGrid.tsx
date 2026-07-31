"use client";

import {
  useEffect,
  useState,
  memo,
  type CSSProperties,
} from "react";
import Image from "next/image";

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

export interface LogoGridProps {
  logos: LogoItem[];
  /** height of each logo image */
  logoHeight: ResponsiveSize;
  /** gap between logos */
  gap: ResponsiveSize;
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

export const LogoGrid = memo(function LogoGrid({
  logos,
  logoHeight,
  gap,
  scaleOnHover = true,
  ariaLabel = "Logo grid",
  className,
}: LogoGridProps) {
  const bp = useBreakpoint();
  const resolvedLogoHeight = resolveSize(logoHeight, bp);
  const resolvedGap = resolveSize(gap, bp);

  const containerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: `${resolvedGap}px`,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  return (
    <div
      className={["w-full max-w-7xl mx-auto px-1 sm:px-4 flex justify-center", className].filter(Boolean).join(" ")}
      role="region"
      aria-label={ariaLabel}
    >
      <div style={containerStyle}>
        {logos.map((item, index) => {
          const itemStyle: CSSProperties = {
            width: `${resolvedLogoHeight * 1.8}px`,
            height: `${resolvedLogoHeight}px`,
          };

          return (
            <div
              key={`${item.alt}-${index}`}
              className={[
                "flex items-center justify-center shrink-0",
                scaleOnHover && "group overflow-visible",
              ]
                .filter(Boolean)
                .join(" ")}
              style={itemStyle}
            >
              <div
                className={[
                  "relative flex items-center justify-center transition-transform duration-300 ease-out w-full h-full",
                  scaleOnHover && "group-hover:scale-[1.15]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div
                  className="relative w-full h-full"
                  style={{ width: "100%", height: "100%" }}
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
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LogoGrid;