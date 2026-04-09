import type { School } from "./types";

/** 主校区近似坐标（WGS84），用于工作台地图 */
export const SCHOOL_COORDINATES: Record<string, { lat: number; lng: number }> = {
  mit: { lat: 42.3601, lng: -71.0942 },
  stanford: { lat: 37.4275, lng: -122.1697 },
  cmu: { lat: 40.4429, lng: -79.943 },
  oxford: { lat: 51.7555, lng: -1.2545 },
  cambridge: { lat: 52.2053, lng: 0.1218 },
  columbia: { lat: 40.8075, lng: -73.9626 },
  duke: { lat: 36.0011, lng: -78.9393 },
  nyu: { lat: 40.7295, lng: -73.9965 },
  ucl: { lat: 51.5246, lng: -0.134 },
  imperial: { lat: 51.4988, lng: -0.1749 },
  nus: { lat: 1.2966, lng: 103.7764 },
  utoronto: { lat: 43.6629, lng: -79.3957 },
  hku: { lat: 22.2829, lng: 114.1378 },
  bu: { lat: 42.3505, lng: -71.1054 },
  usc: { lat: 34.0224, lng: -118.2851 },
  manchester: { lat: 53.4668, lng: -2.2339 },
  edinburgh: { lat: 55.9444, lng: -3.1883 },
  ubc: { lat: 49.2606, lng: -123.246 },
};

/** 匹配结果中院校的补充介绍（风格、区位、生活），按 school.id 合并 */
export const SCHOOL_ENRICHMENT: Record<
  string,
  Pick<School, "campusStyle" | "locationAndSetting" | "studentLife">
> = {
  mit: {
    campusStyle:
      "极度强调动手与科研，理工与人文社科并重；节奏快、同伴压力大，适合自驱强、希望贴近前沿技术与产业转化的学生。",
    locationAndSetting:
      "位于大波士顿都会区剑桥市，沿查尔斯河与哈佛相邻；冬季寒冷多雪，春秋宜人。地铁与骑行方便，一小时圈内可达大量科技与生物医药企业。",
    studentLife:
      "本科住宿有保障，研究生多校外合租；食堂与社团极其丰富，黑客松与讲座密集。生活成本在美东偏高，国际生社群活跃。",
  },
  stanford: {
    campusStyle:
      "校园开阔、创业与跨学科氛围浓厚，与硅谷联系极紧；课程偏项目制与开放选修，适合想兼顾研究与产业落地的学生。",
    locationAndSetting:
      "位于旧金山湾区半岛，阳光充足；校车与湾区交通可通达旧金山与各大科技公司总部，实习与社交机会集中。",
    studentLife:
      "住宿紧张、租金高，许多高年级校外居住；户外运动与创投活动多，国际生比例高，社交圈层多元。",
  },
  cmu: {
    campusStyle:
      "计算机与艺术、戏剧等学院并立，「计算机名校」标签下实则非常跨学科；学业强度高，重视系统能力与团队项目。",
    locationAndSetting:
      "主校区在宾州匹兹堡，生活成本低于东西海岸；四季分明，城区正在复兴，科技岗位近年增长。",
    studentLife:
      "房租相对友好，校园活动与比赛多；冬季较冷，社交更多围绕课程与实验室，适合专注型学生。",
  },
  oxford: {
    campusStyle:
      "学院制（college）传统深厚，导师制小班课与学术仪式感强；人文与基础学科底蕴突出，研究型硕士节奏紧凑。",
    locationAndSetting:
      "牛津为历史小城，校区分散在城中；距伦敦约一小时火车，安静适合读书，雨天偏多。",
    studentLife:
      "学院提供住宿与餐饮，Formal Dinner 等传统社交多；国际生比例高，生活成本在英国属中上。",
  },
  cambridge: {
    campusStyle:
      "与牛津并称，科研集群强，理工科与自然科学尤其突出；课程结构因院系而异，整体强调独立研究与批判性写作。",
    locationAndSetting:
      "剑桥镇紧凑宜居，自行车为主；伦敦北上约 50 分钟，生活便利度与房租介于伦敦与地方城市之间。",
    studentLife:
      "学院与系所双重归属，社团与赛艇等传统活动出名；国际生社群成熟，租房需尽早准备。",
  },
  columbia: {
    campusStyle:
      "常春藤研究型大学，核心校区曼哈顿上城；新闻、商科、工程等均强，强调城市资源与跨校选课（如与 Barnard 等）。",
    locationAndSetting:
      "纽约曼哈顿，文化、实习与金融资源顶级；地铁发达，四季分明，冬季寒冷。生活成本与房租全美最高之一。",
    studentLife:
      "研究生多住校外或学校公寓抽签；课余展览、演出与实习机会极多，节奏快、社交面广。",
  },
  duke: {
    campusStyle:
      "南部「哥特式」主校园与森林式环境，体育传统强；本科通识与研究生专业教育并重，师生比相对友好。",
    locationAndSetting:
      "位于北卡达勒姆与教堂山一带「研究三角」；气候温和，科技公司与生医企业近年聚集，生活成本低于纽约湾区。",
    studentLife:
      "校园体育与兄弟会/姐妹会文化明显，也有大量学术社团；租房以校车沿线为主，国际生办公室支持完善。",
  },
  nyu: {
    campusStyle:
      "与城市融为一体，无传统围墙校园； Stern、Tisch、Courant 等学院各具标签，强调实习、作品集与行业连接。",
    locationAndSetting:
      "主枢纽在纽约曼哈顿格林威治村一带；地铁四通八达，文化资源极致，房租与生活成本极高。",
    studentLife:
      "住宿名额有限，多数学生合租；夜生活与文化活动丰富，适合喜欢都市节奏、自主性强的学生。",
  },
  ucl: {
    campusStyle:
      "伦敦「综合研究型大学」代表之一，学科门类全、国际化程度高；课程偏职业导向与科研并行的项目较多。",
    locationAndSetting:
      "主校区在伦敦布鲁姆斯伯里，步行可达大英博物馆等；地铁覆盖全城，天气阴雨天较多，生活成本高。",
    studentLife:
      "校内宿舍紧张，常需校外租房；国际生占比极高，社团与求职季活动密集，兼职政策需留意签证条款。",
  },
  imperial: {
    campusStyle:
      "理工医商强项，伦敦市中心南肯辛顿主校区紧凑；强调量化、实验与产业合作，学业节奏普遍偏快。",
    locationAndSetting:
      "位于伦敦西区，博物馆与公园环绕；交通便利，生活与娱乐丰富，租金与物价处于伦敦高位。",
    studentLife:
      "宿舍与校外公寓并存，需提前排队；同学背景多元，求职面向金融、科技与咨询的比例高。",
  },
  nus: {
    campusStyle:
      "亚洲顶尖综合研究型大学，英联邦学制与本地需求结合；工程、计算机、商科等就业导向强，双语环境常见。",
    locationAndSetting:
      "主校区在新加坡肯特岗，热带气候全年湿热；公交与地铁极便利，城市安全、绿化好，国土小、跨国旅行方便。",
    studentLife:
      "校内宿舍需申请，校外组屋或公寓选择多；饮食多元平价，国际生比例高，英语为主要教学语言。",
  },
  utoronto: {
    campusStyle:
      "加拿大规模最大的研究型大学之一，圣乔治校区位于市中心；学术要求严谨，科研资源与医院系统结合紧密。",
    locationAndSetting:
      "多伦多冬季寒冷漫长，夏季舒适；城市多元文化突出，地铁与街车覆盖主校区，实习机会多于其他加国城市。",
    studentLife:
      "租房市场紧张，市中心租金高；国际生政策相对友好，课余可兼顾滑雪、湖岸活动等北美生活方式。",
  },
  hku: {
    campusStyle:
      "亚洲「全球大学」定位，医学、法律、商科与理工并重；英文授课为主，与大湾区产业联动日益密切。",
    locationAndSetting:
      "主校园依山傍海，香港岛与九龙交通可达；亚热带气候，台风季需注意，城市密度高、公共交通极发达。",
    studentLife:
      "住宿床位紧张，许多研究生校外租房；餐饮选择极多，生活成本全球前列，国际生社群大、实习面向广。",
  },
  bu: {
    campusStyle:
      "大型私立研究型大学，校区沿查尔斯河延伸；专业选择广，本科通识与职业服务资源较丰富。",
    locationAndSetting:
      "波士顿市区与河畔结合，冬季寒冷；地铁绿线经过，去剑桥与市中心实习便利，生活成本偏高。",
    studentLife:
      "宿舍与校外公寓并存，冰球与体育赛事氛围浓；国际生组织活跃，兼职与 CPT 需按签证规定规划。",
  },
  usc: {
    campusStyle:
      "洛杉矶大型私立大学，影视、游戏、工程与商科产业联系紧；校园活动与校友网络在加州影响力强。",
    locationAndSetting:
      "主校区在南洛杉矶大学公园区，驾车文化明显；气候温暖少雨，去硅谷需飞或长途，本地娱乐与媒体业发达。",
    studentLife:
      "希腊生活与体育赛事存在感强，也有大量学术社团；租房区域分散，建议优先校车与治安较好的街区。",
  },
  manchester: {
    campusStyle:
      "红砖大学传统与现代科研并重，学科覆盖广；城市年轻人口多，音乐与足球文化浓厚，学业压力因专业而异。",
    locationAndSetting:
      "英格兰北部枢纽城市，铁路去伦敦约 2 小时；天气阴雨较多，生活成本低于伦敦，中餐与亚洲超市较全。",
    studentLife:
      "学生公寓与合租选择多，夜生活丰富；国际生比例高，兼职时薪需符合签证规定。",
  },
  edinburgh: {
    campusStyle:
      "苏格兰首府古老大学，信息学、医学与人文强；学制常较英格兰短一年（本科），城市历史感与艺术节闻名。",
    locationAndSetting:
      "气候偏冷多风，夏季短暂；老城与新城步行可达校区，生活成本低于伦敦，火车可北上高地。",
    studentLife:
      "宿舍分散在老城与校外，八月的艺术节全城热闹；国际生社群成熟，酒吧与社团是常见社交场景。",
  },
  ubc: {
    campusStyle:
      "温哥华主校区临海靠山，环境极佳；科研与可持续发展、计算机等方向强，整体氛围偏包容与多元。",
    locationAndSetting:
      "温带海洋性气候，冬季多雨少严寒；城市宜居度高，科技与中资企业有一定岗位，但生活成本为加拿大前列。",
    studentLife:
      "校内宿舍需早申，校外合租常见；户外运动（滑雪、徒步）普及，国际生比例高，华人社群大。",
  },
};

export function enrichSchool(school: School): School {
  const extra = SCHOOL_ENRICHMENT[school.id];
  const geo = SCHOOL_COORDINATES[school.id];
  let next: School = school;
  if (extra) next = { ...next, ...extra };
  if (geo) next = { ...next, lat: geo.lat, lng: geo.lng };
  return next;
}
