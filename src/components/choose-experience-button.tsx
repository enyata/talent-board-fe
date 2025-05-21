'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  level: string;
  selected?: boolean;
  onSelect: (level: string) => void;
  className?: string;
  selectedBgClass?: string;
  selectedBorderClass?: string;
};

export function ChooseExperienceLevel({
  level,
  selected = false,
  onSelect,
  className,
  selectedBorderClass= '',
  selectedBgClass= '',
}: Props) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => onSelect(level)}
      className={cn(
        ' h-[42px] flex-1 capitalize font-normal border-px', 
        selected && `${selectedBgClass} ${selectedBorderClass || ' border-primary'}`,
        className
      )}
    >
      {level === 'entry' ? 'Entry Level' : level}
    </Button>
  );
}
