// components/country-select.tsx
'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Country } from 'country-state-city';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function CountrySelect({ value, onChange, className }: Props) {
  const countries = Country.getAllCountries();

  return (
    <div className="w-full">
      <Label htmlFor="country" className="font-normal">Country*</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger id="country" className={cn('mt-2 w-full', className)}>
          <SelectValue placeholder="Select your country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.isoCode} value={country.isoCode}>
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
