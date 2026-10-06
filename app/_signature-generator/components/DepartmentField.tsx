import clsx from 'clsx';
import { CUSTOM_DEPARTMENT, DEPARTMENTS } from '../constants';
import type { DepartmentSelection } from '../types';
import { fieldErrorId, FormField } from './FormField';
import { TextInput } from './TextInput';

interface DepartmentFieldProps {
  selection: DepartmentSelection;
  customDepartment: string;
  error?: string;
  onSelectionChange: (selection: DepartmentSelection) => void;
  onCustomDepartmentChange: (value: string) => void;
}

const SELECT_ID = 'department';

function isDepartmentSelection(value: string): value is DepartmentSelection {
  return value === '' || value === CUSTOM_DEPARTMENT || DEPARTMENTS.some((dept) => dept === value);
}

export function DepartmentField({
  selection,
  customDepartment,
  error,
  onSelectionChange,
  onCustomDepartmentChange,
}: DepartmentFieldProps) {
  const isCustom = selection === CUSTOM_DEPARTMENT;

  return (
    <FormField label="부서" inputId={SELECT_ID} error={error}>
      <select
        id={SELECT_ID}
        value={selection}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? fieldErrorId(SELECT_ID) : undefined}
        onChange={(event) => {
          if (isDepartmentSelection(event.target.value)) onSelectionChange(event.target.value);
        }}
        className={clsx(
          'focus:border-brand text-ink h-[42px] rounded-md border bg-white px-2.5 text-[15px] outline-none',
          error ? 'border-danger' : 'border-line-strong'
        )}
      >
        <option value="">부서 선택</option>
        {DEPARTMENTS.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
        <option value={CUSTOM_DEPARTMENT}>직접 입력</option>
      </select>
      {isCustom && (
        <TextInput
          id="custom-department"
          aria-label="부서명 직접 입력"
          value={customDepartment}
          invalid={Boolean(error)}
          onValueChange={onCustomDepartmentChange}
          placeholder="부서명 입력"
        />
      )}
    </FormField>
  );
}
