"use client";

import { useState } from "react";
import { User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { PersonalInfo } from "@/lib/types";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const targetCountries = [
  { value: "us", label: "美国", emoji: "🇺🇸" },
  { value: "uk", label: "英国", emoji: "🇬🇧" },
  { value: "ca", label: "加拿大", emoji: "🇨🇦" },
  { value: "au", label: "澳大利亚", emoji: "🇦🇺" },
  { value: "sg", label: "新加坡", emoji: "🇸🇬" },
  { value: "hk", label: "中国香港", emoji: "🇭🇰" },
  { value: "de", label: "德国", emoji: "🇩🇪" },
  { value: "jp", label: "日本", emoji: "🇯🇵" },
];

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const [countryView, setCountryView] = useState<"cards" | "map">("cards");

  const handleChange = (field: keyof PersonalInfo, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const toggleCountry = (country: string) => {
    const current = data.targetCountry || [];
    const updated = current.includes(country)
      ? current.filter((c) => c !== country)
      : [...current, country];
    handleChange("targetCountry", updated);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <User className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">基本信息</h2>
      </div>

      <div className="grid gap-x-8 gap-y-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            姓名
          </label>
          <div className="border-b border-border pb-2 transition-colors focus-within:border-foreground/60">
            <Input
              type="text"
              placeholder="姓名"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="h-auto border-0 bg-transparent px-0 py-0 text-base text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            目标专业
          </label>
          <div className="border-b border-border pb-2 transition-colors focus-within:border-foreground/60">
            <Input
              type="text"
              placeholder="目标申请专业"
              value={data.intendedMajor}
              onChange={(e) => handleChange("intendedMajor", e.target.value)}
              className="h-auto border-0 bg-transparent px-0 py-0 text-base text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            学位
          </label>
          <div className="border-b border-border pb-2 transition-colors focus-within:border-foreground/60">
            <Select
              value={data.targetDegree}
              onValueChange={(value) => handleChange("targetDegree", value)}
            >
              <SelectTrigger className="w-full border-0 bg-transparent p-0 text-base shadow-none focus:ring-0 h-auto">
                <SelectValue placeholder="目标学位" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bachelor">本科</SelectItem>
                <SelectItem value="master">硕士</SelectItem>
                <SelectItem value="phd">博士</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-x-8 gap-y-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            本科专业
          </label>
          <div className="border-b border-border pb-2 transition-colors focus-within:border-foreground/60">
            <Input
              type="text"
              placeholder="本科专业"
              value={data.undergraduateMajor}
              onChange={(e) => handleChange("undergraduateMajor", e.target.value)}
              className="h-auto border-0 bg-transparent px-0 py-0 text-base text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            申请领域
          </label>
          <div className="border-b border-border pb-2 transition-colors focus-within:border-foreground/60">
            <Input
              type="text"
              placeholder="如 CS、数据科学、金融"
              value={data.intendedApplicationField}
              onChange={(e) => handleChange("intendedApplicationField", e.target.value)}
              className="h-auto border-0 bg-transparent px-0 py-0 text-base text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            入学时间
          </label>
          <div className="border-b border-border pb-2 transition-colors focus-within:border-foreground/60">
            <Input
              type="text"
              placeholder="入学时间"
              value={data.targetSemester}
              onChange={(e) => handleChange("targetSemester", e.target.value)}
              className="h-auto border-0 bg-transparent px-0 py-0 text-base text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-x-8 gap-y-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            预算
          </label>
          <div className="border-b border-border pb-2 transition-colors focus-within:border-foreground/60">
            <Input
              type="text"
              placeholder="如 50万/年、$80k"
              value={data.budgetEstimate}
              onChange={(e) => handleChange("budgetEstimate", e.target.value)}
              className="h-auto border-0 bg-transparent px-0 py-0 text-base text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            学制打算
          </label>
          <div className="border-b border-border pb-2 transition-colors focus-within:border-foreground/60">
            <Input
              type="text"
              placeholder="如 1年、2年、不限"
              value={data.plannedStudyDuration}
              onChange={(e) => handleChange("plannedStudyDuration", e.target.value)}
              className="h-auto border-0 bg-transparent px-0 py-0 text-base text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground">
              地区
            </label>
            <div className="inline-flex rounded-md border border-border bg-muted/20 p-0.5">
              <button
                type="button"
                onClick={() => setCountryView("cards")}
                className={`rounded px-2 py-1 text-xs transition-colors ${
                  countryView === "cards" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/40"
                }`}
              >
                列表
              </button>
              <button
                type="button"
                onClick={() => setCountryView("map")}
                className={`rounded px-2 py-1 text-xs transition-colors ${
                  countryView === "map" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/40"
                }`}
              >
                地图
              </button>
            </div>
          </div>
          {data.targetCountry?.length > 0 && <span className="text-xs text-muted-foreground/70">{data.targetCountry.length} 已选</span>}
        </div>

        {countryView === "cards" ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {targetCountries.map((country) => (
              <button
                type="button"
                key={country.value}
                onClick={() => toggleCountry(country.value)}
                className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors ${
                  data.targetCountry?.includes(country.value)
                    ? "border-foreground/50 bg-muted/50"
                    : "border-border hover:border-foreground/25 hover:bg-muted/30"
                }`}
              >
                <span className="text-lg leading-none">{country.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{country.label}</p>
                  <p className="text-xs text-muted-foreground/65">{data.targetCountry?.includes(country.value) ? "已选" : ""}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border/80 bg-card/90 p-4">
            <div className="relative h-[260px] w-full overflow-hidden rounded-lg bg-muted/30">
              {/* simplified world map background */}
              <svg viewBox="0 0 1000 500" className="h-full w-full opacity-60" aria-hidden="true">
                <path d="M92 180l70-58 120 18 65-34 110 30 33 58 92 20 30 42-22 38-84 11-70 56-94-18-55-48-88-12-58-44z" fill="currentColor" className="text-muted-foreground/40" />
                <path d="M568 142l118-66 125 16 80 48 43 83-36 60-140 8-109-30-73-50z" fill="currentColor" className="text-muted-foreground/40" />
                <path d="M753 304l74 22 54 72-52 66-84-16-22-78z" fill="currentColor" className="text-muted-foreground/40" />
              </svg>

              {/* clickable country anchors */}
              {[
                { value: "us", left: "23%", top: "44%" },
                { value: "uk", left: "47%", top: "33%" },
                { value: "de", left: "52%", top: "36%" },
                { value: "ca", left: "20%", top: "30%" },
                { value: "au", left: "83%", top: "76%" },
                { value: "sg", left: "74%", top: "62%" },
                { value: "hk", left: "78%", top: "53%" },
                { value: "jp", left: "84%", top: "46%" },
              ].map((point) => {
                const country = targetCountries.find((c) => c.value === point.value);
                if (!country) return null;
                const selected = data.targetCountry?.includes(country.value);

                return (
                  <button
                    key={country.value}
                    type="button"
                    onClick={() => toggleCountry(country.value)}
                    style={{ left: point.left, top: point.top }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-xs transition-all ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background/95 text-foreground hover:border-foreground/40"
                    }`}
                    title={country.label}
                  >
                    <span className="mr-1">{country.emoji}</span>
                    {country.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
