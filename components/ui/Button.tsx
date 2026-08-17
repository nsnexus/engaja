"use client";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // base
  "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0B14] disabled:opacity-40 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-violet-600 text-white shadow-[0_1px_3px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-violet-500 active:scale-[0.97]",
        secondary:
          "bg-[#1E1830] text-[#F0EEFF] border border-[rgba(255,255,255,0.08)] hover:bg-[#241D38] hover:border-[rgba(255,255,255,0.14)] active:scale-[0.97]",
        ghost:
          "text-[#A89FC8] hover:text-[#F0EEFF] hover:bg-[#1E1830] active:scale-[0.97]",
        danger:
          "bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600/20 active:scale-[0.97]",
        link:
          "text-violet-400 underline-offset-4 hover:underline hover:text-violet-300 p-0 h-auto",
      },
      size: {
        sm:   "h-8  px-3  text-xs",
        md:   "h-9  px-4  text-sm",
        lg:   "h-11 px-6  text-sm",
        icon: "h-9  w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          aria-hidden
          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
        />
      )}
      {children}
    </button>
  )
);
Button.displayName = "Button";

export { buttonVariants };
