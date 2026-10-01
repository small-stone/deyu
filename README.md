# 德育通

微信小程序：学生德育分数管理（云开发）。

## 文档与设计

| 内容 | 路径 |
|------|------|
| 产品需求文档（PRD） | [docs/德育分数小程序-需求文档.md](docs/德育分数小程序-需求文档.md) |
| 高保真设计稿（**唯一设计源**） | [designs/index.html](designs/index.html) |
| 静态设计图（由 HTML 截图导出） | [designs/mockups/](designs/mockups/) |

> `mockups/` 与 HTML 应对齐。改完 `designs/index.html` 后运行：`node designs/capture-mockups.js` 重新导出截图。

### 角色一览

- **管理员**：全校数据与排名看板
- **班主任**：上传花名册、加减分（必填事由）、本班看板
- **家长**：姓名+身份证绑定孩子（可多孩），查看分数与变动时间线

学生初始德育分 **60**。

## 云开发 quickstart

本仓库基于云开发快速启动模板，演示数据库、文件存储、云函数三大能力。

参考：[云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
