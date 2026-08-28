# COP Kit — 灾害通用态势平台工具箱

> **Open SAR-COP** 的核心组件：用一份符合规范的 `incident.json`，一键生成可交互的灾害通用态势图（Common Operating Picture / Dashboard），供搜救协调、灾情汇报与公众态势了解使用。

[![schema](https://img.shields.io/badge/schema-incident.schema.json-red)](schema/incident.schema.json)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 它解决什么问题

灾害发生后 72 小时内，信息散落在新闻报道、官方通报与社交媒体中，救援协调方急需一张**统一的态势图**。COP Kit 把这件事标准化：

1. **数据契约**：`schema/incident.schema.json` 定义了灾害事件的标准数据模型（元数据 / KPI / 点位 / 响应力量 / 时间线 / 来源）
2. **渲染模板**：`template/index.html` 是零依赖构建的单文件仪表盘（Leaflet 地图 + KPI 卡片 + 伤亡趋势 + 时间线 + 图层切换）
3. **构建器**：`tools/build_cop.py` 校验数据、注入模板、产出可直接打开/部署的 `dist/<slug>/index.html`
4. **AI 技能**：配合 [skill-disaster-cop](https://github.com/Euraxluo/skill-disaster-cop)，AI 助手可以在新灾害发生时自动检索公开信息、组装数据并生成 COP

## 快速开始

```bash
# 1. 准备事件数据（参考 data/ 下的样例）
# 2. 生成 COP
python3 tools/build_cop.py data/np-rasuwa-landslide-2026/incident.json

# 3. 打开 dist/np-rasuwa-landslide-2026/index.html
```

输出为**单文件 HTML**：无需服务器、无构建链路，双击即开，可原样托管到任意静态空间。

## 目录结构

```
cop-kit/
├── schema/
│   └── incident.schema.json     # 灾害事件数据契约（AI 组装数据的依据）
├── template/
│   └── index.html               # COP 仪表盘模板（占位符注入式）
├── tools/
│   └── build_cop.py             # 校验 + 渲染器
├── data/
│   └── np-rasuwa-landslide-2026/   # 种子案例：2026 尼泊尔热索瓦特大泥石流
│       ├── incident.json
│       └── sources.md           # 数据来源与时效说明
└── dist/                        # 生成产物（.gitignore 可选保留）
```

## 为新灾害创建 COP 的标准流程

1. **信息收集**：从官方通报与权威媒体检索事件元数据、伤亡数字（标注时间戳与口径）、基础设施损毁、响应力量、关键点位
2. **数据组装**：按 schema 填写 `incident.json`（slug 命名规范：`<国家二字码>-<地区>-<灾害类型>-<年份>`）
3. **坐标处理**：允许近似定位，但必须在点位描述中注明"坐标为近似定位"
4. **生成校验**：运行 build_cop.py，构建器会强制校验必填字段与 sources 非空
5. **发布与更新**：数字随事态演进更新 `casualty_series` 与 `updates`，重新生成即可

## 数据原则（硬性）

- 每份 incident.json **必须**携带 `sources`（构建器强制校验）
- 伤亡数字**必须**注明"截至时间"与口径来源
- 不采集、不存储任何个人身份信息（PII）
- 境外事件使用 OpenStreetMap 底图；涉及中国境内的地图展示须使用合规底图与标准地图服务，不得自行绘制国界
- 生成物仅供态势参考，页脚带免责声明

## 种子案例：2026 尼泊尔热索瓦特大泥石流

2026-08-26，尼泊尔北部热索瓦（Rasuwa）地区突发特大泥石流，沿特里苏里河沿岸造成重大伤亡（截至 8/27 晚：289 人遇难、910 人失联），波及中尼吉隆—拉苏瓦堡口岸一侧。本项目以该事件为第一个完整案例，验证数据契约与生成流程。数据细节见 [data/np-rasuwa-landslide-2026/sources.md](data/np-rasuwa-landslide-2026/sources.md)。

## 相关仓库

| 仓库 | 说明 |
|---|---|
| [open-sar-cop](https://github.com/Euraxluo/open-sar-cop) | 组织介绍与项目总览 |
| [cop-kit](https://github.com/Euraxluo/cop-kit) | 本仓库：schema + 模板 + 构建器 |
| [incidents](https://github.com/Euraxluo/incidents) | 灾害事件数据登记处（每次事件一个目录） |
| [skill-disaster-cop](https://github.com/Euraxluo/skill-disaster-cop) | AI 技能包：新灾害自动生成 COP |

## License

MIT
