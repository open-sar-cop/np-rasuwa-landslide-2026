# Job writes snapshot.json only

Path: repo root `snapshot.json`.
Frontend polls every 60 seconds.
Every public string is `{zh,en,ne,hi}`.
Replace `roads`, `forces`, `sites`, `hydro`, `kpi`.
Merge `published`/`items` and `xPosts` by id.
News with a usable location must include `lat`, `lng`, `geo` (`exact|place|corridor|unknown`).
Do not edit HTML.
