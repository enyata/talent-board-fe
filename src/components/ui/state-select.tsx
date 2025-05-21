// components/state-select.tsx
'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { State } from 'country-state-city';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Props = {
  countryCode: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

export function StateSelect({ countryCode, value, onChange, disabled, className }: Props) {
  const states = countryCode ? State.getStatesOfCountry(countryCode) : [];

  return (
    <div className="w-full">
      <Label htmlFor="state" className="font-normal">State*</Label>
      <Select onValueChange={onChange} value={value} disabled={disabled || !countryCode}>
        <SelectTrigger id="state" className={cn('mt-2 w-full', className)}>
          <SelectValue placeholder={countryCode ? 'Select your state' : 'Select a country first'} />
        </SelectTrigger>
        <SelectContent>
          {states.map((state) => (
            <SelectItem key={state.isoCode} value={state.name}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
