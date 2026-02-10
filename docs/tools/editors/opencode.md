---
tags:
  - AI
  - 编辑器
description: OpenCode AI编辑器安装与配置指南，支持Windows、macOS、Linux多平台，包含快捷键、插件推荐及个性化配置
---

# OpenCode 安装配置

## 简介

OpenCode 是一款 AI 驱动的代码编辑器，类似于 Cursor，提供智能代码补全、代码生成和对话式编程体验。

## 安装方法

### Windows

```powershell
# 使用 winget 安装
winget install opencode

# 或者下载安装包
# 访问 https://opencode.ai 下载最新版本
```

### macOS

```bash
# 使用 Homebrew 安装
brew install --cask opencode

# 或者使用 npm
npm install -g @opencode/cli
```

### Linux

```bash
# 下载 AppImage 或 deb/rpm 包
# 访问 https://opencode.ai/download 获取对应版本

# 使用 snap
sudo snap install opencode
```

## 初始配置

### 登录/注册

```bash
opencode login
```

也可以在应用内完成登录与账号绑定。

### 基本设置

- 选择默认模型与对话模式
- 设置代码补全与自动建议的触发方式
- 配置项目级规则与忽略目录
- 开启或关闭网络搜索与工具调用

## 常用功能

### 智能补全

在编辑器中输入关键字即可触发补全，适合模板代码、重复性结构与接口定义。

### 代码生成

通过自然语言描述需求，生成组件、函数或配置文件。

### 代码解释与重构

支持解释复杂逻辑、生成注释说明与给出重构建议。

### 多文件修改

可一次生成涉及多个文件的改动，适合功能开发与批量调整。

## 插件与扩展

- 在插件市场中搜索并安装所需插件
- 常用扩展包括格式化、Lint、主题与语言增强
- 插件安装后建议在项目内启用并保存配置

## 使用建议

- 使用明确的需求描述提高生成准确度
- 为项目补充 README 与约定提升上下文理解
- 在大型项目中先做小范围验证再全量应用

## 常见问题

### 无法登录

检查网络连通性与代理设置，必要时重启应用重试。

### 补全不生效

确认语言服务已启用，检查是否被全局设置禁用。
