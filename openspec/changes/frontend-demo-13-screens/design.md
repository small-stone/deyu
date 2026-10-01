# Design

## Context

See `proposal.md` for motivation. Constraints shaping the approach:

- Visual/source of truth: `designs/index.html` (v3) and `designs/mockups/*.png`.
- Product rules reference: `docs/德育分数小程序-需求文档.md` (behavior for demo interactions; no cloud).
- Codebase today: WeChat cloud QuickStart under `miniprogram/` (`pages/index`, `example`, `user`); replace with product pages.
- Demo constraints from exploration: no login, no backend, hardcoded/mock data aligned to design copy (班级 352、陈一诺 86、王小明 -5 等).

## Goals / Non-Goals

**Goals:**

- One shared design token layer + reusable UI pieces so 13 screens stay visually consistent.
- Single mock data module that all portals read (and lightly mutate in memory).
- Role context held in `globalData` / storage for session; S01 as switcher.
- Custom tab bars or page-group navigation that matches per-role bottom bars in the design (native `tabBar` cannot easily express three different role bars).

**Non-Goals:**

- Cloud DB, cloud functions, real openid login, invitation codes.
- Excel/CSV real file parsing (upload zone is UI + demo seed action).
- True multi-device persistence; refresh may reset to seed unless optional `wx.setStorage` is added later.
- Pixel-perfect parity with web fonts (Fraunces etc.); approximate with available mini program fonts / system stacks while keeping color, spacing, and component structure.

## Decisions

### 1. Page map mirrors S01–S10b

| Screen | Suggested path |
|--------|----------------|
| S01 | `pages/welcome/index` |
| S02 | `pages/parent/home/index` |
| S03 | `pages/parent/bind/index` |
| S04 | `pages/parent/timeline/index` |
| S05a | `pages/teacher/setup-class/index` |
| S05b | `pages/teacher/setup-roster/index` |
| S05 | `pages/teacher/home/index` |
| S06 | `pages/teacher/roster/index` |
| S07 | `pages/teacher/score/index` |
| S08 | `pages/teacher/board/index` |
| S09 | `pages/admin/overview/index` |
| S10 / S10b | `pages/admin/rank/index` (dimension toggle) |
| Placeholder | `pages/*/profile` or shared `pages/common/profile/index` |

**Alternative considered:** Keep QuickStart pages and bolt UI on — rejected; naming and structure would fight the product IA.

### 2. Mock data module + in-memory store

- `miniprogram/data/mock.js` (or `services/demo-store.js`): seed classes, students, logs, admin aggregates copied from design.
- Teacher empty-state demos: expose a debug/demo flag or secondary entry from profile (“重置为空班级”) so both S05a/S05b and ready S05 are demonstrable without rebuilding.
- Score adjust / bind mutate the in-memory store; pages `setData` from store getters.

**Alternative considered:** Pure static pages with no shared store — rejected; timeline/home would drift and score adjust could not demo consistency.

### 3. Custom role chrome instead of single native tabBar

- Prefer custom `tabbar` component per role matching design icons/labels.
- `app.json` registers all pages; first page = welcome.
- Avoid three native tabBar configs (not supported).

**Alternative considered:** Only `wx.navigateTo` stacks without tabs — rejected; design and PRD rely on bottom bars.

### 4. Styling approach

- Global CSS variables in `app.wxss` mapped from design tokens (`--brand: #0E8F7A`, coral/gold/sky, radii, shadows).
- Shared components: `score-ring`, `timeline-list`, `student-row`, `stat-grid`, `rank-list`, `role-tabbar`, `phone` atmospherics simplified for mini program (soft gradient background).
- Icons: inline SVG via `image` data URI or simplified icon font / CSS; match line-icon feel from design.

### 5. Remove / quarantine QuickStart

- Remove or stop registering `pages/example` and cloud demo UI from primary flow.
- Keep `wx.cloud.init` inert or behind no-op; demo pages MUST NOT call cloud APIs.

## Risks / Trade-offs

- [Risk] Custom tabBar state sync across pages → Mitigation: store `currentRole` + `activeTab` in globalData; each page sets tab on show.
- [Risk] Demonstrating both empty and ready teacher states → Mitigation: seed default = ready 352; profile action to reset empty / reseed.
- [Risk] Visual drift from HTML design → Mitigation: implement against mockup PNGs screen-by-screen; shared tokens first.
- [Trade-off] Local-only mutations reset on cold start → Acceptable for demo; document in profile placeholder.

## Migration Plan

1. Land tokens, mock store, welcome + one portal vertical slice; then complete remaining screens.
2. When backend work starts: replace store getters with API calls; keep page contracts (specs) stable.
3. Rollback: unused pages can be removed from `app.json`; no server migration.

## Open Questions

- Whether to persist mock mutations in `wx.setStorage` between sessions (default: no, seed each cold start).
- Exact empty-state entry UX label on profile (wording only; does not change specs).
