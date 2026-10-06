import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { fieldErrorId } from './FormField';

interface TextInputProps extends Omit<ComponentProps<'input'>, 'id' | 'onChange'> {
  id: string;
  invalid: boolean;
  onValueChange: (value: string) => void;
}

export function TextInput({ id, invalid, onValueChange, className, ...props }: TextInputProps) {
  return (
    <input
      id={id}
      aria-invalid={invalid}
      aria-describedby={invalid ? fieldErrorId(id) : undefined}
      onChange={(event) => onValueChange(event.target.value)}
      className={clsx(
        'focus:border-brand h-[42px] rounded-md border bg-white px-3 text-[15px] outline-none',
        invalid ? 'border-danger' : 'border-line-strong',
        className
      )}
      {...props}
    />
  );
}
