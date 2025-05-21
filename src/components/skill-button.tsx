'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  skill: string;
  selected?: boolean;
  onToggle: (skill: string, selected: boolean) => void;
  className?: string;
};

export function SkillButton({ skill, selected = false, onToggle, className }: Props) {
  return (
    <Button
      type="button"
      onClick={() => onToggle(skill, !selected)}
      className={cn(
        'h-[24px] rounded-[3px] px-2 text-[12px] border-[1px] bg-[#F5F5F5] text-[#5F5F5F] border-[#696969]',
        selected
          ? ' border-primary bg-primary text-white'
          : '',
        className
      )}
    >
      {skill}
    </Button>
  );
}
