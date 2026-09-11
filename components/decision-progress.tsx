type DecisionProgressProps = {
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7
  label: string
  className?: string
}

export function DecisionProgress({
  step,
  label,
  className = "",
}: DecisionProgressProps) {
  return (
    <div
      className={`rounded-xl border border-comerza-border bg-white px-4 py-3 shadow-[0_2px_8px_rgba(0,46,109,0.05)] ${className}`}
      role="progressbar"
      aria-label="Progreso de la evaluación"
      aria-valuemin={1}
      aria-valuemax={7}
      aria-valuenow={step}
      aria-valuetext={`Paso ${step} de 7: ${label}`}
    >
      <div className="flex items-center justify-between gap-3 text-xs font-bold">
        <span className="text-comerza-muted">Paso {step} de 7</span>
        <span className="text-comerza-navy">{label}</span>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1.5" aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => (
          <span
            key={index}
            className={`h-1.5 rounded-full ${
              index < step ? "bg-comerza-cyan" : "bg-[#dedfe1]"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
