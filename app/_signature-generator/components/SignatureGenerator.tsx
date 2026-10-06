'use client';

import { useEffect, useRef, useState } from 'react';
import { useElementSize } from '../hooks/useElementSize';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { generateSignature, toInputKey } from '../lib/generate-signature';
import { normalizeSignatureInput, toSignatureValues } from '../lib/signature-input';
import { buildPreviewDocument, buildSignatureHtml } from '../lib/signature-html';
import { validateSignatureInput } from '../lib/validation';
import type { GeneratedSignature, SignatureFormState } from '../types';
import { GeneratedCodePanel } from './GeneratedCodePanel';
import { PreviewPanel } from './PreviewPanel';
import { SignatureForm } from './SignatureForm';

const INITIAL_FORM: SignatureFormState = {
  ko: '',
  en: '',
  departmentSelection: '',
  customDepartment: '',
  title: '',
  phone: '',
  emailId: '',
};

// Tailwind xl 브레이크포인트와 일치해야 한다.
const SIDE_BY_SIDE_QUERY = '(min-width: 80rem)';

export function SignatureGenerator() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [hasTriedGenerate, setHasTriedGenerate] = useState(false);
  const [generated, setGenerated] = useState<GeneratedSignature | null>(null);
  const [formRef, formSize] = useElementSize<HTMLFormElement>();
  const codePanelRef = useRef<HTMLElement>(null);
  const isSideBySide = useMediaQuery(SIDE_BY_SIDE_QUERY);

  const input = normalizeSignatureInput(form);
  const errors = hasTriedGenerate
    ? validateSignatureInput(input, {
        departmentSelection: form.departmentSelection,
        rawPhone: form.phone,
      })
    : {};
  const inputKey = toInputKey(input);
  const previewDocument = buildPreviewDocument(buildSignatureHtml(toSignatureValues(input, true)));

  useEffect(() => {
    if (!generated) return;
    codePanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [generated]);

  const updateField = <K extends keyof SignatureFormState>(
    field: K,
    value: SignatureFormState[K]
  ) => setForm((previous) => ({ ...previous, [field]: value }));

  const handleGenerate = () => {
    setHasTriedGenerate(true);
    const result = generateSignature(form);
    if (result.status === 'success') setGenerated(result.signature);
  };

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <SignatureForm
          formRef={formRef}
          form={form}
          errors={errors}
          phoneHint={input.phone && !errors.phone ? input.phone.display : undefined}
          onFieldChange={updateField}
          onGenerate={handleGenerate}
        />
        <PreviewPanel
          previewDocument={previewDocument}
          formHeight={isSideBySide ? formSize.height : 0}
        />
      </div>

      {generated && (
        <GeneratedCodePanel
          panelRef={codePanelRef}
          signature={generated}
          isStale={generated.inputKey !== inputKey}
          onRegenerate={handleGenerate}
        />
      )}
    </>
  );
}
