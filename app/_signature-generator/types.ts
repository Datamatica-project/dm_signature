import type { CUSTOM_DEPARTMENT, DEPARTMENTS } from './constants';

export type Department = (typeof DEPARTMENTS)[number];

export type DepartmentSelection = '' | Department | typeof CUSTOM_DEPARTMENT;

export type PreviewTab = 'desktop' | 'mobile';

export interface SignatureFormState {
  ko: string;
  en: string;
  departmentSelection: DepartmentSelection;
  customDepartment: string;
  title: string;
  phone: string;
  emailId: string;
}

export type FieldName = 'ko' | 'en' | 'department' | 'title' | 'phone' | 'email';

export type ValidationErrors = Partial<Record<FieldName, string>>;

export interface FormattedPhone {
  display: string;
  tel: string;
}

export interface NormalizedSignatureInput {
  ko: string;
  en: string;
  department: string;
  title: string;
  phone: FormattedPhone | null;
  emailId: string;
}

export interface SignatureValues {
  ko: string;
  en: string;
  department: string;
  title: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
}

export interface GeneratedSignature {
  html: string;
  inputKey: string;
  summary: string;
  fileName: string;
}
