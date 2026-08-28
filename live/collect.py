#!/usr/bin/env python3
"""定时采集骨架。在有网络的机器上：
    python3 collect.py
会尝试拉公开页，失败则保留 data.js 种子。
ReliefWeb 现需申请 appname，默认跳过。
X 没有开放搜索 API 密钥时，用手工快照合并。
"""
from __future__ import annotations
import json, ssl, urllib.request
from datetime import datetime, timezone
from pathlib import Path

DIR = Path(__file__).resolve().parent
UA = "gyirong-live-proto/0.1 (research; contact local operator)"
CTX = ssl.create_default_context()

SOURCES = {
    "xinhua": "https://www.news.cn/local/20260827/c80eca2cd35a443489c76d00193e11e3/c.html",
    "govcn": "https://www.gov.cn/lianbo/202608/content_7079342.htm",
    "ndrrma": "https://ndrrma.gov.np/en",
    "reliefweb": "https://reliefweb.int/report/nepal/npl-flood-08-2026-rasuwa-flood-2026-08-26",
    "embassy": "https://np.usembassy.gov/rasuwa-flooding-and-major-road-closures/",
}

X_TAGS = [
    "#吉隆口岸", "#吉隆泥石流", "#GyirongPort", "#Rasuwa",
    "#NepalFloods", "#BhoteKoshi", "#Trishuli", "#Xizang",
]


def fetch(url: str, timeout: int = 20) -> tuple[int, str]:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except Exception as e:
        return 0, str(e)


def main() -> None:
    ping = []
    for name, url in SOURCES.items():
        code, body = fetch(url)
        ping.append({
            "name": name,
            "url": url,
            "http": code,
            "ok": 200 <= code < 400,
            "bytes": len(body) if code else 0,
            "hint": body[:160].replace("\n", " "),
        })
        print(f"{name:10} {code} {url}")

    out = {
        "snap": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "collector": "collect.py",
        "source_ping": ping,
        "x_tags": X_TAGS,
        "note": "数字以发布会/NDRRMA为准。本脚本只探活，不改官方数字。",
    }
    (DIR / "collect-status.json").write_text(
        json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print("wrote", DIR / "collect-status.json")


if __name__ == "__main__":
    main()
