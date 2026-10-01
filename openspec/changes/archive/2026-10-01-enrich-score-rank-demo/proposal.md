# Proposal

## Why

演示数据里只有 352 班的看板是满的：351、443、551、244 的分布为空、花名册几乎没有人，全校个人榜也只有三四行。个人分进度条一律用品牌绿，并且按「当前列表分数绝对值的最大值」缩放，所以低分关注里 12 分被画满、-8 比 -5 更长，和上方分布图（40 分以下为橙色）对不上。排行行目前也不能点进对应的人或班。

## What Changes

- 为 352 以外的每个演示班级补一套可演示的花名册、分数分布、最高/最低分学生，并据此加长全校个人高分榜、低分关注和总览低分关注。352 班现有种子（林晓 96、王小明 -5、既有分布段）保持不变。
- 个人分数进度条与旁边的分数数字统一着色：分数 &lt; 40 用分布图同款橙色，分数 ≥ 40 用品牌绿。班级均分条在均分 &lt; 40 时同样用橙色。
- 个人分数条改为固定 0–100 刻度：100 分对应满条，同一分数在高分榜和低分关注里长度相同；分数 ≤ 0 只用最短可见条。不再用当前列表的 `abs(score) / maxAbs`。
- 任意排行行可点击：个人行进入该学生的只读详情（姓名、班级、当前分、加减分时间线）；班级行进入该班看板。管理员预览班级时不得改写班主任当前班。

## Capabilities

### New Capabilities

- （无）

### Modified Capabilities

- `teacher-portal`: 本班看板的个人分颜色与条长规则，排行行进入学生详情；打开非 352 班时也有完整演示花名册与分布。
- `admin-portal`: 全校个人榜与班级榜使用更完整的演示数据；个人分颜色与条长与班主任看板一致；个人行进入学生详情，班级行进入该班看板。

## Impact

- 演示数据：`miniprogram/data/demo-store.js`。
- 在用界面：`miniprogram/components/tabs/teacher-board/`、`miniprogram/components/tabs/admin-rank/`，以及已注册的班级预览页 `miniprogram/pages/teacher/board/`。
- 新增只读学生详情页，并在 `miniprogram/app.json` 注册；复用现有时间线组件。
- 未注册的重复页（`pages/admin/rank`、`pages/admin/overview`、`pages/teacher/home`、`pages/teacher/roster`）若仍保留拷贝，需同步条长、颜色与跳转，避免两套逻辑分叉。
- 不改家长端分数环、花名册点进加减分、云开发与真实接口。
