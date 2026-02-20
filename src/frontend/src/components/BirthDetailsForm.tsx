import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { AstroPerson } from '@/backend';
import { marathiStrings } from '@/i18n/marathi';
import { validateRequired, validateDate } from '@/utils/validation';

interface BirthDetailsFormProps {
  onSubmit: (person: AstroPerson) => void;
}

export default function BirthDetailsForm({ onSubmit }: BirthDetailsFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    const nameError = validateRequired(formData.name);
    if (nameError) newErrors.name = nameError;

    const dateError = validateDate(formData.dateOfBirth);
    if (dateError) newErrors.dateOfBirth = dateError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const person: AstroPerson = {
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      timeOfBirth: formData.timeOfBirth || undefined,
      placeOfBirth: formData.placeOfBirth || undefined,
    };

    onSubmit(person);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{marathiStrings.form.name}</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder={marathiStrings.form.namePlaceholder}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">{marathiStrings.form.dateOfBirth}</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          className={errors.dateOfBirth ? 'border-destructive' : ''}
        />
        {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeOfBirth">{marathiStrings.form.timeOfBirth}</Label>
        <Input
          id="timeOfBirth"
          type="time"
          value={formData.timeOfBirth}
          onChange={(e) => handleChange('timeOfBirth', e.target.value)}
          placeholder={marathiStrings.form.timePlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="placeOfBirth">{marathiStrings.form.placeOfBirth}</Label>
        <Input
          id="placeOfBirth"
          value={formData.placeOfBirth}
          onChange={(e) => handleChange('placeOfBirth', e.target.value)}
          placeholder={marathiStrings.form.placePlaceholder}
        />
      </div>

      <Button type="submit" className="w-full bg-deepGold hover:bg-deepGold/90">
        {marathiStrings.form.submit}
      </Button>
    </form>
  );
}
