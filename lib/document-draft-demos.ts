import type { QuestionnaireData } from "./types";
import { initialQuestionnaireData } from "./types";
import {
  buildDraftSeed,
  buildProjectHeader,
  mergeDraftTemplateWithContext,
  type DocumentDraftKind,
  type DraftContext,
} from "./document-drafts";
import { getSampleQuestionnaireXinLiuPayload } from "./sample-questionnaire-xin-liu";
import { getSampleQuestionnaireDemoPayload } from "./sample-questionnaire-demo";

/** 虚构模版来源项目抬头（用于演示「套用模版」时替换为当前页项目） */
const DEMO_TEMPLATE_SOURCE_CTX: DraftContext = {
  schoolName: "卡内基梅隆大学",
  schoolNameEn: "Carnegie Mellon University",
  programName: "计算机科学硕士",
  programNameEn: "Master of Computer Science",
  degree: "MS",
  department: "SCS",
  deadline: "2025-12-15",
};

function questionnaireFromSample(
  partial: Pick<
    QuestionnaireData,
    "personalInfo" | "education" | "tests" | "workExperience" | "projects" | "honors" | "skills"
  >
): QuestionnaireData {
  return {
    ...initialQuestionnaireData,
    ...partial,
    personalInfo: { ...initialQuestionnaireData.personalInfo, ...partial.personalInfo },
  };
}

export const QUESTIONNAIRE_DEMO_DESIGN_FULL = questionnaireFromSample(getSampleQuestionnaireXinLiuPayload());
export const QUESTIONNAIRE_DEMO_EE_FULL = questionnaireFromSample(getSampleQuestionnaireDemoPayload());

export const QUESTIONNAIRE_DEMO_SPARSE: QuestionnaireData = questionnaireFromSample({
  personalInfo: {
    ...initialQuestionnaireData.personalInfo,
    fullName: "陈思（Chen Si）",
    targetCountry: ["us"],
    intendedMajor: "金融学硕士（公司金融与资产定价）",
    intendedApplicationField: "公司金融、实证资产定价",
    budgetEstimate: "",
    plannedStudyDuration: "2 年",
    targetSemester: "2026 Fall",
    futurePlan: "",
    fundingIntent: "self",
    teachingLanguagePref: "english",
    researchInterestNote: "",
    motivationNote:
      "本科在经管学院修读金融与会计核心课，希望在美国顶尖商学院体系下系统深化公司金融与估值方法，并向量化研究方向逐步过渡。",
    knownTargetSchools: "Columbia Business School, NYU Stern",
  },
  education: [],
  tests: {},
  workExperience: [],
  projects: [],
  honors: [],
  skills: [],
});

function simulatedSavedDraftFull(kind: DocumentDraftKind): string {
  const header = buildProjectHeader(DEMO_TEMPLATE_SOURCE_CTX);
  switch (kind) {
    case "ps":
      return (
        `${header}` +
        `以下「我的背景」根据问卷自动填入，可按文书需要删改或拆入各段。\n\n` +
        `【个人与申请意向】\n` +
        `姓名：刘欣（Xin Liu）\n` +
        `目标专业：产品设计 / Product Design（HCI、智能产品方向）\n` +
        `申请领域：人机交互、体验设计、服务设计、智能软硬件\n` +
        `目标入学：2026 Fall\n` +
        `申请动机（问卷摘要）：希望将本科阶段在竞赛、论文与互联网实习中积累的设计研究能力，升级到跨学科硕士培养体系中。\n\n` +
        `【教育背景】\n` +
        `- 华中科技大学 · 产品设计 · 本科（2022-09 – 2026-06）（成绩 90.10/100）\n` +
        `  补充：智能机器人国一、计算机设计国三、HCII 2025 会议论文第二作者等。\n\n` +
        `————————\n\n` +
        `一、申请动机\n` +
        `在微派网络的产品实习中，我负责增长漏斗诊断与 AI 记忆摘要体验迭代，逐渐把「留存曲线」还原成可触摸的界面与文案问题。` +
        `这让我确信自己希望在硕士阶段接受更系统的 HCI 训练，把设计研究能力嵌入真实产品闭环。\n\n` +
        `二、学术准备\n` +
        `Eye-Care 项目中我独立完成 14+ 户家庭深度访谈与 22 页中英双语界面方案；NAVIX 户外系统则训练我把多模态交互放进完整用户旅程。` +
        `HCII 论文工作让我第一次把理论框架（CAPS、感性工学）对接实体机器人设计。\n\n` +
        `三、职业与研究目标\n` +
        `短期希望在国际化产品团队中承担用户研究与体验策略角色；中长期关注教育科技与文化科技场景的人机协同。\n\n` +
        `四、Why program\n` +
        `贵项目在跨学科课程与产业合作上的安排，与我在本科阶段「设计 + 数据 + 协作」的实践高度同频；` +
        `我期待在导师指导下完成一项可落地、可评估的毕业作品。\n\n` +
        `五、结尾\n` +
        `感谢审阅；若能获得录取，我将全力投入课程与实验室工作，并为同学社群贡献设计与用研经验。\n`
      );
    case "cv":
      return (
        `${header}` +
        `（可将上文背景整理为条目；亦可按下述结构补充）\n\n` +
        `教育背景\n` +
        `- 华中科技大学 · 产品设计 · 本科 · GPA 90.10/100 · 2022–2026\n\n` +
        `研究 / 项目\n` +
        `- Eye-Care 护眼产品 · 用户研究与界面设计 · 14+ 访谈 / 双语界面交付\n` +
        `- NAVIX 户外探险系统 · 设计师 · 行前-行中-行后闭环与 XR 探索\n` +
        `- 1037 毕业礼物 · 设计师 · 校园文化 IP 与 AR 明信片落地\n\n` +
        `实习 / 工作\n` +
        `- 武汉微派网络 · 产品实习生 · 增长漏斗、AI 摘要体验、跨职能 0–1 迭代\n` +
        `- 冰岩作坊 · 主管 / 设计组长 · 多产品线协调、Hackathon 与品牌活动\n\n` +
        `技能与证书\n` +
        `- Figma / ProtoPie / Blender；Python 数据分析脚本；英语文书与会议\n\n` +
        `荣誉与其他\n` +
        `- 智能机器人国一、计算机设计国三、UX 国际提名、发明专利（已授权）等\n`
      );
    case "why_school":
      return (
        `${header}` +
        `1. 与职业/研究目标的契合点\n` +
        `我希望在硕士阶段把「设计研究 → 产品指标」这条链路走通；贵校所在城市与校友网络能提供我期待的科技与文化产业密度。\n\n` +
        `2. 具体吸引我的课程、实验室或资源\n` +
        `- 人机交互方向核心课与项目制节奏\n` +
        `- 与设计学院或计算机学院交叉的选修路径\n` +
        `- 可参与的实验室课题（可在正式申请前与在读学生进一步核实）\n\n` +
        `3. 我能为项目/社群带来的贡献\n` +
        `本科阶段多次带队跨职能交付，习惯用双语材料对齐设计、研发与用研；可为小组项目承担用户研究与原型验证。\n\n` +
        `4. 结尾\n` +
        `若能入读，我会积极参与课程项目与社群活动，并把实习中的增长与实验方法带进团队讨论。\n`
      );
    case "rl_outline":
      return (
        `${header}` +
        `推荐人角色与认识场景：\n` +
        `- 推荐人 A：本科设计专业课授课教师 / 毕设导师，评价设计研究与论文工作。\n` +
        `- 推荐人 B：实习直属上级（产品经理），评价跨职能协作与数据驱动迭代。\n\n` +
        `希望推荐人强调的 3 个能力/事例：\n` +
        `1. 用户研究与双语界面交付（Eye-Care 等项目）\n` +
        `2. 在快节奏团队中推进 0–1 功能（AI 摘要、增长实验）\n` +
        `3. 学术规范与创新能力（会议论文、专利）\n\n` +
        `与该项目相关的细节（便于推荐人落笔）：\n` +
        `- 意向项目方向：HCI / 智能产品；希望导师在推荐信中点出与「设计 + 技术交叉」相关的具体事例与时间线。\n`
      );
    default:
      return `${header}\n`;
  }
}

export type DraftPreviewSceneId =
  | "current"
  | "demo_design"
  | "demo_eng"
  | "demo_sparse"
  | "demo_template";

export const DOCUMENT_DRAFT_PREVIEW_SCENES: {
  id: DraftPreviewSceneId;
  label: string;
  description: string;
}[] = [
  {
    id: "current",
    label: "当前问卷",
    description: "基于你本机已填问卷生成的提纲；下方第二块为本地「套用模版」效果（若有）。",
  },
  {
    id: "demo_design",
    label: "示例·设计向",
    description: "虚构申请人「刘欣」：问卷信息较完整（教育、实习、项目、荣誉、技能），演示背景块铺满时的编辑体验。",
  },
  {
    id: "demo_eng",
    label: "示例·理工向",
    description: "虚构申请人「林予安」：含 TOEFL/GRE 与嵌入式实习，演示标化与工程经历进入文书材料的样子。",
  },
  {
    id: "demo_sparse",
    label: "示例·刚起步",
    description: "仅个人意向与动机、少量意向校，背景块较短，演示刚开始填问卷时的提纲。",
  },
  {
    id: "demo_template",
    label: "示例·已套模版",
    description: "假设曾在另一项目保存过一版正文：演示把该模版换到「当前页」学校与项目抬头后的效果（与真实套用逻辑一致）。",
  },
];

export function buildDraftPreviewForScene(
  scene: DraftPreviewSceneId,
  kind: DocumentDraftKind,
  ctx: DraftContext,
  currentPreview: { defaultSeed: string; templatePreview: string | null }
): { blocks: { label: string; text: string }[] } {
  if (scene === "current") {
    const blocks: { label: string; text: string }[] = [
      { label: "默认提纲（无本地模版、且无本项目已存稿时，编辑器会载入与此一致的内容）", text: currentPreview.defaultSeed },
    ];
    if (currentPreview.templatePreview) {
      blocks.push({
        label: "套用模版（你本地首次保存后产生的正文，已换成本页项目抬头）",
        text: currentPreview.templatePreview,
      });
    } else {
      blocks.push({
        label: "套用模版",
        text: "（你尚未在任意项目保存过该类型文书，本地无模版；保存一次后，其它项目的空白稿会自动套用其正文。）",
      });
    }
    return { blocks };
  }

  if (scene === "demo_template") {
    const full = simulatedSavedDraftFull(kind);
    return {
      blocks: [
        {
          label: "套用模版 → 已换为当前页项目抬头（演示）",
          text: mergeDraftTemplateWithContext(kind, ctx, full),
        },
      ],
    };
  }

  const q =
    scene === "demo_design"
      ? QUESTIONNAIRE_DEMO_DESIGN_FULL
      : scene === "demo_eng"
        ? QUESTIONNAIRE_DEMO_EE_FULL
        : QUESTIONNAIRE_DEMO_SPARSE;

  return {
    blocks: [
      {
        label: "默认提纲 + 自动生成的「我的背景」（演示问卷）",
        text: buildDraftSeed(kind, ctx, q),
      },
    ],
  };
}
