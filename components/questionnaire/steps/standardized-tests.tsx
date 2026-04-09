"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import type { StandardizedTest } from "@/lib/types";

interface StandardizedTestsFormProps {
  data: StandardizedTest;
  onChange: (data: StandardizedTest) => void;
}

export function StandardizedTestsForm({ data, onChange }: StandardizedTestsFormProps) {
  const [activeTab, setActiveTab] = useState("toefl");

  const updateToefl = (field: string, value: string) => {
    onChange({
      ...data,
      toefl: { ...data.toefl, [field]: value } as StandardizedTest["toefl"],
    });
  };

  const updateIelts = (field: string, value: string) => {
    onChange({
      ...data,
      ielts: { ...data.ielts, [field]: value } as StandardizedTest["ielts"],
    });
  };

  const updateGre = (field: string, value: string) => {
    onChange({
      ...data,
      gre: { ...data.gre, [field]: value } as StandardizedTest["gre"],
    });
  };

  const updateGmat = (field: string, value: string) => {
    onChange({
      ...data,
      gmat: { ...data.gmat, [field]: value } as StandardizedTest["gmat"],
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FileText className="h-6 w-6 text-foreground" />
        <h2 className="text-2xl font-semibold text-foreground">标化成绩</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="toefl">TOEFL</TabsTrigger>
          <TabsTrigger value="ielts">IELTS</TabsTrigger>
          <TabsTrigger value="gre">GRE</TabsTrigger>
          <TabsTrigger value="gmat">GMAT</TabsTrigger>
        </TabsList>

        <TabsContent value="toefl" className="mt-8">
          <div className="space-y-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">TOEFL IBT</h3>
            <div className="grid gap-8 md:grid-cols-5">
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  总分
                </label>
                <input
                  type="text"
                  placeholder="120"
                  value={data.toefl?.total || ""}
                  onChange={(e) => updateToefl("total", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  阅读
                </label>
                <input
                  type="text"
                  placeholder="30"
                  value={data.toefl?.reading || ""}
                  onChange={(e) => updateToefl("reading", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  听力
                </label>
                <input
                  type="text"
                  placeholder="30"
                  value={data.toefl?.listening || ""}
                  onChange={(e) => updateToefl("listening", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  口语
                </label>
                <input
                  type="text"
                  placeholder="30"
                  value={data.toefl?.speaking || ""}
                  onChange={(e) => updateToefl("speaking", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  写作
                </label>
                <input
                  type="text"
                  placeholder="30"
                  value={data.toefl?.writing || ""}
                  onChange={(e) => updateToefl("writing", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ielts" className="mt-8">
          <div className="space-y-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">IELTS</h3>
            <div className="grid gap-8 md:grid-cols-5">
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  总分
                </label>
                <input
                  type="text"
                  placeholder="9.0"
                  value={data.ielts?.overall || ""}
                  onChange={(e) => updateIelts("overall", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  阅读
                </label>
                <input
                  type="text"
                  placeholder="9.0"
                  value={data.ielts?.reading || ""}
                  onChange={(e) => updateIelts("reading", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  听力
                </label>
                <input
                  type="text"
                  placeholder="9.0"
                  value={data.ielts?.listening || ""}
                  onChange={(e) => updateIelts("listening", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  口语
                </label>
                <input
                  type="text"
                  placeholder="9.0"
                  value={data.ielts?.speaking || ""}
                  onChange={(e) => updateIelts("speaking", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  写作
                </label>
                <input
                  type="text"
                  placeholder="9.0"
                  value={data.ielts?.writing || ""}
                  onChange={(e) => updateIelts("writing", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gre" className="mt-8">
          <div className="space-y-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">GRE GENERAL</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  VERBAL
                </label>
                <input
                  type="text"
                  placeholder="170"
                  value={data.gre?.verbal || ""}
                  onChange={(e) => updateGre("verbal", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  QUANTITATIVE
                </label>
                <input
                  type="text"
                  placeholder="170"
                  value={data.gre?.quantitative || ""}
                  onChange={(e) => updateGre("quantitative", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  ANALYTICAL WRITING
                </label>
                <input
                  type="text"
                  placeholder="6.0"
                  value={data.gre?.analyticalWriting || ""}
                  onChange={(e) => updateGre("analyticalWriting", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gmat" className="mt-8">
          <div className="space-y-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">GMAT</h3>
            <div className="grid gap-8 md:grid-cols-5">
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  总分
                </label>
                <input
                  type="text"
                  placeholder="800"
                  value={data.gmat?.total || ""}
                  onChange={(e) => updateGmat("total", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  VERBAL
                </label>
                <input
                  type="text"
                  placeholder="60"
                  value={data.gmat?.verbal || ""}
                  onChange={(e) => updateGmat("verbal", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  QUANTITATIVE
                </label>
                <input
                  type="text"
                  placeholder="60"
                  value={data.gmat?.quantitative || ""}
                  onChange={(e) => updateGmat("quantitative", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  IR
                </label>
                <input
                  type="text"
                  placeholder="8"
                  value={data.gmat?.integratedReasoning || ""}
                  onChange={(e) => updateGmat("integratedReasoning", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
              <div className="space-y-2 border-b border-border pb-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  AWA
                </label>
                <input
                  type="text"
                  placeholder="6.0"
                  value={data.gmat?.analyticalWriting || ""}
                  onChange={(e) => updateGmat("analyticalWriting", e.target.value)}
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
}
