import clsx from 'clsx';
import { EMAIL_DOMAIN } from '../constants';
import { fieldErrorId, FormField } from './FormField';

interface EmailFieldProps {
  emailId: string;
  error?: string;
  onEmailIdChange: (value: string) => void;
}

const INPUT_ID = 'email-id';

export function EmailField({ emailId, error, onEmailIdChange }: EmailFieldProps) {
  return (
    <FormField label="이메일" inputId={INPUT_ID} error={error}>
      <div
        className={clsx(
          'focus-within:border-brand flex h-[42px] items-stretch overflow-hidden rounded-md border bg-white',
          error ? 'border-danger' : 'border-line-strong'
        )}
      >
        <input
          id={INPUT_ID}
          value={emailId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? fieldErrorId(INPUT_ID) : undefined}
          onChange={(event) => onEmailIdChange(event.target.value)}
          placeholder="gildong"
          className="min-w-0 flex-1 bg-transparent px-3 text-[15px] outline-none"
        />
        <span className="text-muted bg-canvas border-line flex items-center border-l px-3 text-sm">
          @{EMAIL_DOMAIN}
        </span>
      </div>
    </FormField>
  );
}
