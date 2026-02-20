import { marathiStrings } from '@/i18n/marathi';

export function validateRequired(value: string): string | null {
  if (!value || value.trim() === '') {
    return marathiStrings.validation.required;
  }
  return null;
}

export function validateDate(value: string): string | null {
  if (!value) {
    return marathiStrings.validation.required;
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return marathiStrings.validation.invalidDate;
  }

  return null;
}
