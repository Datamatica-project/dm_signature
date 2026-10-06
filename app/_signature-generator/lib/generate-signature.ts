import type {
  GeneratedSignature,
  NormalizedSignatureInput,
  SignatureFormState,
  ValidationErrors,
} from '../types';
import { normalizeSignatureInput, toSignatureValues } from './signature-input';
import { buildSignatureHtml } from './signature-html';
import { hasErrors, validateSignatureInput } from './validation';

export type GenerateSignatureResult =
  | { status: 'success'; signature: GeneratedSignature }
  | { status: 'invalid'; errors: ValidationErrors };

export function toInputKey(input: NormalizedSignatureInput): string {
  return JSON.stringify(input);
}

export function generateSignature(form: SignatureFormState): GenerateSignatureResult {
  const input = normalizeSignatureInput(form);
  const errors = validateSignatureInput(input, {
    departmentSelection: form.departmentSelection,
    rawPhone: form.phone,
  });
  if (hasErrors(errors)) return { status: 'invalid', errors };

  return {
    status: 'success',
    signature: {
      html: buildSignatureHtml(toSignatureValues(input, false)),
      inputKey: toInputKey(input),
      summary: `${input.ko} · ${input.department} / ${input.title}`,
      fileName: `메일서명_${input.ko}.html`,
    },
  };
}
