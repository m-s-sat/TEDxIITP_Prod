"use client";

import * as React from "react";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, checked, onCheckedChange, id, ...props }, ref) => {
    const uniqueId = id || React.useId();
    
    return (
      <div className="flex items-center space-x-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            id={uniqueId}
            ref={ref}
            checked={checked}
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            className="sr-only"
            {...props}
          />
          <div
            onClick={() => onCheckedChange?.(!checked)}
            className={`w-6 h-6 rounded-md border-2 transition-all duration-300 flex items-center justify-center
              ${checked 
                ? "bg-[#eb0028] border-[#eb0028] shadow-[0_2px_10px_rgba(235,0,40,0.3)]" 
                : "border-neutral-700 bg-neutral-900 group-hover:border-neutral-500"
              }
            `}
          >
            {checked && <Check className="w-4 h-4 text-white stroke-[3px] animate-scaleIn" />}
          </div>
        </div>
        {label && (
          <label
            htmlFor={uniqueId}
            className="text-neutral-300 group-hover:text-white transition-colors duration-300 select-none text-sm font-medium cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
