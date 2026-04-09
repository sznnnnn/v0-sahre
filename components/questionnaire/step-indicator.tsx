"use client";

import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  required: boolean;
}

const steps: Step[] = [
  { number: 1, title: "个人信息", required: true },
  { number: 2, title: "教育背景", required: true },
  { number: 3, title: "标化成绩", required: false },
  { number: 4, title: "工作经历", required: false },
  { number: 5, title: "项目经历", required: false },
  { number: 6, title: "荣誉奖项", required: false },
  { number: 7, title: "技能", required: false },
  { number: 8, title: "拓展问题", required: false },
];

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

export function StepIndicator({ currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden lg:flex items-center gap-1">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;
          
          return (
            <div key={step.number} className="flex items-center flex-1">
              <button
                onClick={() => onStepClick(step.number)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors w-full",
                  isCurrent
                    ? "bg-muted text-foreground"
                    : isCompleted
                    ? "text-muted-foreground hover:bg-muted/50"
                    : "text-muted-foreground/60 hover:bg-muted/50"
                )}
              >
                <span className={cn(
                  "text-xs font-medium",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {String(step.number).padStart(2, '0')}
                </span>
                <span className={cn(
                  "font-medium whitespace-nowrap",
                  isCurrent ? "text-foreground" : ""
                )}>
                  {step.title}
                </span>
                {step.required && (
                  <span className="text-xs text-muted-foreground">*</span>
                )}
              </button>
              {index < steps.length - 1 && (
                <div className="w-px h-4 bg-border mx-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile view */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            步骤 {currentStep} / {steps.length}
          </span>
          <span className="text-sm font-medium text-foreground">
            {steps[currentStep - 1]?.title}
            {steps[currentStep - 1]?.required && (
              <span className="text-muted-foreground ml-1">*</span>
            )}
          </span>
        </div>
        <div className="flex gap-1">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.number);
            const isCurrent = currentStep === step.number;
            
            return (
              <button
                key={step.number}
                onClick={() => onStepClick(step.number)}
                className={cn(
                  "flex-1 h-1 rounded-full transition-all",
                  isCompleted
                    ? "bg-foreground"
                    : isCurrent
                    ? "bg-foreground/50"
                    : "bg-border"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
