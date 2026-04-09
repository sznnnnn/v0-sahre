"use client";

import { Trophy, LayoutList, FileText, MapPin, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  /** 该校在当前匹配结果中的项目 id（用于一键加/退院校） */
  schoolProgramIds: string[];
  addedProgramIds: string[];
  /** 加入或移除该校全部匹配项目 */
  onToggleSchoolPrograms: () => void;
  /** 该校下已有文书草稿的项目数量 */
  draftProgramCount?: number;
  onSelect: () => void;
  isSelected?: boolean;
}

export function SchoolCard({
  school,
  programCount,
  schoolProgramIds,
  addedProgramIds,
  onToggleSchoolPrograms,
  draftProgramCount = 0,
  onSelect,
  isSelected,
}: SchoolCardProps) {
  const schoolInitial = school.nameEn?.[0]?.toUpperCase() || school.name?.[0] || "U";
  const hasPrograms = schoolProgramIds.length > 0;
  const allProgramsAdded =
    hasPrograms && schoolProgramIds.every((id) => addedProgramIds.includes(id));
  const someProgramsAdded = schoolProgramIds.some((id) => addedProgramIds.includes(id));

  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-xl border bg-card text-sm shadow-sm transition-[box-shadow,border-color] duration-200",
        isSelected
          ? "border-primary/40 bg-muted/30 shadow-md ring-1 ring-primary/10"
          : "border-border/80 hover:border-border hover:shadow-md"
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-label={`${school.nameEn}，${school.name}，${school.city}，${school.country}，排名 ${school.ranking}，${programCount} 个项目`}
        className="min-w-0 flex-1 px-2.5 py-2.5 text-left outline-none transition-colors hover:bg-muted/20 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-start gap-2.5" aria-hidden={true}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/80 bg-muted/60 shadow-inner">
            {school.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={school.logo} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-semibold text-foreground/80">{schoolInitial}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold leading-tight tracking-tight text-foreground">{school.nameEn}</p>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{school.name}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
              <span className="inline-flex min-w-0 items-center gap-1">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-foreground/45" aria-hidden />
                <span className="truncate text-foreground/85">
                  {school.city} · {school.country}
                </span>
              </span>
              <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-normal text-muted-foreground">
                {categoryCn[school.category]}
              </Badge>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1 tabular-nums" title="综合排名参考">
                <Trophy className="h-3.5 w-3.5 shrink-0 text-foreground/45" />
                <span className="text-foreground/80">{school.ranking}</span>
              </span>
              <span className="h-3 w-px bg-border/80" />
              <span className="inline-flex items-center gap-1 tabular-nums">
                <LayoutList className="h-3.5 w-3.5 shrink-0 text-foreground/45" />
                <span className="text-foreground/80">{programCount}</span>
              </span>
              {draftProgramCount > 0 && (
                <>
                  <span className="h-3 w-px bg-border/80" />
                  <span
                    className="inline-flex items-center gap-1 tabular-nums text-foreground/80"
                    title={`${draftProgramCount} 个项目有文书草稿`}
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0 text-foreground/45" />
                    {draftProgramCount}
                  </span>
                </>
              )}
              {someProgramsAdded && !allProgramsAdded && (
                <>
                  <span className="h-3 w-px bg-border/80" />
                  <span className="text-foreground/70">部分已加</span>
                </>
              )}
            </div>
          </div>
        </div>
      </button>

      <div className="flex shrink-0 flex-col border-l border-border/60 bg-muted/15 p-1">
        <Button
          type="button"
          variant={allProgramsAdded ? "secondary" : "outline"}
          size="icon"
          className="h-8 w-8"
          disabled={!hasPrograms}
          title={
            allProgramsAdded
              ? "从申请单移除此校全部项目"
              : someProgramsAdded
                ? "补全该校其余项目到申请单"
                : "将该校全部匹配项目加入申请单"
          }
          aria-label={
            allProgramsAdded
              ? "从申请单移除此校全部项目"
              : "将该校全部匹配项目加入申请单"
          }
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleSchoolPrograms();
          }}
        >
          {allProgramsAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
