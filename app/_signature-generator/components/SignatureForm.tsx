import type { FormEvent, RefObject } from 'react';
import type { SignatureFormState, ValidationErrors } from '../types';
import { DepartmentField } from './DepartmentField';
import { EmailField } from './EmailField';
import { FormField } from './FormField';
import { TextInput } from './TextInput';

interface SignatureFormProps {
  formRef: RefObject<HTMLFormElement | null>;
  form: SignatureFormState;
  errors: ValidationErrors;
  phoneHint?: string;
  onFieldChange: <K extends keyof SignatureFormState>(
    field: K,
    value: SignatureFormState[K]
  ) => void;
  onGenerate: () => void;
}

export function SignatureForm({
  formRef,
  form,
  errors,
  phoneHint,
  onFieldChange,
  onGenerate,
}: SignatureFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onGenerate();
  };

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="signature-form-title"
      className="border-line flex flex-col gap-5 rounded-[10px] border bg-white p-5 sm:p-7"
    >
      <h2 id="signature-form-title" className="text-base font-bold">
        내 정보 입력
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="한글 이름" inputId="name-ko" error={errors.ko}>
          <TextInput
            id="name-ko"
            value={form.ko}
            invalid={Boolean(errors.ko)}
            onValueChange={(value) => onFieldChange('ko', value)}
            placeholder="홍길동"
          />
        </FormField>
        <FormField label="영문 이름" inputId="name-en" error={errors.en}>
          <TextInput
            id="name-en"
            value={form.en}
            invalid={Boolean(errors.en)}
            onValueChange={(value) => onFieldChange('en', value)}
            placeholder="Gildong Hong"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DepartmentField
          selection={form.departmentSelection}
          customDepartment={form.customDepartment}
          error={errors.department}
          onSelectionChange={(value) => onFieldChange('departmentSelection', value)}
          onCustomDepartmentChange={(value) => onFieldChange('customDepartment', value)}
        />
        <FormField label="직급" inputId="job-title" error={errors.title}>
          <TextInput
            id="job-title"
            value={form.title}
            invalid={Boolean(errors.title)}
            onValueChange={(value) => onFieldChange('title', value)}
            placeholder="연구원"
          />
        </FormField>
      </div>

      <FormField
        label="휴대폰 번호"
        inputId="phone"
        error={errors.phone}
        hint={phoneHint && `서명 표기: ${phoneHint}`}
      >
        <TextInput
          id="phone"
          type="tel"
          inputMode="numeric"
          value={form.phone}
          invalid={Boolean(errors.phone)}
          onValueChange={(value) => onFieldChange('phone', value)}
          placeholder="010-1234-5678"
        />
      </FormField>

      <EmailField
        emailId={form.emailId}
        error={errors.email}
        onEmailIdChange={(value) => onFieldChange('emailId', value)}
      />

      <div className="bg-surface-muted flex flex-col gap-1.5 rounded-md px-4 py-3.5">
        <span className="text-muted text-xs font-semibold">고정 항목 (수정 불가)</span>
        <span className="text-ink-soft text-[13px]">
          웹사이트 · 본사/연구소 주소 · 전북 사업장 주소 · 로고
        </span>
      </div>

      <button
        type="submit"
        className="bg-brand hover:bg-brand-hover focus-visible:outline-brand h-12 cursor-pointer rounded-md text-[15px] font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        서명 HTML 생성
      </button>
    </form>
  );
}
