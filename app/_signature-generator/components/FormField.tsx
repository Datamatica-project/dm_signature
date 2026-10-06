import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  inputId: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function fieldErrorId(inputId: string) {
  return `${inputId}-error`;
}

export function FormField({ label, inputId, error, hint, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-ink-soft text-[13px] font-semibold">
        {label} <span className="text-brand">*</span>
      </label>
      {children}
      {error && (
        <span id={fieldErrorId(inputId)} className="text-brand text-xs">
          {error}
        </span>
      )}
      {hint && !error && <span className="text-subtle text-xs">{hint}</span>}
    </div>
  );
}
