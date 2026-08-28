<div align="center">

# 2026 尼泊尔热索瓦特大泥石流

**np-rasuwa-landslide-2026**

Open SAR-COP 种子事件 · [← 返回索引](https://github.com/open-sar-cop/incidents)

[**🖥️ 打开 COP 态势图**](https://open-sar-cop.github.io/np-rasuwa-landslide-2026/)
·
[**📡 多语言动态站**](https://open-sar-cop.github.io/np-rasuwa-landslide-2026/live/)

</div>

---

## 事件概述

2026 年 8 月 26 日，尼泊尔北部热索瓦（Rasuwa）地区突发特大泥石流，沿特里苏里河（Trishuli）沿岸造成重大伤亡，波及中尼吉隆—拉苏瓦堡口岸一侧，数百外籍游客失联。中尼两侧正在协同搜救。

| | |
|---|---|
| 类型 | 泥石流（landslide） |
| 发生时间 | 2026-08-26 |
| 区域 | 尼泊尔 Bagmati 省 Rasuwa 县 / 西藏日喀则吉隆口岸 |
| 状态 | 🚨 进行中（active） |
| 中方口径（27日 08:00） | 遇难 3 / 失联 558 / 现场救出 2 |
| 尼方口径（警方 28日 07:00） | 遇难 469；NDRRMA 失联 977 |

数字仍在变化，以发布会和 NDRRMA 为准。

## 本仓库内容

| 文件 | 说明 |
|---|---|
| [index.html](index.html) | 可交互 COP 态势图（GitHub Pages 根路径） |
| [incident.json](incident.json) | 结构化事件数据 |
| [sources.md](sources.md) | 信息源清单 |
| [live/](live/) | 多语言灾情动态站（中/英/尼泊尔语/印地语），用户上报 + 审核队列 |
| [viz/](viz/) | 地形示意、等高线地图、指挥盘原型 |

## 动态站

静态页。启动时会尝试读取 `live/snapshot.json`。定时任务应只写 JSON，不要改 HTML。

```bash
# 探活官方源
python3 live/collect.py
```

语言包在 `live/i18n.js`。

## 更新事件数据

收到新的官方通报后：更新 `incident.json`，然后用
[skill-disaster-cop](https://github.com/open-sar-cop/skill-disaster-cop) 的构建器重新生成根目录 `index.html`。

## 免责声明

本态势图整理自公开信息，坐标多为近似定位，伤亡数字随事态发展变化。仅供态势参考，**不作为救援决策的唯一依据**。站点非官方。不要上传遇难者可辨认照片，不要暴露正在作业的救援队精确坐标。

## License

MIT © Open SAR-COP Contributors
