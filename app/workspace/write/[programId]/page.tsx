"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { GuestBanner } from "@/components/questionnaire/guest-banner";
import { useMatchResult } from "@/hooks/use-questionnaire";
import {
  type DocumentDraftKind,
  DOCUMENT_DRAFT_LABELS,
  DOCUMENT_DRAFT_ORDER,
  buildDraftSeed,
  getDraft,
  saveDraft,
  getProgramIdsWithSavedDrafts,
  type DraftContext,
} from "@/lib/document-drafts";

function draftContextFromPair(pair: {
  program: { name: string; nameEn: string; degree: string; department: string; deadline: string };
  school: { name: string; nameEn: string };
}): DraftContext {
  const { program, school } = pair;
  return {
    schoolName: school.name,
    schoolNameEn: school.nameEn,
    programName: program.name,
    programNameEn: program.nameEn,
    degree: program.degree,
    department: program.department,
    deadline: program.deadline,
  };
}

export default function WriteDocumentPage() {
  const params = useParams();
  const router = useRouter();
  const programId = typeof params.programId === "string" ? params.programId : "";
  const { result, isLoaded: matchLoaded } = useMatchResult();

  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [addedIdsReady, setAddedIdsReady] = useState(false);
  const [hasLocalDraft, setHasLocalDraft] = useState(false);
  const [kind, setKind] = useState<DocumentDraftKind>("ps");
  const [content, setContent] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const saveIdleTimer = useRef<number | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("edumatch_added_programs");
    if (raw) {
      try {
        setAddedIds(JSON.parse(raw) as string[]);
      } catch {
        setAddedIds([]);
      }
    }
    setAddedIdsReady(true);
  }, []);

  useEffect(() => {
    setHasLocalDraft(getProgramIdsWithSavedDrafts().has(programId));
  }, [programId]);

  const pair = useMemo(() => {
    if (!result || !programId) return null;
    const program = result.programs.find((p) => p.id === programId);
    if (!program) return null;
    const school = result.schools.find((s) => s.id === program.schoolId);
    if (!school) return null;
    return { program, school };
  }, [result, programId]);

  useEffect(() => {
    if (!pair) return;
    const ctx = draftContextFromPair(pair);
    setKind("ps");
    const existing = getDraft(pair.program.id, "ps");
    setContent(existing?.content ?? buildDraftSeed("ps", ctx));
  }, [pair?.program.id]);

  const handleTabChange = useCallback(
    (value: string) => {
      const next = value as DocumentDraftKind;
      if (!pair) return;
      const ctx = draftContextFromPair(pair);
      saveDraft(pair.program.id, kind, content);
      setKind(next);
      const existing = getDraft(pair.program.id, next);
      setContent(existing?.content ?? buildDraftSeed(next, ctx));
    },
    [pair, kind, content]
  );

  useEffect(() => {
    if (!pair) return;
    setSaveState("saving");
    const debounce = window.setTimeout(() => {
      saveDraft(pair.program.id, kind, content);
      setSaveState("saved");
      if (saveIdleTimer.current != null) window.clearTimeout(saveIdleTimer.current);
      saveIdleTimer.current = window.setTimeout(() => setSaveState("idle"), 1600);
    }, 500);
    return () => window.clearTimeout(debounce);
  }, [content, kind, pair]);

  useEffect(() => {
    return () => {
      if (saveIdleTimer.current != null) window.clearTimeout(saveIdleTimer.current);
    };
  }, []);

  const notAdded = addedIdsReady && !addedIds.includes(programId);
  const canUseEditor = !notAdded || hasLocalDraft;
  const missingMatch = matchLoaded && !result;
  const missingProgram = matchLoaded && result && !pair;

  if (!programId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <GuestBanner />

      <header className="sticky top-8 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="shrink-0" asChild>
              <Link href="/workspace" aria-label="返回工作台">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">文书草稿</p>
              {pair ? (
                <p className="truncate text-xs text-muted-foreground">
                  {pair.school.nameEn} · {pair.program.nameEn}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">—</p>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
            {saveState === "saving" && <span>保存中…</span>}
            {saveState === "saved" && (
              <span className="flex items-center gap-1 text-foreground">
                <Check className="h-3.5 w-3.5" />
                已保存
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        {missingMatch && (
          <div className="rounded-lg border border-dashed border-border p-10 text-center">
            <Sparkles className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <p className="mb-4 text-sm text-muted-foreground">请先在匹配页生成结果，再把项目加入工作台。</p>
            <Button onClick={() => router.push("/match")}>去匹配</Button>
          </div>
        )}

        {!missingMatch && missingProgram && (
          <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            未找到该项目，可能匹配结果已更新。请返回工作台重新选择。
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link href="/workspace">回工作台</Link>
              </Button>
            </div>
          </div>
        )}

        {!missingMatch && !missingProgram && addedIdsReady && notAdded && !hasLocalDraft && (
          <div className="rounded-lg border border-dashed border-border p-10 text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              请先将该项目加入工作台后再写文书；若已有草稿，可从匹配页对应项目的「文书」入口进入。
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/match">去匹配</Link>
              </Button>
              <Button asChild>
                <Link href="/workspace">回工作台</Link>
              </Button>
            </div>
          </div>
        )}

        {pair && !addedIdsReady && (
          <p className="text-sm text-muted-foreground">加载中…</p>
        )}

        {pair && addedIdsReady && canUseEditor && (
          <>
            {notAdded && hasLocalDraft && (
              <p className="mb-3 rounded-md border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                该项目未在工作台列表中，仍可查看与编辑已保存草稿；需要一并管理申请进度时请先在匹配页加入工作台。
              </p>
            )}
            <p className="mb-4 text-sm text-muted-foreground">
              已按项目预填结构，可直接改写；切换文书类型会先保存当前页。已保存草稿可在工作台左侧「我的文书」或匹配页对应项目的「文书」打开。
            </p>

            <Tabs value={kind} onValueChange={handleTabChange} className="gap-4">
              <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/40 p-1 sm:w-auto">
                {DOCUMENT_DRAFT_ORDER.map((k) => (
                  <TabsTrigger key={k} value={k} className="text-xs sm:text-sm">
                    {DOCUMENT_DRAFT_LABELS[k]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {DOCUMENT_DRAFT_ORDER.map((k) => (
                <TabsContent key={k} value={k} className="mt-0 outline-none">
                  {kind === k && (
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[min(70vh,520px)] resize-y border-border/80 font-mono text-sm leading-relaxed shadow-none"
                      spellCheck={false}
                    />
                  )}
                </TabsContent>
              ))}
            </Tabs>

            <p className="mt-4 text-xs text-muted-foreground">
              内容仅保存在本浏览器。正式提交前请自行校对事实与格式。
            </p>
          </>
        )}
      </main>
    </div>
  );
}
