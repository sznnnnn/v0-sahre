/**
 * 演示用完整示例问卷（虚构人物与经历，与真实个人无关）。
 */
import type { QuestionnaireData } from "./types";

export const SAMPLE_QUESTIONNAIRE_DEMO_NOTE =
  "示例 B：林予安 · 南科大电子本科 · EE/嵌入式 · 仅用于本地演示";

export function getSampleQuestionnaireDemoPayload(): Pick<
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
      fullName: "林予安（Yu'an Lin）",
      targetCountry: ["us", "ca"],
      intendedMajor: "电子工程 / Electrical Engineering（嵌入式与机器人感知方向）",
      intendedApplicationField: "嵌入式系统、机器人、边缘计算、低功耗传感",
      budgetEstimate: "约 55 万人民币/两年（含生活费，随汇率浮动）",
      plannedStudyDuration: "2 年",
      targetSemester: "2027 Spring",
      futurePlan:
        "先在工业界或研究院从事机器人感知与嵌入式平台研发，再视机会考虑读博或技术管理路线；希望参与开放生态与标准相关的工作。",
      fundingIntent: "scholarship",
      teachingLanguagePref: "english",
      researchInterestNote:
        "足端力/触觉融合与模型预测控制；RTOS 上的多传感器时间同步；边缘侧轻量神经网络部署与功耗权衡。",
      motivationNote:
        "本科阶段在电赛与实验室里把电路和代码打通，但缺乏系统性的北美 EE 训练与长期课题；希望在硕士阶段补齐控制、信号与专用架构，并进入更好的研究型实验室。",
      otherApplicationNotes:
        "若项目提供硬件实验平台与 industry capstone，优先考虑；希望尽量覆盖机器人感知与嵌入式系统交叉课程。",
      knownTargetSchools: "UC San Diego, University of Toronto, Georgia Tech",
    },
    tests: {
      toefl: { total: "105", reading: "28", listening: "27", speaking: "23", writing: "27" },
      gre: { verbal: "156", quantitative: "170", analyticalWriting: "4.0" },
    },
    education: [
      {
        school: "南方科技大学（Southern University of Science and Technology, SUSTech）",
        degree: "本科",
        major: "电子与信息工程（BEng in Electronic and Information Engineering）",
        gpa: "3.72/4.0（专业前 12%）",
        startDate: "2021-09",
        endDate: "2025-06",
        achievements:
          "国家奖学金提名；全国大学生电子设计竞赛省一等奖；美国大学生数学建模竞赛 M 奖；连续两年校级综合奖学金一等奖。",
      },
    ],
    workExperience: [
      {
        id: "demo-dji",
        company: "深圳市大疆创新科技有限公司（DJI）",
        position: "嵌入式软件实习生（飞行平台部）",
        startDate: "2024-06",
        endDate: "2024-12",
        isCurrent: false,
        situation: "量产前固件分支需压缩中断延迟并完善异常日志，便于产线复现。",
        task: "在导师指导下参与传感器驱动与日志链路排查，补充单元测试与文档。",
        action:
          "阅读 HAL 与 DMA 配置，定位两处竞态；与硬件同事联调 I2C 总线时序；用 Python 脚本批量解析飞参文本生成对比报表。",
        result: "合并请求被采纳 4 次，相关模块在试点批次未再出现同类死锁；实习答辩评级 A-。",
      },
      {
        id: "demo-lab-ra",
        company: "南方科技大学 · 智能机器人实验室（校内科研助理）",
        position: "本科生研究助理",
        startDate: "2023-03",
        endDate: "",
        isCurrent: true,
        situation: "四足平台需在崎岖地面估计接触力，现有滤波延迟影响控制回路。",
        task: "实现并对比卡尔曼与互补滤波在足端六维力数据上的效果，输出可复现实验脚本。",
        action:
          "在 ROS2 下采集 bag，用 C++ 写实时节点；与学长一起调 MPC 参数并记录跌倒边界案例。",
        result: "组会报告 3 次；共同撰写技术报告 1 份（内部）；为毕设奠定数据与代码基础。",
      },
    ],
    projects: [
      {
        id: "demo-quadruped",
        name: "四足机器人足端力估计与防滑策略验证",
        role: "组长 / 嵌入式与算法",
        startDate: "2024-09",
        endDate: "2025-04",
        situation: "仿真与实物在湿滑地砖上表现差异大，需可量化对比指标。",
        task: "搭建小型测试场地与对比实验流程，固化传感器标定与数据采集规范。",
        action:
          "采用廉价六维力传感器 + STM32H7 采集；设计防滑触发阈值与步态切换状态机；用 MATLAB 离线回放与统计。",
        result: "实物测试摔倒率较基线下降约三成（组内统计）；代码与文档移交实验室低年级继续使用。",
      },
      {
        id: "demo-gateway",
        name: "智能家居边缘网关（FreeRTOS + MQTT）",
        role: "独立开发",
        startDate: "2023-11",
        endDate: "2024-05",
        situation: "多品牌传感器协议不一，云端直连延迟与隐私成本高。",
        task: "在单块开发板上汇聚 Zigbee 子设备与以太网上云，保证掉网时本地仍可执行规则。",
        action:
          "移植 lwIP；实现规则引擎子集；用 TLS 连接家庭 MQTT Broker；编写 OTA 差分包升级原型。",
        result: "课程设计满分；开源至个人 GitHub（脱敏）获约 180 star。",
      },
      {
        id: "demo-edcomp",
        name: "全国大学生电子设计竞赛 · 控制类题",
        role: "队员（负责电源与测控）",
        startDate: "2023-07",
        endDate: "2023-08",
        situation: "四天三夜封闭赛制，需稳定供电与高精度测距闭环。",
        task: "Buck-Boost 级联与电流采样校准；激光测距模块与 MCU 中断协同。",
        action: "绘制四层板并手焊验证；编写 PID 与限幅保护；撰写测试记录与答辩材料。",
        result: "广东省一等奖；全国测评阶段未晋级但获校队表彰。",
      },
    ],
    honors: [
      {
        id: "demo-edc",
        name: "全国大学生电子设计竞赛（广东赛区）一等奖",
        issuer: "广东省赛组委会",
        date: "2023-08",
        description: "控制类题目，队内负责电源与测控",
      },
      {
        id: "demo-mcm",
        name: "美国大学生数学建模竞赛 M 奖（Meritorious）",
        issuer: "COMAP",
        date: "2024-02",
        description: "选题与交通流仿真相关",
      },
      {
        id: "demo-scholar",
        name: "校级综合奖学金一等奖（连续两年）",
        issuer: "南方科技大学",
        date: "2023-09",
        description: "2022–2023、2023–2024 学年",
      },
      {
        id: "demo-nom",
        name: "国家奖学金提名（院系推荐）",
        issuer: "南方科技大学电子系",
        date: "2024-10",
        description: "最终未获评，进入院系答辩名单",
      },
    ],
    skills: [
      { id: "demo-sk1", name: "C / C++（嵌入式、STM32）", level: "advanced", category: "technical" },
      { id: "demo-sk2", name: "Python（数据分析、脚本工具）", level: "advanced", category: "technical" },
      { id: "demo-sk3", name: "MATLAB / Simulink（控制与仿真）", level: "intermediate", category: "technical" },
      { id: "demo-sk4", name: "ROS2 基础、Git、Linux 命令行", level: "intermediate", category: "technical" },
      { id: "demo-sk5", name: "Altium Designer / 四层板焊接调试", level: "intermediate", category: "technical" },
      { id: "demo-sk6", name: "Rust（入门，写过小型 CLI）", level: "beginner", category: "technical" },
      { id: "demo-sk7", name: "英语（TOEFL 105，技术文档与组会）", level: "advanced", category: "language" },
      { id: "demo-sk8", name: "跨角色沟通与文档化习惯", level: "advanced", category: "soft" },
    ],
  };
}
