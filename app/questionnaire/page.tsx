"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Paperclip, X } from "lucide-react";
import { GuestBanner } from "@/components/questionnaire/guest-banner";
import { FileUpload } from "@/components/questionnaire/file-upload";
import { PersonalInfoForm } from "@/components/questionnaire/steps/personal-info";
import { EducationForm } from "@/components/questionnaire/steps/education";
import { StandardizedTestsForm } from "@/components/questionnaire/steps/standardized-tests";
import { WorkExperienceForm } from "@/components/questionnaire/steps/work-experience";
import { ProjectExperienceForm } from "@/components/questionnaire/steps/project-experience";
import { HonorsForm } from "@/components/questionnaire/steps/honors";
import { SkillsForm } from "@/components/questionnaire/steps/skills";
import { useQuestionnaire } from "@/hooks/use-questionnaire";
import type { QuestionnaireData } from "@/lib/types";

export default function QuestionnairePage() {
  const router = useRouter();
  const { data, isLoaded, saveData, setCurrentStep } = useQuestionnaire();
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const currentStep = data.currentStep;
  const progress = Math.round((currentStep / 7) * 100);

  const steps = useMemo(
    () => [
      { number: 1, title: "个人信息", required: true },
      { number: 2, title: "教育背景", required: true },
      { number: 3, title: "标化成绩", required: false },
      { number: 4, title: "工作经历", required: false },
      { number: 5, title: "项目经历", required: false },
      { number: 6, title: "荣誉奖项", required: false },
      { number: 7, title: "技能", required: false },
    ],
    []
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const topEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!topEntry) return;
        const stepValue = Number(topEntry.target.getAttribute("data-step"));
        if (!Number.isNaN(stepValue) && stepValue !== currentStep) {
          setCurrentStep(stepValue);
        }
      },
      { root: container, threshold: [0.25, 0.5, 0.75] }
    );

    steps.forEach((step) => {
      const el = sectionRefs.current[step.number];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentStep, setCurrentStep, steps]);

  const handleStepClick = useCallback(
    (step: number) => {
      setCurrentStep(step);
      const section = sectionRefs.current[step];
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [setCurrentStep]
  );

  const handleGenerateMatch = useCallback(() => {
    router.push("/match");
  }, [router]);

  const updateData = useCallback(
    (field: keyof QuestionnaireData, value: unknown) => {
      saveData({ [field]: value });
    },
    [saveData]
  );

  const handleNextStep = useCallback(() => {
    if (currentStep < 7) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const section = sectionRefs.current[nextStep];
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    router.push("/match");
  }, [currentStep, router, setCurrentStep]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <GuestBanner />

      <header className="sticky top-8 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
            EduMatch
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowUploadPanel((v) => !v)}
              aria-label="上传材料"
              title="上传材料"
            >
              <Paperclip className="h-3.5 w-3.5" />
            </Button>
            <Button
              onClick={handleGenerateMatch}
              size="icon"
              className="h-8 w-8"
              aria-label="去匹配"
              title="去匹配"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {showUploadPanel && (
          <div className="mb-6 rounded-xl border border-border/80 bg-card/90 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">上传材料</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setShowUploadPanel(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FileUpload files={data.files} onFilesChange={(files) => updateData("files", files)} />
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-xl border border-border/80 bg-card/90 p-3">
              <div className="mb-3 px-2">
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>进度</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-foreground/80 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="space-y-1">
                {steps.map((step) => {
                  const isCurrent = currentStep === step.number;
                  return (
                    <button
                      key={step.number}
                      onClick={() => handleStepClick(step.number)}
                      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        isCurrent
                          ? "bg-foreground text-background"
                          : "text-muted-foreground/75 hover:bg-muted/40"
                      }`}
                    >
                      <span className={`w-7 text-xs ${isCurrent ? "text-background/80" : "text-muted-foreground/70"}`}>{String(step.number).padStart(2, "0")}</span>
                      <span className={isCurrent ? "font-medium" : "font-normal"}>{step.title}</span>
                      {step.required && <span className={`text-xs ${isCurrent ? "text-background/80" : "text-muted-foreground/70"}`}>*</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div ref={scrollContainerRef} className="h-[calc(100vh-170px)] space-y-6 overflow-y-auto pr-1">
            <section
              ref={(el) => {
                sectionRefs.current[1] = el;
              }}
              data-step={1}
              className="rounded-xl border border-border/80 bg-card/95 p-8"
            >
              <PersonalInfoForm
                data={data.personalInfo}
                onChange={(personalInfo) => updateData("personalInfo", personalInfo)}
              />
            </section>

            <section
              ref={(el) => {
                sectionRefs.current[2] = el;
              }}
              data-step={2}
              className="rounded-xl border border-border/80 bg-card/95 p-8"
            >
              <EducationForm data={data.education} onChange={(education) => updateData("education", education)} />
            </section>

            <section
              ref={(el) => {
                sectionRefs.current[3] = el;
              }}
              data-step={3}
              className="rounded-xl border border-border/80 bg-card/95 p-8"
            >
              <StandardizedTestsForm data={data.tests} onChange={(tests) => updateData("tests", tests)} />
            </section>

            <section
              ref={(el) => {
                sectionRefs.current[4] = el;
              }}
              data-step={4}
              className="rounded-xl border border-border/80 bg-card/95 p-8"
            >
              <WorkExperienceForm
                data={data.workExperience}
                onChange={(workExperience) => updateData("workExperience", workExperience)}
              />
            </section>

            <section
              ref={(el) => {
                sectionRefs.current[5] = el;
              }}
              data-step={5}
              className="rounded-xl border border-border/80 bg-card/95 p-8"
            >
              <ProjectExperienceForm data={data.projects} onChange={(projects) => updateData("projects", projects)} />
            </section>

            <section
              ref={(el) => {
                sectionRefs.current[6] = el;
              }}
              data-step={6}
              className="rounded-xl border border-border/80 bg-card/95 p-8"
            >
              <HonorsForm data={data.honors} onChange={(honors) => updateData("honors", honors)} />
            </section>

            <section
              ref={(el) => {
                sectionRefs.current[7] = el;
              }}
              data-step={7}
              className="rounded-xl border border-border/80 bg-card/95 p-8"
            >
              <SkillsForm data={data.skills} onChange={(skills) => updateData("skills", skills)} />
            </section>

          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground/70">已自动保存</p>
      </main>

      <div className="sticky bottom-0 z-30 border-t border-border bg-background/85 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl justify-end">
          <Button
            onClick={handleNextStep}
            disabled={false}
            className="h-10 min-w-32"
          >
            {currentStep === 7 ? "完成" : "下一步"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
