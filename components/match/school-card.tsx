"use client";

import { Trophy, LayoutList, MapPin, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SchoolLogoMark } from "@/components/match/school-logo-mark";
import { cn } from "@/lib/utils";
import type { School } from "@/lib/types";

const categoryCn: Record<School["category"], string> = {
  reach: "冲刺",
  match: "主申",
  safety: "保底",
};

interface SchoolCardProps {
  school: School;
  programCount: number;
  schoolProgramIds: string[];
  addedProgramIds: string[];
  onToggleSchoolPrograms: () => void;
  onSelect: () => void;
  isSelected?: boolean;
}

export function SchoolCard({
  school,
  programCount,
  schoolProgramIds,
  addedProgramIds,
  onToggleSchoolPrograms,
  onSelect,
  isSelected,
}: SchoolCardProps) {
  const hasPrograms = schoolProgramIds.length > 0;
  const allProgramsAdded =
    hasPrograms && schoolProgramIds.every((id) => addedProgramIds.includes(id));
  const someProgramsAdded = schoolProgramIds.some((id) => addedProgramIds.includes(id));
  const inv = isSelected;
  const bulkProgramsLabel = allProgramsAdded
    ? "从申请单移除此校全部项目"
    : someProgramsAdded
      ? "补全该校其余项目到申请单"
      : "将该校全部匹配项目加入申请单";

  return (
    <div
      className={cn(
        "flex min-h-[5.25rem] overflow-hidden rounded-lg border transition-colors",
        inv
          ? "border-foreground bg-background text-foreground"
          : "border-border/80 bg-card/95 hover:border-border hover:bg-muted/25"
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-label={`${school.nameEn}，${school.name}，${school.city}，${school.country}，排名 ${school.ranking}，${programCount} 个项目`}
        className="min-w-0 flex-1 px-3.5 py-3.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="flex items-start gap-3.5" aria-hidden={true}>
          <SchoolLogoMark school={school} size="lg" inverted={inv} />
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-[15px] font-semibold leading-snug tracking-tight",
                inv ? "text-foreground" : "text-foreground"
              )}
            >
              {school.nameEn}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs">
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <MapPin className={cn("h-4 w-4 shrink-0", inv ? "text-muted-foreground" : "text-muted-foreground")} aria-hidden />
                <span className={cn("line-clamp-1 min-w-0", inv ? "text-foreground/90" : "text-foreground/85")}>
                  {school.city} · {school.country}
                </span>
              </span>
              <Badge
                variant="outline"
                className={cn(
                  "h-6 shrink-0 border px-2 py-0 text-[11px] font-normal leading-none",
                  inv
                    ? "border-foreground/30 bg-muted/20 text-foreground/90"
                    : "border-border/80 text-muted-foreground"
                )}
              >
                {categoryCn[school.category]}
              </Badge>
            </div>
            <div className={cn("mt-2 flex flex-wrap items-center gap-2.5 text-xs", inv ? "text-muted-foreground" : "text-muted-foreground")}>
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Trophy className={cn("h-4 w-4 shrink-0", inv ? "text-muted-foreground" : "text-muted-foreground")} />
                <span className={inv ? "text-foreground" : "text-foreground/80"}>{school.ranking}</span>
              </span>
              <span className={cn("h-3.5 w-px shrink-0", inv ? "bg-border" : "bg-border/80")} />
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <LayoutList className={cn("h-4 w-4 shrink-0", inv ? "text-muted-foreground" : "text-muted-foreground")} />
                <span className={inv ? "text-foreground" : "text-foreground/80"}>{programCount}</span>
              </span>
              {someProgramsAdded && !allProgramsAdded && (
                <>
                  <span className={cn("h-3.5 w-px shrink-0", inv ? "bg-border" : "bg-border/80")} />
                  <span className={inv ? "font-medium text-foreground/85" : "font-medium text-foreground/75"}>部分已加</span>
                </>
              )}
            </div>
          </div>
        </div>
      </button>

      <div
        className={cn(
          "flex w-12 shrink-0 flex-col items-center justify-center border-l p-1.5",
          inv ? "border-border/90 bg-muted/20" : "border-border/80 bg-muted/20"
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-lg",
                inv && "text-foreground hover:bg-muted/40 hover:text-foreground",
                allProgramsAdded && !inv && "bg-muted text-foreground",
                allProgramsAdded && inv && "bg-muted/40 text-foreground"
              )}
              disabled={!hasPrograms}
              aria-label={bulkProgramsLabel}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleSchoolPrograms();
              }}
            >
              {allProgramsAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-[240px]">
            {bulkProgramsLabel}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
