"use client";

import Link from "next/link";
import {
  Clock,
  DollarSign,
  Calendar,
  Plus,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  ClipboardList,
  PenLine,
  Wallet,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Program, School } from "@/lib/types";
import { useState } from "react";

interface ProgramCardProps {
  program: Program;
  school: School;
  isAdded?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  showSchoolInHeader?: boolean;
  /** 本地是否已有非空文书草稿 */
  hasDocumentDraft?: boolean;
}

export function ProgramCard({
  program,
  school,
  isAdded,
  onAdd,
  onRemove,
  showSchoolInHeader = true,
  hasDocumentDraft = false,
}: ProgramCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const schoolInitial = school.nameEn?.[0]?.toUpperCase() || school.name?.[0] || "U";
  const aiSuggestion =
    program.matchReasons?.[0] || "已结合问卷中的基础信息与项目方向进行匹配。";
  const deadlineShort = program.deadline.split("-").slice(1).join("/");

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-sm transition-[box-shadow,border-color] duration-200",
        isAdded
          ? "border-primary/35 shadow-md ring-1 ring-primary/15"
          : "border-border/80 hover:border-border hover:shadow-md"
      )}
    >
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center rounded-md bg-muted/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-foreground/90"
                title={program.degree}
              >
                {program.degree}
              </span>
              {showSchoolInHeader && (
                <span className="truncate text-[11px] text-muted-foreground">{school.nameEn}</span>
              )}
            </div>
            <h3 className="text-sm font-semibold leading-snug tracking-tight text-foreground">
              {program.nameEn}
            </h3>
            <p className="mt-0.5 truncate text-xs text-foreground/90">{program.name}</p>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{program.department}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-start justify-end gap-1">
            {(hasDocumentDraft || isAdded) && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 shrink-0 px-2.5 text-xs"
                asChild
              >
                <Link
                  href={`/workspace/write/${program.id}`}
                  aria-label={hasDocumentDraft ? "查看文书" : "写文书"}
                >
                  {hasDocumentDraft ? (
                    <>
                      <FileText className="mr-1 h-3.5 w-3.5" />
                      文书
                    </>
                  ) : (
                    <>
                      <PenLine className="mr-1 h-3.5 w-3.5" />
                      写文书
                    </>
                  )}
                </Link>
              </Button>
            )}
            {isAdded ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={onRemove}
                aria-label="取消添加"
              >
                <Check className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={onAdd}
                aria-label="添加到工作台"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/80 bg-muted/60 shadow-inner"
              title={school.nameEn}
            >
              {school.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={school.logo} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-[10px] font-semibold text-foreground/80">{schoolInitial}</span>
              )}
            </div>
          </div>
        </div>

        <div
          className="mt-2.5 grid min-w-0 grid-cols-2 gap-px overflow-hidden rounded-lg border border-border/50 bg-border/50 text-[11px] sm:grid-cols-4"
          role="group"
        >
          <span
            className="inline-flex min-w-0 items-center gap-1.5 bg-muted/30 px-2.5 py-1.5"
            aria-label={`学制 ${program.duration}`}
          >
            <Clock className="h-3.5 w-3.5 shrink-0 text-foreground/50" aria-hidden />
            <span className="tabular-nums text-foreground/90">{program.duration}</span>
          </span>
          <span
            className="inline-flex min-w-0 items-center gap-1.5 bg-muted/30 px-2.5 py-1.5"
            aria-label={`截止 ${program.deadline}`}
          >
            <Calendar className="h-3.5 w-3.5 shrink-0 text-foreground/50" aria-hidden />
            <span className="tabular-nums text-foreground/90">{deadlineShort}</span>
          </span>
          <span
            className="inline-flex min-w-0 items-center gap-1.5 bg-muted/30 px-2.5 py-1.5"
            aria-label={`学费参考 ${program.tuition}`}
          >
            <DollarSign className="h-3.5 w-3.5 shrink-0 text-foreground/50" aria-hidden />
            <span className="truncate text-foreground/90">{program.tuition}</span>
          </span>
          <span
            className="inline-flex min-w-0 items-center gap-1.5 bg-muted/30 px-2.5 py-1.5"
            aria-label={`申请费 ${program.applicationFee}`}
          >
            <Wallet className="h-3.5 w-3.5 shrink-0 text-foreground/50" aria-hidden />
            <span className="truncate tabular-nums text-foreground/90">{program.applicationFee}</span>
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{program.description}</p>

        <p className="mt-2 flex gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/80" aria-hidden />
          <span className="line-clamp-2 min-w-0">{aiSuggestion}</span>
        </p>
      </div>

      <div className="border-t border-border/60 bg-muted/20">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "收起详情" : "展开详情"}
          className="flex w-full items-center justify-center py-1.5 text-muted-foreground transition-colors hover:bg-muted/50"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {isExpanded && (
          <div className="space-y-3 border-t border-border/60 px-3 pb-3 pt-2.5">
            <div className="flex gap-2.5">
              <FileText
                className="mt-0.5 h-4 w-4 shrink-0 text-foreground/45"
                aria-hidden
              />
              <p className="text-xs leading-relaxed text-muted-foreground">{program.description}</p>
            </div>

            {program.curriculumNote && (
              <div className="flex gap-2.5">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-foreground/45" aria-hidden />
                <p className="text-xs leading-relaxed text-muted-foreground">{program.curriculumNote}</p>
              </div>
            )}

            <div className="flex gap-2.5">
              <ClipboardList
                className="mt-0.5 h-4 w-4 shrink-0 text-foreground/45"
                aria-hidden
              />
              <ul className="min-w-0 flex-1 space-y-1">
                {program.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
