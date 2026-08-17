export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = { sm: "w-4 h-4 border-2", md: "w-6 h-6 border-2", lg: "w-10 h-10 border-[3px]" }[size];
  return (
    <span
      role="status"
      aria-label="Carregando"
      className={`${s} rounded-full border-violet-500/30 border-t-violet-500 animate-spin inline-block`}
    />
  );
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <Spinner size="lg" />
    </div>
  );
}
