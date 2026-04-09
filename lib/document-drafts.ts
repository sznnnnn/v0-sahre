export type DocumentDraftKind = "ps" | "cv" | "why_school" | "rl_outline";

export const DOCUMENT_DRAFT_LABELS: Record<DocumentDraftKind, string> = {
  ps: "个人陈述",
  cv: "简历大纲",
  why_school: "Why School",
  rl_outline: "推荐信提纲",
};

export const DOCUMENT_DRAFT_ORDER: DocumentDraftKind[] = ["ps", "cv", "why_school", "rl_outline"];

const STORAGE_KEY = "edumatch_document_drafts";

export interface DocumentDraftPayload {
  content: string;
  updatedAt: string;
}

type DraftStore = Record<string, DocumentDraftPayload>;

export function draftStorageKey(programId: string, kind: DocumentDraftKind): string {
  return `${programId}::${kind}`;
}

export function readDraftStore(): DraftStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
      ? (parsed as DraftStore)
      : {};
  } catch {
    return {};
  }
}

export function writeDraftStore(store: DraftStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getDraft(programId: string, kind: DocumentDraftKind): DocumentDraftPayload | null {
  const store = readDraftStore();
  return store[draftStorageKey(programId, kind)] ?? null;
}

export function saveDraft(programId: string, kind: DocumentDraftKind, content: string): void {
  const store = readDraftStore();
  store[draftStorageKey(programId, kind)] = {
    content,
    updatedAt: new Date().toISOString(),
  };
  writeDraftStore(store);
}

export function getProgramIdsWithSavedDrafts(): Set<string> {
  const store = readDraftStore();
  const ids = new Set<string>();
  for (const key of Object.keys(store)) {
    if (store[key]?.content?.trim()) {
      const pid = key.split("::")[0];
      if (pid) ids.add(pid);
    }
  }
  return ids;
}

/** 有非空内容的文书，按项目聚合，用于工作台「我的文书」列表 */
export interface ProgramDraftSummary {
  programId: string;
  lastUpdated: string;
  kinds: DocumentDraftKind[];
}

export function listProgramDraftSummaries(): ProgramDraftSummary[] {
  const store = readDraftStore();
  const byProgram: Record<string, { kinds: DocumentDraftKind[]; last: string }> = {};

  for (const key of Object.keys(store)) {
    const sep = key.indexOf("::");
    if (sep < 0) continue;
    const pid = key.slice(0, sep);
    const kind = key.slice(sep + 2) as DocumentDraftKind;
    if (!pid || !DOCUMENT_DRAFT_ORDER.includes(kind)) continue;
    const payload = store[key];
    if (!payload?.content?.trim()) continue;

    if (!byProgram[pid]) {
      byProgram[pid] = { kinds: [], last: payload.updatedAt };
    }
    if (!byProgram[pid].kinds.includes(kind)) {
      byProgram[pid].kinds.push(kind);
    }
    if (payload.updatedAt > byProgram[pid].last) {
      byProgram[pid].last = payload.updatedAt;
    }
  }

  return Object.entries(byProgram)
    .map(([programId, v]) => ({
      programId,
      lastUpdated: v.last,
      kinds: DOCUMENT_DRAFT_ORDER.filter((k) => v.kinds.includes(k)),
    }))
    .sort((a, b) => (a.lastUpdated < b.lastUpdated ? 1 : -1));
}

export interface DraftContext {
  schoolName: string;
  schoolNameEn: string;
  programName: string;
  programNameEn: string;
  degree: string;
  department: string;
  deadline: string;
}

export function buildDraftSeed(kind: DocumentDraftKind, ctx: DraftContext): string {
  const header = `【${ctx.schoolNameEn} — ${ctx.programNameEn}】\n学位：${ctx.degree} ｜ 院系：${ctx.department} ｜ 截止：${ctx.deadline}\n\n`;

  switch (kind) {
    case "ps":
      return (
        `${header}` +
        `一、申请动机（为何选择该领域与项目）\n\n` +
        `二、学术准备（课程、科研、项目，与目标项目的连接）\n\n` +
        `三、职业/研究目标（短中长期）\n\n` +
        `四、为何是该校该项目（可结合课程、师资、资源）\n\n` +
        `五、结尾（总结与期待）\n`
      );
    case "cv":
      return (
        `${header}` +
        `教育背景\n- 学校 / 专业 / 时间 / GPA（可选）\n\n` +
        `研究 / 项目\n- 标题 · 角色 · 要点（量化成果优先）\n\n` +
        `实习 / 工作\n- 公司 · 职位 · 职责与成果\n\n` +
        `技能与证书\n- 技术栈 / 语言 / 标化（按需）\n\n` +
        `荣誉与其他\n`
      );
    case "why_school":
      return (
        `${header}` +
        `1. 与职业/研究目标的契合点\n\n` +
        `2. 具体吸引我的课程、实验室或资源（写清名称）\n\n` +
        `3. 我能为项目/社群带来的贡献\n\n` +
        `4. 结尾：总结与就读意愿\n`
      );
    case "rl_outline":
      return (
        `${header}` +
        `推荐人角色与认识场景：\n\n` +
        `希望推荐人强调的 3 个能力/事例：\n` +
        `1.\n2.\n3.\n\n` +
        `与该项目相关的细节（便于推荐人落笔）：\n\n`
      );
    default:
      return header;
  }
}
