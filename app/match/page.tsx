"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, RefreshCw, ChevronRight, LayoutGrid } from "lucide-react";
import { GuestBanner } from "@/components/questionnaire/guest-banner";
import { SchoolCard } from "@/components/match/school-card";
import { ProgramCard } from "@/components/match/program-card";
import { useQuestionnaire, useMatchResult } from "@/hooks/use-questionnaire";
import { generateMatchResult } from "@/lib/mock-match";
import { getProgramIdsWithSavedDrafts } from "@/lib/document-drafts";
import type { School } from "@/lib/types";

type CategoryFilter = "all" | "reach" | "match" | "safety";

export default function MatchPage() {
  const { data: questionnaireData, isLoaded: isQuestionnaireLoaded } = useQuestionnaire();
  const { result, isLoaded: isResultLoaded, saveResult } = useMatchResult();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [addedPrograms, setAddedPrograms] = useState<string[]>([]);
  const [draftRefresh, setDraftRefresh] = useState(0);

  // 生成匹配结果
  useEffect(() => {
    if (isQuestionnaireLoaded && isResultLoaded && !result) {
      setIsGenerating(true);
      // 模拟 AI 生成延迟
      setTimeout(() => {
        const newResult = generateMatchResult(questionnaireData);
        saveResult(newResult);
        setIsGenerating(false);
      }, 2000);
    }
  }, [isQuestionnaireLoaded, isResultLoaded, result, questionnaireData, saveResult]);
  
  // 从本地存储加载已添加的项目
  useEffect(() => {
    const stored = localStorage.getItem("edumatch_added_programs");
    if (stored) {
      setAddedPrograms(JSON.parse(stored));
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

  const draftProgramIds = useMemo(() => {
    void draftRefresh;
    return getProgramIdsWithSavedDrafts();
  }, [draftRefresh, addedPrograms.join(",")]);

  const draftCountBySchoolId = useMemo(() => {
    if (!result) return new Map<string, number>();
    const map = new Map<string, number>();
    for (const p of result.programs) {
      if (draftProgramIds.has(p.id)) {
        map.set(p.schoolId, (map.get(p.schoolId) ?? 0) + 1);
      }
    }
    return map;
  }, [result, draftProgramIds]);

  const handleAddProgram = (programId: string) => {
    const updated = [...addedPrograms, programId];
    setAddedPrograms(updated);
    localStorage.setItem("edumatch_added_programs", JSON.stringify(updated));
  };
  
  const handleRemoveProgram = (programId: string) => {
    const updated = addedPrograms.filter((id) => id !== programId);
    setAddedPrograms(updated);
    localStorage.setItem("edumatch_added_programs", JSON.stringify(updated));
  };

  const handleToggleSchoolPrograms = (schoolId: string) => {
    if (!result) return;
    const ids = result.programs.filter((p) => p.schoolId === schoolId).map((p) => p.id);
    if (ids.length === 0) return;
    const allIn = ids.every((id) => addedPrograms.includes(id));
    const updated = allIn
      ? addedPrograms.filter((id) => !ids.includes(id))
      : [...new Set([...addedPrograms, ...ids])];
    setAddedPrograms(updated);
    localStorage.setItem("edumatch_added_programs", JSON.stringify(updated));
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newResult = generateMatchResult(questionnaireData);
      saveResult(newResult);
      setIsGenerating(false);
    }, 2000);
  };
  
  // 筛选后的学校和项目
  const filteredSchools = useMemo(() => {
    if (!result) return [];
    if (categoryFilter === "all") return result.schools;
    return result.schools.filter((s) => s.category === categoryFilter);
  }, [result, categoryFilter]);
  
  const filteredPrograms = useMemo(() => {
    if (!result) return [];
    let programs = result.programs;
    
    if (categoryFilter !== "all") {
      programs = programs.filter((p) => p.category === categoryFilter);
    }
    
    if (selectedSchool) {
      programs = programs.filter((p) => p.schoolId === selectedSchool.id);
    }

    return programs.sort((a, b) => {
      const schoolA = result.schools.find((s) => s.id === a.schoolId)?.ranking || 999;
      const schoolB = result.schools.find((s) => s.id === b.schoolId)?.ranking || 999;
      return schoolA - schoolB;
    });
  }, [result, categoryFilter, selectedSchool]);
  
  if (!isQuestionnaireLoaded || !isResultLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background">
        <GuestBanner />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <div className="relative mb-8">
            <div className="h-24 w-24 rounded-full border-4 border-primary/20 animate-pulse" />
            <Sparkles className="absolute inset-0 m-auto h-10 w-10 text-primary animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">正在匹配</h1>
          <p className="text-muted-foreground text-center">
            请稍候...
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-dvh flex-col bg-background lg:h-dvh lg:overflow-hidden">
      <GuestBanner />
      
      {/* Header */}
      <header className="sticky top-8 z-40 shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:static lg:top-auto">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="hidden truncate font-semibold text-foreground sm:inline">EduMatch</span>
          </Link>
          
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/questionnaire">
              <Button variant="outline" size="icon" className="h-8 w-8" aria-label="返回问卷" title="返回问卷">
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href="/workspace">
              <Button size="sm" className="h-8 px-3 text-xs">
                工作台
                <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col min-h-0 px-4 py-2 sm:px-6 lg:min-h-0 lg:overflow-hidden lg:pb-3 lg:pt-1">
        {/* 统计 + 筛选 + 重匹配：同一视觉层级 */}
        <div className="mb-2 flex shrink-0 flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Tabs value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as CategoryFilter)}>
              <TabsList className="h-8 gap-0 p-0.5">
                <TabsTrigger value="all" className="h-7 px-2.5 text-xs">
                  全部
                </TabsTrigger>
                <TabsTrigger value="reach" className="h-7 px-2.5 text-xs">
                  冲刺
                </TabsTrigger>
                <TabsTrigger value="match" className="h-7 px-2.5 text-xs">
                  主申
                </TabsTrigger>
                <TabsTrigger value="safety" className="h-7 px-2.5 text-xs">
                  保底
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleRegenerate}
              aria-label="重匹配"
              title="重匹配"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        {/* 主内容区：大屏占满视口剩余高度，左右各自滚动 */}
        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-4">
          {/* 学校列表 */}
          <aside className="flex min-h-0 flex-col lg:min-h-0">
            <div className="min-h-[40vh] flex-1 space-y-1.5 overflow-y-auto pr-1 lg:min-h-0">
              <button
                type="button"
                onClick={() => setSelectedSchool(null)}
                aria-label={`全部学校项目，共 ${filteredPrograms.length} 项`}
                className={`flex w-full items-center justify-between gap-2 rounded-xl border px-2.5 py-2.5 text-sm shadow-sm transition-[box-shadow,border-color] duration-200 ${
                  !selectedSchool
                    ? "border-primary/35 bg-muted/30 shadow-md ring-1 ring-primary/10"
                    : "border-border/80 hover:border-border hover:shadow-md"
                }`}
              >
                <LayoutGrid className="h-4 w-4 shrink-0 text-foreground/55" aria-hidden />
                <span className="tabular-nums text-sm font-semibold text-foreground">
                  {filteredPrograms.length}
                </span>
              </button>
              
              {filteredSchools.map((school) => {
                const schoolPrograms = result?.programs.filter((p) => p.schoolId === school.id) ?? [];
                const programCount = schoolPrograms.length;

                return (
                  <SchoolCard
                    key={school.id}
                    school={school}
                    programCount={programCount}
                    schoolProgramIds={schoolPrograms.map((p) => p.id)}
                    addedProgramIds={addedPrograms}
                    onToggleSchoolPrograms={() => handleToggleSchoolPrograms(school.id)}
                    draftProgramCount={draftCountBySchoolId.get(school.id) ?? 0}
                    onSelect={() => setSelectedSchool(school)}
                    isSelected={selectedSchool?.id === school.id}
                  />
                );
              })}
            </div>
          </aside>
          
          {/* 项目列表 */}
          <section className="flex min-h-0 flex-col lg:min-h-0">
            <div
              className={`min-h-[40vh] flex-1 space-y-2 overflow-y-auto lg:min-h-0 ${addedPrograms.length > 0 ? "pb-14" : ""}`}
            >
              {filteredPrograms.map((program) => {
                const school = result?.schools.find((s) => s.id === program.schoolId);
                if (!school) return null;
                
                return (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    school={school}
                    showSchoolInHeader={!selectedSchool}
                    isAdded={addedPrograms.includes(program.id)}
                    hasDocumentDraft={draftProgramIds.has(program.id)}
                    onAdd={() => handleAddProgram(program.id)}
                    onRemove={() => handleRemoveProgram(program.id)}
                  />
                );
              })}
              
              {filteredPrograms.length === 0 && (
                <div className="rounded-lg border border-dashed border-border py-6 text-center text-sm text-muted-foreground">
                  暂无项目
                </div>
              )}
            </div>
          </section>
        </div>
        
        {/* 底部操作栏 */}
        {addedPrograms.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur p-4 z-50">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
              <p className="text-sm tabular-nums text-muted-foreground">
                已选 <span className="font-medium text-foreground">{addedPrograms.length}</span>
              </p>
              <Link href="/workspace">
                <Button>
                  去工作台
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
