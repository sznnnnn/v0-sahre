// 用户问卷数据类型
export interface PersonalInfo {
  fullName: string;
  /** 地区代码；含特殊值 "undecided" 表示尚未确定（匹配时不按国家筛选） */
  targetCountry: string[];
  /** 目标申请项目/专业（展示以英文名为准） */
  intendedMajor: string;
  /** 希望申请的领域（如 CS / DS / 金融 等，可与目标专业互补） */
  intendedApplicationField: string;
  /** 留学预算（自由填写，如 50万/年、$80k） */
  budgetEstimate: string;
  /** 期望项目学制（如 1年、1.5年、2年、不限） */
  plannedStudyDuration: string;
  targetSemester: string;
  /** 未来规划（拓展，可选，自由文本） */
  futurePlan: string;
  /** 经费来源意向 */
  fundingIntent: "" | "self" | "scholarship" | "mixed";
  /** 授课语言偏好 */
  teachingLanguagePref: "" | "english" | "bilingual_ok" | "any";
  /** 研究兴趣补充说明 */
  researchInterestNote: string;
  /** 留学动机 / 一句话目标 */
  motivationNote: string;
  /** 其他与申请相关的补充说明（自由填写） */
  otherApplicationNotes: string;
  /** 已有目标院校时直接填写（多校可换行或顿号分隔，中英校名均可） */
  knownTargetSchools: string;
}

export interface Education {
  school: string;
  degree: string;
  major: string;
  /** 成绩自由填写，如 3.8/4.0、百分制 88、均分 85 */
  gpa: string;
  startDate: string;
  endDate: string;
  achievements?: string;
}

export interface StandardizedTest {
  toefl?: { total: string; reading: string; listening: string; speaking: string; writing: string };
  ielts?: { overall: string; reading: string; listening: string; speaking: string; writing: string };
  gre?: { verbal: string; quantitative: string; analyticalWriting: string };
  gmat?: { total: string; verbal: string; quantitative: string; integratedReasoning: string; analyticalWriting: string };
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  // STAR 法则
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface ProjectExperience {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  // STAR 法则
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface Honor {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "technical" | "language" | "soft" | "other";
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url?: string;
}

export interface QuestionnaireData {
  personalInfo: PersonalInfo;
  education: Education[];
  tests: StandardizedTest;
  workExperience: WorkExperience[];
  projects: ProjectExperience[];
  honors: Honor[];
  skills: Skill[];
  files: UploadedFile[];
  completedSteps: number[];
  currentStep: number;
  lastUpdated: string;
}

// 学校和项目类型
export interface School {
  id: string;
  name: string;
  nameEn: string;
  country: string;
  city: string;
  ranking: number;
  logo?: string;
  category: "reach" | "match" | "safety"; // 冲刺 | 主申 | 保底
  /** 校园气质、学术传统与培养特色（展示用文案） */
  campusStyle?: string;
  /** 地理位置、城市环境、气候与交通便利等 */
  locationAndSetting?: string;
  /** 住宿、生活成本、国际生社群与课余节奏等 */
  studentLife?: string;
  /** 主校区近似纬度（地图标点） */
  lat?: number;
  /** 主校区近似经度（地图标点） */
  lng?: number;
}

export interface Program {
  id: string;
  schoolId: string;
  name: string;
  nameEn: string;
  degree: string;
  department: string;
  duration: string;
  deadline: string;
  applicationFee: string;
  tuition: string;
  requirements: string[];
  description: string;
  /** 课程与培养方向等摘要，用于匹配页展示 */
  curriculumNote?: string;
  matchScore: number;
  matchReasons: string[];
  category: "reach" | "match" | "safety";
}

export interface MatchResult {
  schools: School[];
  programs: Program[];
  generatedAt: string;
}

// 初始问卷数据
export const initialQuestionnaireData: QuestionnaireData = {
  personalInfo: {
    fullName: "",
    targetCountry: [],
    intendedMajor: "",
    intendedApplicationField: "",
    budgetEstimate: "",
    plannedStudyDuration: "",
    targetSemester: "",
    futurePlan: "",
    fundingIntent: "",
    teachingLanguagePref: "",
    researchInterestNote: "",
    motivationNote: "",
    otherApplicationNotes: "",
    knownTargetSchools: "",
  },
  education: [],
  tests: {},
  workExperience: [],
  projects: [],
  honors: [],
  skills: [],
  files: [],
  completedSteps: [],
  currentStep: 1,
  lastUpdated: new Date().toISOString(),
};
