import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-500 overflow-hidden group
          ${glow ? "hover:border-[#eb0028]/45 hover:shadow-[0_0_30px_rgba(235,0,40,0.15)]" : "hover:border-white/20"}
          ${className}
        `}
        {...props}
      >
        {glow && (
          <div className="absolute -inset-px bg-gradient-to-r from-transparent via-[#eb0028]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
