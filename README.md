<div align="center">

# 2026 尼泊尔热索瓦特大泥石流

**np-rasuwa-landslide-2026**

Open SAR-COP 种子事件 · [← 返回索引](https://github.com/open-sar-cop/incidents)

[**🖥️ 打开 COP 态势图**](https://open-sar-cop.github.io/np-rasuwa-landslide-2026/)

</div>

---

## 事件概述

2026 年 8 月 26 日，尼泊尔北部热索瓦（Rasuwa）地区突发特大泥石流，沿特里苏里河（Trishuli）沿岸造成重大伤亡，波及中尼吉隆—拉苏瓦堡口岸一侧，数百外籍游客失联，35 座桥梁、45 座吊桥、约 40 公里道路受损。中尼两侧正在协同搜救。

| | |
|---|---|
| 类型 | 泥石流（landslide） |
| 发生时间 | 2026-08-26 |
| 区域 | 尼泊尔 Bagmati 省 Rasuwa 县 / 特里苏里河沿岸 |
| 状态 | 🚨 进行中（active） |
| 遇难 / 失联 | 289 / 910（截至 2026-08-27 晚，警方口径，数字仍在变化） |

## 本仓库内容

| 文件 | 说明 |
|---|---|
| [index.html](index.html) | 可交互 COP 态势图（单文件，可直接打开，同时由 GitHub Pages 托管） |
| [incident.json](incident.json) | 结构化事件数据（遵循 [数据契约](https://github.com/open-sar-cop/skill-disaster-cop/blob/main/assets/incident.schema.json)） |
| [sources.md](sources.md) | 信息源清单 |

## 更新事件数据

收到新的官方通报后：更新 `incident.json`（KPI / `casualty_series` / `updates` / `last_updated`），然后用
[skill-disaster-cop](https://github.com/open-sar-cop/skill-disaster-cop) 的构建器重新生成 `index.html`：

```bash
git clone https://github.com/open-sar-cop/skill-disaster-cop.git
python3 skill-disaster-cop/assets/build_cop.py incident.json \
  -t skill-disaster-cop/assets/template.html -o index.html
```

## 免责声明

本态势图整理自公开信息，坐标多为近似定位，伤亡数字随事态发展变化。仅供态势参考，**不作为救援决策的唯一依据**。

## License

MIT © Open SAR-COP Contributors
