import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?:  string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-[#A89FC8] uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "h-10 w-full px-3 rounded-md text-sm",
          "bg-[#0D0B14] border border-[rgba(255,255,255,0.08)]",
          "text-[#F0EEFF] placeholder:text-[#6B6184]",
          "transition-colors duration-150",
          "focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/30",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-[#6B6184]">{hint}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-[#A89FC8] uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={4}
        className={cn(
          "w-full px-3 py-2.5 rounded-md text-sm resize-none",
          "bg-[#0D0B14] border border-[rgba(255,255,255,0.08)]",
          "text-[#F0EEFF] placeholder:text-[#6B6184]",
          "focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50",
          error && "border-red-500/50",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-[#A89FC8] uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "h-10 w-full px-3 rounded-md text-sm appearance-none cursor-pointer",
          "bg-[#0D0B14] border border-[rgba(255,255,255,0.08)]",
          "text-[#F0EEFF]",
          "focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50",
          error && "border-red-500/50",
          className
        )}
        {...props}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
