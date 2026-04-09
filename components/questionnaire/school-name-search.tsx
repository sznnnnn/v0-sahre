"use client";

import { useMemo, useState } from "react";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { filterSchoolSuggestions } from "@/lib/school-suggestions";
import { SchoolLogoMark } from "@/components/match/school-logo-mark";
import { faviconUrlForSchoolLabel } from "@/lib/school-favicon";

interface SchoolNameSearchProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export function SchoolNameSearch({ value, onChange, id }: SchoolNameSearchProps) {
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => filterSchoolSuggestions(value), [value]);

  const applySchool = (zh: string) => {
    onChange(zh);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      modal={false}
    >
      <PopoverAnchor asChild>
        <div className="border-b border-border pb-2">
          <input
            id={id}
            type="text"
            placeholder="搜索或填写院校，如：北大、Peking"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open}
          />
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] min-w-[280px] p-0"
        align="start"
        sideOffset={6}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command shouldFilter={false}>
          <CommandList className="max-h-[min(280px,40vh)]">
            {suggestions.length === 0 ? (
              <CommandEmpty className="py-3 text-center text-xs text-muted-foreground">
                未找到匹配，可直接使用上方已输入的校名
              </CommandEmpty>
            ) : (
              <CommandGroup heading="建议院校">
                {suggestions.map((s) => (
                  <CommandItem
                    key={s.zh}
                    value={s.zh}
                    className="cursor-pointer flex-row items-center gap-2.5 py-2"
                    onSelect={() => applySchool(s.zh)}
                  >
                    <SchoolLogoMark
                      logoUrl={faviconUrlForSchoolLabel(s.zh)}
                      label={s.zh}
                      size="sm"
                      rounded="md"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">{s.zh}</p>
                      <p className="truncate text-xs text-muted-foreground">{s.en}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
