---
tags:
  - AI
  - 插件
description: Oh My OpenCode 安装和配置速查
---

# Oh My OpenCode 速查

OpenCode 的智能体编排层，用于多智能体、MCP、钩子和工作流自动化。

## 前置

```bash
node -v
opencode --version
```

需要 Node.js 18+ 和 OpenCode CLI。

## 安装

```bash
npm install -g oh-my-opencode
opencode plugins install oh-my-opencode
```

## 初始化

```bash
opencode init
opencode init --project
```

## 配置关注点

- 智能体和角色
- MCP 工具
- 工作流钩子
- 项目规则
- 忽略目录

## 典型场景

- 项目初始化
- 功能开发
- 代码审阅
- 多文件任务编排

## 排查

- 初始化失败：检查 CLI 版本和权限
- 智能体不生效：确认配置已加载并启用
