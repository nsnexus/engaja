import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-500 rounded-full tracking-wide leading-none",
  {
    variants: {
      variant: {
        pending:    "status-pending",
        processing: "status-processing",
        completed:  "status-completed",
        cancelled:  "status-cancelled",
        brand:  "bg-violet-500/15 text-violet-300",
        muted:  "bg-white/5 text-[#A89FC8]",
      },
    },
    defaultVariants: { variant: "muted" },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  children: React.ReactNode;
  dot?: boolean;
}

export function Badge({ variant, className, children, dot }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {dot && (
        <span
          aria-hidden
          className="w-1.5 h-1.5 rounded-full bg-current"
        />
      )}
      {children}
    </span>
  );
}
