import { findSchoolSuggestionExact } from "./school-suggestions";

const SCHOOL_ID_TO_DOMAIN: Record<string, string> = {
  mit: "mit.edu",
  stanford: "stanford.edu",
  cmu: "cmu.edu",
  oxford: "ox.ac.uk",
  cambridge: "cam.ac.uk",
  columbia: "columbia.edu",
  duke: "duke.edu",
  nyu: "nyu.edu",
  ucl: "ucl.ac.uk",
  imperial: "imperial.ac.uk",
  nus: "nus.edu.sg",
  utoronto: "utoronto.ca",
  hku: "hku.hk",
  bu: "bu.edu",
  usc: "usc.edu",
  manchester: "manchester.ac.uk",
  edinburgh: "ed.ac.uk",
  ubc: "ubc.ca",
};

/** 与 `school-suggestions` 中文校名一一对应，用于演示环境校徽（站点 favicon） */
const ZH_TO_DOMAIN: Record<string, string> = {
  北京大学: "pku.edu.cn",
  清华大学: "tsinghua.edu.cn",
  复旦大学: "fudan.edu.cn",
  上海交通大学: "sjtu.edu.cn",
  浙江大学: "zju.edu.cn",
  中国科学技术大学: "ustc.edu.cn",
  南京大学: "nju.edu.cn",
  中国人民大学: "ruc.edu.cn",
  武汉大学: "whu.edu.cn",
  中山大学: "sysu.edu.cn",
  华中科技大学: "hust.edu.cn",
  哈尔滨工业大学: "hit.edu.cn",
  西安交通大学: "xjtu.edu.cn",
  北京航空航天大学: "buaa.edu.cn",
  同济大学: "tongji.edu.cn",
  北京师范大学: "bnu.edu.cn",
  东南大学: "seu.edu.cn",
  南开大学: "nankai.edu.cn",
  天津大学: "tju.edu.cn",
  厦门大学: "xmu.edu.cn",
  四川大学: "scu.edu.cn",
  吉林大学: "jlu.edu.cn",
  山东大学: "sdu.edu.cn",
  中南大学: "csu.edu.cn",
  大连理工大学: "dlut.edu.cn",
  西北工业大学: "nwpu.edu.cn",
  华南理工大学: "scut.edu.cn",
  华东师范大学: "ecnu.edu.cn",
  电子科技大学: "uestc.edu.cn",
  重庆大学: "cqu.edu.cn",
  香港大学: "hku.hk",
  香港中文大学: "cuhk.edu.hk",
  香港科技大学: "hkust.edu.hk",
  台湾大学: "ntu.edu.tw",
  麻省理工学院: "mit.edu",
  斯坦福大学: "stanford.edu",
  卡内基梅隆大学: "cmu.edu",
  牛津大学: "ox.ac.uk",
  剑桥大学: "cam.ac.uk",
  哥伦比亚大学: "columbia.edu",
  杜克大学: "duke.edu",
  纽约大学: "nyu.edu",
  伦敦大学学院: "ucl.ac.uk",
  帝国理工学院: "imperial.ac.uk",
  新加坡国立大学: "nus.edu.sg",
  多伦多大学: "utoronto.ca",
  波士顿大学: "bu.edu",
  南加州大学: "usc.edu",
  曼彻斯特大学: "manchester.ac.uk",
  爱丁堡大学: "ed.ac.uk",
  不列颠哥伦比亚大学: "ubc.ca",
};

function googleFaviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
}

export function faviconUrlForSchoolId(id: string): string | undefined {
  const domain = SCHOOL_ID_TO_DOMAIN[id];
  return domain ? googleFaviconUrl(domain) : undefined;
}

export function faviconUrlForSchoolLabel(label: string): string | undefined {
  const hit = findSchoolSuggestionExact(label);
  if (!hit) return undefined;
  const domain = ZH_TO_DOMAIN[hit.zh];
  return domain ? googleFaviconUrl(domain) : undefined;
}
