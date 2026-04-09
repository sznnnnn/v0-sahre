"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Sparkles,
  Plus,
  Search,
  MoreVertical,
  Trash2,
  Calendar,
  Clock,
  GraduationCap,
  Building2,
  AlertCircle,
  RefreshCw,
  FileText,
  LayoutGrid,
  CalendarClock,
  Menu,
  PenLine,
} from "lucide-react";
import { GuestBanner } from "@/components/questionnaire/guest-banner";
import { useMatchResult } from "@/hooks/use-questionnaire";
import type { Program, School } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getProgramIdsWithSavedDrafts, listProgramDraftSummaries } from "@/lib/document-drafts";

interface ApplicationItem {
  program: Program;
  school: School;
  status: "todo" | "in-progress" | "submitted" | "accepted" | "rejected";
  notes?: string;
}

const statusConfig = {
  todo: { label: "待申请", color: "bg-muted text-foreground" },
  "in-progress": { label: "准备中", color: "bg-muted text-foreground" },
  submitted: { label: "已提交", color: "bg-muted text-foreground" },
  accepted: { label: "已录取", color: "bg-muted text-foreground" },
  rejected: { label: "已拒绝", color: "bg-muted text-foreground" },
};

type NavSection = "all" | "deadlines";

export default function WorkspacePage() {
  const { result } = useMatchResult();
  const [addedProgramIds, setAddedProgramIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [applications, setApplications] = useState<Record<string, ApplicationItem["status"]>>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [navSection, setNavSection] = useState<NavSection>("all");
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [draftRefresh, setDraftRefresh] = useState(0);

  useEffect(() => {
    const storedPrograms = localStorage.getItem("edumatch_added_programs");
    if (storedPrograms) {
      setAddedProgramIds(JSON.parse(storedPrograms));
    }

    const storedStatus = localStorage.getItem("edumatch_application_status");
    if (storedStatus) {
      setApplications(JSON.parse(storedStatus));
    }
  }, []);

  useEffect(() => {
    const bump = () => setDraftRefresh((n) => n + 1);
    window.addEventListener("focus", bump);
    document.addEventListener("visibilitychange", bump);
    return () => {
      window.removeEventListener("focus", bump);
      document.removeEventListener("visibilitychange", bump);
    };
  }, []);

  const programIdsWithDrafts = useMemo(() => {
    void draftRefresh;
    return getProgramIdsWithSavedDrafts();
  }, [draftRefresh, addedProgramIds.join(",")]);

  const draftSummaries = useMemo(() => {
    void draftRefresh;
    return listProgramDraftSummaries();
  }, [draftRefresh, addedProgramIds.length]);

  const labelForDraftProgram = (programId: string) => {
    if (!result) return programId;
    const program = result.programs.find((p) => p.id === programId);
    if (!program) return `草稿 · ${programId.slice(0, 8)}…`;
    const school = result.schools.find((s) => s.id === program.schoolId);
    return school ? `${school.name} · ${program.nameEn}` : program.nameEn;
  };

  const addedPrograms = useMemo(() => {
    if (!result) return [];
    return addedProgramIds
      .map((id) => {
        const program = result.programs.find((p) => p.id === id);
        const school = result.schools.find((s) => s.id === program?.schoolId);
        if (!program || !school) return null;
        return { program, school };
      })
      .filter(Boolean) as { program: Program; school: School }[];
  }, [result, addedProgramIds]);

  const availablePrograms = useMemo(() => {
    if (!result) return [];
    return result.programs
      .filter((p) => !addedProgramIds.includes(p.id))
      .map((program) => {
        const school = result.schools.find((s) => s.id === program.schoolId);
        if (!school) return null;
        return { program, school };
      })
      .filter(Boolean) as { program: Program; school: School }[];
  }, [result, addedProgramIds]);

  const searchFiltered = useMemo(() => {
    if (!searchQuery) return addedPrograms;
    const query = searchQuery.toLowerCase();
    return addedPrograms.filter(
      ({ program, school }) =>
        program.name.toLowerCase().includes(query) ||
        program.nameEn.toLowerCase().includes(query) ||
        school.name.toLowerCase().includes(query) ||
        school.nameEn.toLowerCase().includes(query)
    );
  }, [addedPrograms, searchQuery]);

  const upcomingDeadlines = useMemo(() => {
    const now = new Date();
    return addedPrograms
      .filter(({ program }) => {
        const deadline = new Date(program.deadline);
        const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil > 0 && daysUntil <= 30;
      })
      .sort((a, b) => new Date(a.program.deadline).getTime() - new Date(b.program.deadline).getTime())
      .slice(0, 3);
  }, [addedPrograms]);

  const viewFiltered = useMemo(() => {
    if (navSection !== "deadlines") return searchFiltered;
    const ids = new Set(upcomingDeadlines.map(({ program }) => program.id));
    return searchFiltered.filter(({ program }) => ids.has(program.id));
  }, [searchFiltered, navSection, upcomingDeadlines]);

  const displayPrograms = useMemo(() => {
    if (!selectedSchoolId) return viewFiltered;
    return viewFiltered.filter(({ school }) => school.id === selectedSchoolId);
  }, [viewFiltered, selectedSchoolId]);

  const groupedBySchool = useMemo(() => {
    const groups: Record<string, { school: School; programs: Program[] }> = {};
    displayPrograms.forEach(({ program, school }) => {
      if (!groups[school.id]) {
        groups[school.id] = { school, programs: [] };
      }
      groups[school.id].programs.push(program);
    });
    return Object.values(groups);
  }, [displayPrograms]);

  const schoolsInWorkspace = useMemo(() => {
    const map = new Map<string, School>();
    addedPrograms.forEach(({ school }) => map.set(school.id, school));
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
  }, [addedPrograms]);

  const stats = useMemo(() => {
    const statusCounts = {
      todo: 0,
      "in-progress": 0,
      submitted: 0,
      accepted: 0,
      rejected: 0,
    };
    addedProgramIds.forEach((id) => {
      const status = applications[id] || "todo";
      statusCounts[status]++;
    });
    return statusCounts;
  }, [addedProgramIds, applications]);

  const updateStatus = (programId: string, status: ApplicationItem["status"]) => {
    const updated = { ...applications, [programId]: status };
    setApplications(updated);
    localStorage.setItem("edumatch_application_status", JSON.stringify(updated));
  };

  const removeProgram = (programId: string) => {
    const updated = addedProgramIds.filter((id) => id !== programId);
    setAddedProgramIds(updated);
    localStorage.setItem("edumatch_added_programs", JSON.stringify(updated));
  };

  const addProgram = (programId: string) => {
    const updated = [...addedProgramIds, programId];
    setAddedProgramIds(updated);
    localStorage.setItem("edumatch_added_programs", JSON.stringify(updated));
  };

  const selectNav = (section: NavSection) => {
    setNavSection(section);
    if (section === "all") setSelectedSchoolId(null);
  };

  const selectSchool = (id: string | null) => {
    setSelectedSchoolId(id);
    setNavSection("all");
  };

  const sidebarBody = (opts: { onPick?: () => void }) => (
    <>
      <div className="px-3 pb-4">
        <p className="mb-2 px-2 text-[11px] font-medium tracking-wide text-muted-foreground/80">浏览</p>
        <nav className="space-y-0.5">
          <button
            type="button"
            onClick={() => {
              selectNav("all");
              setSelectedSchoolId(null);
              opts.onPick?.();
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
              navSection === "all" && selectedSchoolId == null
                ? "bg-muted/80 text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4 shrink-0 opacity-70" />
            <span className="flex-1 truncate">全部申请</span>
            {addedPrograms.length > 0 && (
              <span className="text-xs text-muted-foreground">{addedPrograms.length}</span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              selectNav("deadlines");
              setSelectedSchoolId(null);
              opts.onPick?.();
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
              navSection === "deadlines"
                ? "bg-muted/80 text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <CalendarClock className="h-4 w-4 shrink-0 opacity-70" />
            <span className="flex-1 truncate">即将截止</span>
            {upcomingDeadlines.length > 0 && (
              <Badge variant="secondary" className="h-5 min-w-5 justify-center px-1 text-[10px] font-normal">
                {upcomingDeadlines.length}
              </Badge>
            )}
          </button>
        </nav>
      </div>

      <div className="px-3 pb-4">
        <p className="mb-2 px-2 text-[11px] font-medium tracking-wide text-muted-foreground/80">学校</p>
        {schoolsInWorkspace.length === 0 ? (
          <p className="px-2 text-xs text-muted-foreground">添加项目后出现列表</p>
        ) : (
          <ScrollArea className="h-[min(40vh,280px)] pr-2">
            <div className="space-y-0.5">
              {schoolsInWorkspace.map((school) => {
                const active = selectedSchoolId === school.id;
                const count = addedPrograms.filter((p) => p.school.id === school.id).length;
                return (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => {
                      selectSchool(active ? null : school.id);
                      opts.onPick?.();
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                      active
                        ? "bg-muted/80 text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <Building2 className="h-4 w-4 shrink-0 opacity-70" />
                    <span className="min-w-0 flex-1 truncate">{school.name}</span>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>

      <div className="px-3 pb-4">
        <p className="mb-2 px-2 text-[11px] font-medium tracking-wide text-muted-foreground/80">我的文书</p>
        {draftSummaries.length === 0 ? (
          <p className="px-2 text-xs leading-relaxed text-muted-foreground">
            在列表里点「写文书」即可创建；草稿会出现在这里。
          </p>
        ) : (
          <ScrollArea className="h-[min(36vh,220px)] pr-2">
            <div className="space-y-0.5">
              {draftSummaries.map((d) => (
                <Link
                  key={d.programId}
                  href={`/workspace/write/${d.programId}`}
                  onClick={() => opts.onPick?.()}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                >
                  <PenLine className="h-4 w-4 shrink-0 opacity-70" />
                  <span className="min-w-0 flex-1 truncate" title={labelForDraftProgram(d.programId)}>
                    {labelForDraftProgram(d.programId)}
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground/80">{d.kinds.length} 类</span>
                </Link>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      <div className="mt-auto border-t border-border/60 px-3 py-3">
        <p className="mb-2 px-2 text-[11px] font-medium tracking-wide text-muted-foreground/80">进度</p>
        <div className="space-y-1 px-2 text-xs text-muted-foreground">
          <div className="flex justify-between gap-2">
            <span>待申请</span>
            <span className="tabular-nums text-foreground">{stats.todo}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>进行中</span>
            <span className="tabular-nums text-foreground">{stats["in-progress"] + stats.submitted}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>已有结果</span>
            <span className="tabular-nums text-foreground">{stats.accepted + stats.rejected}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 px-3 py-3">
        <p className="mb-2 px-2 text-[11px] font-medium tracking-wide text-muted-foreground/80">快捷</p>
        <div className="space-y-0.5">
          <Link
            href="/match"
            onClick={() => opts.onPick?.()}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <RefreshCw className="h-4 w-4 opacity-70" />
            查看匹配
          </Link>
          <Link
            href="/questionnaire"
            onClick={() => opts.onPick?.()}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <FileText className="h-4 w-4 opacity-70" />
            我的背景
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GuestBanner />

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar — Notion-like */}
        <aside className="hidden w-[260px] shrink-0 flex-col border-r border-border bg-muted/20 md:flex">
          <div className="flex h-14 items-center gap-2 border-b border-border/60 px-4">
            <Link href="/" className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">EduMatch</p>
                <p className="truncate text-xs text-muted-foreground">申请工作台</p>
              </div>
            </Link>
          </div>

          <div className="border-b border-border/60 p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索…"
                className="h-9 border-border/80 bg-background/80 pl-8 text-sm shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="py-3">{sidebarBody({})}</div>
          </ScrollArea>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              aria-label="打开侧栏"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">工作台</p>
              <p className="truncate text-xs text-muted-foreground">
                {navSection === "deadlines"
                  ? "即将截止"
                  : selectedSchoolId
                    ? schoolsInWorkspace.find((s) => s.id === selectedSchoolId)?.name ?? "学校"
                    : "全部申请"}
              </p>
            </div>
            <Link href="/" className="shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
            </Link>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:py-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {navSection === "deadlines"
                      ? "即将截止"
                      : selectedSchoolId
                        ? schoolsInWorkspace.find((s) => s.id === selectedSchoolId)?.name ?? "学校"
                        : "全部申请"}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {displayPrograms.length} 个项目
                    {searchQuery ? ` · 已按搜索筛选` : ""}
                  </p>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="w-full shrink-0 sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      添加项目
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>添加申请项目</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      {availablePrograms.length === 0 ? (
                        <div className="py-8 text-center">
                          <GraduationCap className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                          <p className="text-muted-foreground">没有更多可添加的项目</p>
                          <Link href="/match">
                            <Button variant="outline" className="mt-4">
                              查看更多匹配结果
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        availablePrograms.map(({ program, school }) => (
                          <div
                            key={program.id}
                            className="flex items-center justify-between rounded-lg border border-border p-4"
                          >
                            <div>
                              <p className="font-medium text-foreground">{program.nameEn}</p>
                              <p className="text-sm text-muted-foreground">
                                {school.name} · {program.degree}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                addProgram(program.id);
                                setIsAddDialogOpen(false);
                              }}
                            >
                              <Plus className="mr-1 h-4 w-4" />
                              添加
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {upcomingDeadlines.length > 0 && navSection === "all" && !selectedSchoolId && (
                <div className="mb-6 rounded-lg border border-border bg-muted/20 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-foreground">30 天内截止</h3>
                  </div>
                  <div className="space-y-2">
                    {upcomingDeadlines.map(({ program, school }) => {
                      const deadline = new Date(program.deadline);
                      const daysUntil = Math.ceil(
                        (deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                      );
                      return (
                        <div key={program.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                          <span className="text-foreground">
                            {school.name} · {program.nameEn}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" asChild>
                              <Link href={`/workspace/write/${program.id}`}>写文书</Link>
                            </Button>
                            <Badge variant="outline" className="font-normal">
                              {daysUntil} 天
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {addedPrograms.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-12 text-center">
                  <GraduationCap className="mx-auto mb-4 h-14 w-14 text-muted-foreground" />
                  <h2 className="mb-2 text-lg font-semibold text-foreground">还没有添加申请项目</h2>
                  <p className="mb-6 text-sm text-muted-foreground">
                从匹配结果中加入项目后，会出现在左侧栏与列表中；每个项目可点「写文书」按模板起草。
              </p>
                  <Link href="/match">
                    <Button>
                      <Sparkles className="mr-2 h-4 w-4" />
                      查看匹配结果
                    </Button>
                  </Link>
                </div>
              ) : displayPrograms.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                  当前筛选下没有项目，试试清空搜索或切换左侧视图。
                </div>
              ) : (
                <div className="space-y-6">
                  {groupedBySchool.map(({ school, programs }) => (
                    <div key={school.id} className="overflow-hidden rounded-lg border border-border bg-card">
                      <div className="group flex items-center gap-3 border-b border-border bg-muted/20 px-4 py-3">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-foreground">{school.name}</h3>
                          <p className="text-xs text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            {school.nameEn}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">{programs.length}</span>
                      </div>

                      <div className="divide-y divide-border">
                        {programs.map((program) => {
                          const status = applications[program.id] || "todo";
                          const statusInfo = statusConfig[status];

                          return (
                            <div
                              key={program.id}
                              className="group flex flex-col gap-3 p-4 transition-colors hover:bg-muted/15 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="mb-1 flex flex-wrap items-center gap-2">
                                  <h4 className="font-medium text-foreground">{program.nameEn}</h4>
                                  <Badge variant="outline" className={cn("font-normal", statusInfo.color)}>
                                    {statusInfo.label}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                  <span>{program.degree}</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {program.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {program.deadline}
                                  </span>
                                </div>
                              </div>

                              <div className="flex shrink-0 flex-wrap items-center gap-2">
                                <Button size="sm" className="gap-1.5" asChild>
                                  <Link href={`/workspace/write/${program.id}`}>
                                    <PenLine className="h-3.5 w-3.5" />
                                    写文书
                                  </Link>
                                </Button>
                                {programIdsWithDrafts.has(program.id) && (
                                  <span className="text-[10px] text-muted-foreground">草稿</span>
                                )}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      状态
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {Object.entries(statusConfig).map(([key, value]) => (
                                      <DropdownMenuItem
                                        key={key}
                                        onClick={() => updateStatus(program.id, key as ApplicationItem["status"])}
                                      >
                                        {value.label}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/workspace/write/${program.id}`}>
                                        <PenLine className="mr-2 h-4 w-4" />
                                        写文书
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-destructive"
                                      onClick={() => removeProgram(program.id)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      移除
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="flex w-[280px] flex-col gap-0 p-0 sm:max-w-[280px]">
          <div className="flex h-14 items-center gap-2 border-b border-border px-4">
            <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setMobileSidebarOpen(false)}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">EduMatch</p>
                <p className="truncate text-xs text-muted-foreground">申请工作台</p>
              </div>
            </Link>
          </div>
          <div className="border-b border-border p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索…"
                className="h-9 border-border/80 bg-background/80 pl-8 text-sm shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="py-3">{sidebarBody({ onPick: () => setMobileSidebarOpen(false) })}</div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
