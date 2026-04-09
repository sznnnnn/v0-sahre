/**
 * 演示用示例问卷：刘欣 / 华科产品设计本科（与 CV-Xin Liu 类经历一致，虚构演示用途）。
 */
import type { QuestionnaireData } from "./types";

export const SAMPLE_QUESTIONNAIRE_XIN_LIU_NOTE =
  "示例 A：刘欣 · 华科产品设计 · HCI/智能产品方向";

export function getSampleQuestionnaireXinLiuPayload(): Pick<
  QuestionnaireData,
  | "personalInfo"
  | "education"
  | "tests"
  | "workExperience"
  | "projects"
  | "honors"
  | "skills"
> {
  return {
    personalInfo: {
      fullName: "刘欣（Xin Liu）",
      targetCountry: ["us", "uk", "sg"],
      intendedMajor: "产品设计 / Product Design（HCI、智能产品方向）",
      intendedApplicationField: "人机交互、体验设计、服务设计、智能软硬件",
      budgetEstimate: "",
      plannedStudyDuration: "1–2 年",
      targetSemester: "2026 Fall",
      futurePlan:
        "结合设计能力与数据/AI 产品经验，在国际化团队中做 0–1 产品与人机协同体验；长期关注教育科技与文化科技场景。",
      fundingIntent: "mixed",
      teachingLanguagePref: "english",
      researchInterestNote:
        "CAPS 与感性工学（Kansei Engineering）在儿童教育机器人中的应用；漏斗与用户留存；多模态户外场景下的 XR 与数据闭环。",
      motivationNote:
        "希望将本科阶段在竞赛、论文与互联网实习中积累的设计研究能力，升级到跨学科硕士培养体系中，系统深化 HCI 与产品战略。",
      otherApplicationNotes:
        "偏好有跨学院选课和产业合作机会的项目；希望作品集可作为课程评估的一部分，便于持续迭代。",
      knownTargetSchools: "",
    },
    tests: {},
    education: [
      {
        school: "华中科技大学（Huazhong University of Science and Technology, HUST）",
        degree: "本科",
        major: "产品设计（Bachelor of Arts in Product Design）",
        gpa: "90.10/100",
        startDate: "2022-09",
        endDate: "2026-06",
        achievements:
          "国家级竞赛奖项（智能机器人国一、计算机设计国三、NCDA 国三、国际用户体验大赛国二等）；HCII 2025 会议论文第二作者；发明专利已授权。",
      },
    ],
    workExperience: [
      {
        id: "xinliu-weipai",
        company: "武汉微派网络科技有限公司（Wuhan Weipai Network Technology Co., Ltd.）",
        position: "产品实习生（Product Intern, Project 42）",
        startDate: "2025-07",
        endDate: "",
        isCurrent: true,
        situation: "增长与留存分析、AI 记忆摘要（C Prompt）体验迭代、跨职能 0–1 产品推进。",
        task: "用数据与实验提升早期留存与信息抽取准确度，并推动 Misbah AI 多版本上线。",
        action:
          "搭建漏斗模型诊断流失与痛点；迭代 AI 记忆摘要设计并建立多版本测试流程；协调设计、研发与用研交付原型与 1.1–2.0 版本。",
        result:
          "早期留存与关键指标优化（具体数值可在正式文书中补充）；形成可复用的实验与协作机制。",
      },
      {
        id: "xinliu-bingyan-sup",
        company: "武汉冰岩在线科技有限公司 · 冰岩作坊（BingYan Studio）",
        position: "主管（Supervisor）",
        startDate: "2024-11",
        endDate: "",
        isCurrent: true,
        situation: "80+ 人跨产品、设计、开发、运营与游戏的多条线并行。",
        task: "统筹资源、推进 AI 工作流与旗舰产品迭代，拓展校内外合作与品牌活动。",
        action:
          "带队 iChoice、EatWhatHuster 等；发起 GitHubBox、Review Site、AI Campus Shop 等；组织 Hackathon/Gamejam（200+ 人、30+ 项目），运营 iKnow HUST（10 万+ 粉丝）并与腾讯武汉研究中心等合作。",
        result: "提升团队交付效率与产品覆盖面，沉淀校园数字化服务矩阵。",
      },
      {
        id: "xinliu-bingyan-tl",
        company: "冰岩作坊 · 学生互联网技术团队",
        position: "设计组组长（Team Leader）",
        startDate: "2023-11",
        endDate: "2024-11",
        isCurrent: false,
        situation: "12 人跨 UI/UX 与游戏美术的设计小组。",
        task: "任务分配、进度与创意方向把控，建立规范与分享机制。",
        action:
          "制定设计规范与工作流；定期设计分享；主导「爱选修」小程序改版，扩展劳动课、物理实验与 AI 相关模块。",
        result: "提升小组产出一致性与交付节奏，核心产品体验迭代落地。",
      },
    ],
    projects: [
      {
        id: "xinliu-eye",
        name: "Eye-Care 产品设计（护眼场景）",
        role: "用户研究 & 界面设计（User Researcher & Interface Designer）",
        startDate: "2025-04",
        endDate: "2025-07",
        situation: "家庭场景高频屏幕使用与居家护理需求不明确。",
        task: "厘清核心用户痛点并形成可落地的双语移动界面方案。",
        action:
          "深度访谈 14+ 家庭用户，输出 80+ 页研究报告；独立完成 22 页中英双语界面与交互逻辑，经 3 轮用户反馈迭代。",
        result: "聚焦高频用眼与居家护理动线，显著提升可用性与方案完整度。",
      },
      {
        id: "xinliu-1037",
        name: "1037 毕业礼物设计（HUST 文化 IP）",
        role: "设计师",
        startDate: "2025-04",
        endDate: "2025-06",
        situation: "毕业纪念品需承载校园文化并增强互动记忆。",
        task: "概念、视觉与落地协同，并在毕业晚会收集反馈。",
        action:
          "融入「森林 1037」、梧桐大道与校训等元素，设计 AR 明信片等纪念物；负责展位与 20+ 毕业生互动，整理 10+ 条设计洞察；对接供应链控预算保还原。",
        result: "获指导教师高度认可，形成可复制的文化 IP 礼品链路。",
      },
      {
        id: "xinliu-navix",
        name: "NAVIX 户外探险系统",
        role: "设计师",
        startDate: "2024-11",
        endDate: "2025-03",
        situation: "户外场景需要行前—行中—行后连续支持，而非单点工具。",
        task: "端到端系统设计，融合健康数据、AI 路线与 XR 多模态交互。",
        action:
          "构建旅程文档、年度成长总结与知识共创的数据闭环；探索手势/语音/视觉等低干扰交互。",
        result: "形成面向户外社群的长期价值沉淀与分享机制方案。",
      },
    ],
    honors: [
      {
        id: "xinliu-ncda",
        name: "第 13 届 NCDA 未来设计师大赛国三等奖",
        issuer: "NCDA 组委会",
        date: "2025-08",
        description: "全国三等奖",
      },
      {
        id: "xinliu-cuircc",
        name: "第 7 届中国高校智能机器人创意大赛国一等奖",
        issuer: "CUIRCC 组委会",
        date: "2024-08",
        description: "全国一等奖",
      },
      {
        id: "xinliu-cscsdc",
        name: "第 17 届中国大学生计算机设计大赛国三等奖",
        issuer: "CCSCDC 组委会",
        date: "2024-08",
        description: "全国三等奖",
      },
      {
        id: "xinliu-ux-award",
        name: "UX Design Awards 2024 国际提名",
        issuer: "UX Design Awards",
        date: "2024-07",
        description: "作品「Echoes of Nuo: A Cultural Heritage Project」",
      },
      {
        id: "xinliu-ux-china",
        name: "国际用户体验大赛 国家二等奖",
        issuer: "大赛组委会",
        date: "2024-11",
        description: "全国总决赛二等奖（可与 UXDA 等国际用户体验类赛事对应）",
      },
      {
        id: "xinliu-hcii",
        name: "会议论文第二作者（HCII 2025）",
        issuer: "International Conference on Human-Computer Interaction",
        date: "2025-05",
        description:
          "Children's Chess Robots Design Based on CAPS Theory and Kansei Engineering",
      },
      {
        id: "xinliu-patent",
        name: "发明专利：模块化树形多功能儿童书架（已授权）",
        issuer: "国家知识产权局",
        date: "2025-02",
        description:
          "Modular Tree-Shaped Multifunctional Children's Bookshelf · 已获发明专利证书（正式申请号/公告号可在文书中补全）",
      },
    ],
    skills: [
      { id: "xinliu-s1", name: "Figma / Sketch / Adobe XD", level: "expert", category: "technical" },
      { id: "xinliu-s2", name: "Photoshop / Illustrator / After Effects", level: "advanced", category: "technical" },
      { id: "xinliu-s3", name: "ProtoPie / Principle / Rive", level: "advanced", category: "technical" },
      { id: "xinliu-s4", name: "Blender / SketchUp / C4D / UE / KeyShot / Rhino", level: "advanced", category: "technical" },
      { id: "xinliu-s5", name: "Midjourney / Stable Diffusion / Google AI Studio", level: "advanced", category: "technical" },
      { id: "xinliu-s6", name: "ThinkingData 等数据分析工具", level: "intermediate", category: "technical" },
      { id: "xinliu-s7", name: "英语（文书与会议）", level: "advanced", category: "language" },
      { id: "xinliu-s8", name: "跨职能协作与 0–1 产品推进", level: "advanced", category: "soft" },
      { id: "xinliu-s9", name: "用户研究与双语界面交付", level: "advanced", category: "soft" },
    ],
  };
}
