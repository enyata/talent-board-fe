// components/country-select.tsx
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { State } from "country-state-city";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Props = {
  countryCode: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

export function StateSelect({
  countryCode,
  value,
  onChange,
  className,
  disabled,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const states = React.useMemo(
    () => State.getStatesOfCountry(countryCode),
    [countryCode]
  );

  const selectedState = states.find((c) => c.name === value);

  return (
    <div className="w-full">
      <Label className="font-normal">State</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("mt-2 w-full justify-between font-normal", className)}
            disabled={disabled}
          >
            {selectedState ? (
              <span className="flex items-center gap-2">
                {selectedState.name}
              </span>
            ) : countryCode ? (
              "Select your state"
            ) : (
              "Select a country first"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search state..." />
            <CommandList>
              <CommandEmpty>No state found.</CommandEmpty>
              <CommandGroup>
                {states.map((state) => (
                  <CommandItem
                    key={state.isoCode}
                    value={state.name}
                    onSelect={() => {
                      onChange(state.name);
                      setOpen(false);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span>{state.name}</span>
                    </span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === state.isoCode ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
