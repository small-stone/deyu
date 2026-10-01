# Tasks

## 1. Foundation

- [x] 1.1 Add design tokens and base styles in `app.wxss` / shared vars matching `designs/index.html` v3; verify brand color `#0E8F7A` and shared utilities load on a blank page
- [x] 1.2 Create `miniprogram/data/demo-store.js` (or equivalent) with seeded mock classes/students/logs matching design copy; verify getters return 陈一诺=86、王小明=-5、班级 352
- [x] 1.3 Add role context helpers (`currentRole`, reseed / empty-teacher modes) on `App` globalData; verify welcome can set role and profile can reset teacher empty state
- [x] 1.4 Register new page routes in `app.json`, set entry to welcome, remove QuickStart pages from primary flow; verify cold start opens S01
- [x] 1.5 Build shared components: `role-tabbar`, `score-ring`, `timeline-list`, `student-row`, `stat-grid` (minimal stubs ok); verify each renders in a scratch page or first consumer

## 2. Role entry

- [x] 2.1 Implement `pages/welcome/index` (S01) with three role cards; verify taps navigate to parent home / teacher ready home / admin overview
- [x] 2.2 Implement shared profile placeholder with “切换角色” back to welcome; verify role context clears for navigation

## 3. Parent portal

- [x] 3.1 Implement parent home (S02): child chips, score ring, stats, recent records, parent tabbar; verify default child shows mock 86 and recent items
- [x] 3.2 Implement child switch updating panel/records from store; verify 陈一然 chip changes displayed data
- [x] 3.3 Implement bind child page (S03) with form + demo submit updating local store; verify non-empty submit shows success and new chip appears
- [x] 3.4 Implement timeline detail (S04); verify “查看全部” shows full reverse-chronological mock logs with operator names

## 4. Teacher portal

- [x] 4.1 Implement create-class empty state (S05a); verify empty-teacher mode lands here and submit class code advances to S05b
- [x] 4.2 Implement upload-roster empty state (S05b) with import/manual/skip demo actions; verify skip enters home with score-adjust blocked; import/manual seeds students and opens ready home
- [x] 4.3 Implement teacher ready home (S05) with stats, attention list, shortcuts, teacher tabbar; verify seeded stats match design (avg/high/low)
- [x] 4.4 Implement roster page (S06) with upload zone UI, search filter, list scores; verify search filters by name/studentNo on mock list
- [x] 4.5 Implement score adjust page (S07): add/deduct, amount (up to 1 decimal place), reason tags, require reason ≥4 chars; verify successful submit updates store score+log and reject without reason
- [x] 4.6 Implement class board (S08): extrema, distribution with counts including &lt;0, medal rank list; verify board reflects current mock class students

## 5. Admin portal

- [x] 5.1 Implement school overview (S09): metric cards, low-score attention, class list with high/low; verify navigation into class detail from a row
- [x] 5.2 Implement admin rank page with class-average dimension (S10); verify list/distribution render from school mock aggregates
- [x] 5.3 Add individual dimension toggle (S10b) including 高分榜 / 低分关注; verify switch updates list ordering and labels (姓名 · 班级)
- [x] 5.4 Wire admin tabbar (总览 / 排名 / 班级 / 设置); verify tab switches without leaving admin role

## 6. Integration check

- [x] 6.1 Walk full demo path: S01 → each role’s happy path screens → profile → switch role; verify all 13 screens are reachable (empty teacher via reset action)
- [x] 6.2 Spot-check UI against `designs/mockups/` for S02 score ring, S07 form, S08/S10 boards; verify no cloud API calls on these paths
