/** 本科/教育背景院校检索用（中英可搜，与匹配演示库校名对齐的可优先收录） */
export interface SchoolSuggestion {
  zh: string;
  en: string;
  /** 常用简称，参与搜索 */
  short?: string[];
}

const ENTRIES: SchoolSuggestion[] = [
  { zh: "北京大学", en: "Peking University", short: ["北大", "PKU"] },
  { zh: "清华大学", en: "Tsinghua University", short: ["清华", "THU"] },
  { zh: "复旦大学", en: "Fudan University", short: ["复旦", "FDU"] },
  { zh: "上海交通大学", en: "Shanghai Jiao Tong University", short: ["上海交大", "SJTU"] },
  { zh: "浙江大学", en: "Zhejiang University", short: ["浙大", "ZJU"] },
  { zh: "中国科学技术大学", en: "University of Science and Technology of China", short: ["中科大", "USTC"] },
  { zh: "南京大学", en: "Nanjing University", short: ["南大"] },
  { zh: "中国人民大学", en: "Renmin University of China", short: ["人大", "RUC"] },
  { zh: "武汉大学", en: "Wuhan University", short: ["武大"] },
  { zh: "中山大学", en: "Sun Yat-sen University", short: ["中大", "SYSU"] },
  { zh: "华中科技大学", en: "Huazhong University of Science and Technology", short: ["华科", "HUST"] },
  { zh: "哈尔滨工业大学", en: "Harbin Institute of Technology", short: ["哈工大", "HIT"] },
  { zh: "西安交通大学", en: "Xi'an Jiaotong University", short: ["西安交大", "XJTU"] },
  { zh: "北京航空航天大学", en: "Beihang University" },
  { zh: "同济大学", en: "Tongji University" },
  { zh: "北京师范大学", en: "Beijing Normal University" },
  { zh: "东南大学", en: "Southeast University" },
  { zh: "南开大学", en: "Nankai University" },
  { zh: "天津大学", en: "Tianjin University" },
  { zh: "厦门大学", en: "Xiamen University" },
  { zh: "四川大学", en: "Sichuan University" },
  { zh: "吉林大学", en: "Jilin University" },
  { zh: "山东大学", en: "Shandong University" },
  { zh: "中南大学", en: "Central South University" },
  { zh: "大连理工大学", en: "Dalian University of Technology" },
  { zh: "西北工业大学", en: "Northwestern Polytechnical University" },
  { zh: "华南理工大学", en: "South China University of Technology" },
  { zh: "华东师范大学", en: "East China Normal University" },
  { zh: "电子科技大学", en: "University of Electronic Science and Technology of China" },
  { zh: "重庆大学", en: "Chongqing University" },
  { zh: "香港大学", en: "The University of Hong Kong", short: ["港大", "HKU"] },
  { zh: "香港中文大学", en: "The Chinese University of Hong Kong", short: ["港中文", "CUHK"] },
  { zh: "香港科技大学", en: "The Hong Kong University of Science and Technology", short: ["港科大", "HKUST"] },
  { zh: "台湾大学", en: "National Taiwan University" },
  { zh: "麻省理工学院", en: "MIT" },
  { zh: "斯坦福大学", en: "Stanford University" },
  { zh: "卡内基梅隆大学", en: "Carnegie Mellon University" },
  { zh: "牛津大学", en: "University of Oxford" },
  { zh: "剑桥大学", en: "University of Cambridge" },
  { zh: "哥伦比亚大学", en: "Columbia University" },
  { zh: "杜克大学", en: "Duke University" },
  { zh: "纽约大学", en: "New York University" },
  { zh: "伦敦大学学院", en: "University College London" },
  { zh: "帝国理工学院", en: "Imperial College London" },
  { zh: "新加坡国立大学", en: "National University of Singapore" },
  { zh: "多伦多大学", en: "University of Toronto" },
  { zh: "波士顿大学", en: "Boston University" },
  { zh: "南加州大学", en: "University of Southern California" },
  { zh: "曼彻斯特大学", en: "University of Manchester" },
  { zh: "爱丁堡大学", en: "University of Edinburgh" },
  { zh: "不列颠哥伦比亚大学", en: "University of British Columbia" },
];

function entryMatches(s: SchoolSuggestion, q: string, lower: string): boolean {
  if (s.zh.includes(q)) return true;
  if (s.en.toLowerCase().includes(lower)) return true;
  return s.short?.some((x) => x.includes(q) || x.toLowerCase().includes(lower)) ?? false;
}

export function filterSchoolSuggestions(query: string, limit = 24): SchoolSuggestion[] {
  const q = query.trim();
  if (!q) return ENTRIES.slice(0, limit);
  const lower = q.toLowerCase();
  return ENTRIES.filter((s) => entryMatches(s, q, lower)).slice(0, limit);
}

/** 与建议库完全匹配时用于解析校徽等（中文校名、英文全称、简称） */
export function findSchoolSuggestionExact(raw: string): SchoolSuggestion | undefined {
  const t = raw.trim();
  if (!t) return undefined;
  const lower = t.toLowerCase();
  return ENTRIES.find(
    (s) =>
      s.zh === t ||
      s.en.toLowerCase() === lower ||
      (s.short?.some((x) => x === t || x.toLowerCase() === lower) ?? false)
  );
}
