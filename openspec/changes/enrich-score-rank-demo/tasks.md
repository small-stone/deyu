# Tasks

## 1. 个人分颜色与条宽

- [x] 1.1 新增 `miniprogram/utils/score-bar.js`，提供 `isLowScore`（分数 &lt; 40）和 `personalBarWidth`（≤ 0 为 8，否则 `min(100, max(8, round(score)))`）。用 `node -e` 引用该模块，确认 -8 与 -5 的宽度都是 8、12 的宽度是 12、96 的宽度是 96、39 为低分、40 不是低分。
- [x] 1.2 在 `miniprogram/app.wxss` 为排行条 `.bar .fill.low` 和分数字 `.lo` 使用 `--coral`，并把同样两条规则写入 `miniprogram/styles/ui.wxss`。确认两个文件都含 `.fill.low` 且颜色为 `var(--coral)`。

## 2. 非 352 班演示数据

- [x] 2.1 在 `miniprogram/data/demo-store.js` 为 351、443、551、244 各补约 8 名学生，覆盖 80 分以上和 40 分以下；最高/最低姓名与现有卡片一致（周启/吴桐、钱进/刘可、何佳/孙悦、郑好/冯帆）。这四个班的五段分布和 `studentCount` 由该班学生生成。352 的学生分数和 `distribution` 保持原值。用 `node -e` 确认：四个班各有至少 6 名学生、分布五段且不是空数组、最高/最低姓名属于该班；352 仍有林晓 96、王小明 -5，且 `&lt;0` 段人数仍为 1。
- [x] 2.2 由全部学生推导 `personHigh`（降序前 8）、`personLow`（升序前 8）和总览 `lowAttention`，每行带 `studentId` 与 `classId`。给会出现在低分榜上的学生追加加减分记录，不改 352 的分数。用 `node -e` 确认：低分榜多于 3 人且至少来自两个班，每一行都能 `getStudent`，低分榜学生至少有一条日志，林晓分数仍是 96。

## 3. 学生详情页

- [x] 3.1 新增 `pages/common/student-detail/index`，并在 `miniprogram/app.json` 的 `pages` 中注册。确认四个页面文件存在，且 `app.json` 含该路径。
- [x] 3.2 详情页按查询参数 `id` 读取学生，展示姓名、班级、学号、当前分和 `timeline-list`。当前分用 `isLowScore` 套橙色或绿色。找不到学生时展示空态，不抛错。在开发者工具打开刘可的详情，确认看到班级 443、橙色的 -8，以及至少一条加减分记录。

## 4. 排行行着色、条宽与跳转

- [x] 4.1 `components/tabs/teacher-board` 与 `pages/teacher/board` 的个人榜改用 `personalBarWidth` 和 `isLowScore`，去掉按当前列表 `abs(score) / maxAbs` 缩放。排行行点击进入学生详情，不进入加减分。`pages/teacher/board` 读取 `classId` 调用 `getClassBoard(classId)`，且不写入 `currentClassId`。确认这两个 JS 文件不再出现 `Math.abs`；在本班看板低分关注中，12 分是短橙条，-5 的条不比 12 分更长，点击王小明进入其详情。
- [x] 4.2 `components/tabs/admin-rank` 与 `pages/admin/rank` 的个人榜使用同一条宽和颜色；班级均分条仍按榜首均分比例，均分 &lt; 40 时用橙色。个人行进入学生详情，班级行进入 `/pages/teacher/board/index?preview=1&classId=`。确认个人榜代码不再使用 `Math.abs`；低分关注里 -8、-5、12 均为橙色，12 分不是满条，-8 不长于 -5；点击班级打开的是该班看板。
- [x] 4.3 `components/tabs/admin-overview`、`components/tabs/admin-classes` 以及对应的 `pages/admin/overview`、`pages/admin/classes` 打开班级时只带 `classId` 查询参数，不再赋值 `currentClassId`。先记下班主任当前班为 352，再从总览或排名打开 443，返回班主任本班后标题仍是 352。

## 5. 串联检查

- [x] 5.1 在开发者工具走通：352 本班看板高分榜与低分关注、全校个人低分关注、点击一名学生进详情、点击一个非 352 班进该班看板且分布不为空。确认班主任当前班仍是 352，且 352 最高分仍显示林晓 96。
