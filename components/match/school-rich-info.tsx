"use client";

import { BookOpen, MapPin, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import type { School } from "@/lib/types";

type SchoolRichInfoProps = {
  school: School;
  className?: string;
};

export function SchoolRichInfo({ school, className }: SchoolRichInfoProps) {
  const { campusStyle, locationAndSetting, studentLife } = school;
  if (!campusStyle && !locationAndSetting && !studentLife) return null;

  return (
    <div className={cn("space-y-4 text-sm", className)}>
      {campusStyle && (
        <div className="rounded-lg border border-border/70 bg-background/70 p-3">
          <h3 className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
            校园与学术风格
          </h3>
          <p className="leading-relaxed text-foreground/85">{campusStyle}</p>
        </div>
      )}
      {locationAndSetting && (
        <div className="rounded-lg border border-border/70 bg-background/70 p-3">
          <h3 className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
            位置与环境
          </h3>
          <p className="leading-relaxed text-foreground/85">{locationAndSetting}</p>
        </div>
      )}
      {studentLife && (
        <div className="rounded-lg border border-border/70 bg-background/70 p-3">
          <h3 className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <UsersRound className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
            生活与社群
          </h3>
          <p className="leading-relaxed text-foreground/85">{studentLife}</p>
        </div>
      )}
    </div>
  );
}
