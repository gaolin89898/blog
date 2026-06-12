---
tags:
  - AI
  - 编辑器
description: OpenCode 安装和配置速查
---

# OpenCode 速查

## 安装

```powershell
# Windows
winget install opencode
```

```bash
# macOS
brew install --cask opencode

# CLI
npm install -g @opencode/cli

# Linux
sudo snap install opencode
```

## 登录

```bash
opencode login
```

## 常用配置

- 默认模型
- 对话模式
- 自动补全触发方式
- 项目级规则
- 忽略目录
- 网络搜索和工具调用

## 使用建议

- 需求写具体，少一次性丢太大范围
- 大型改动先小范围验证
- 关键改动保留人工 review 和测试

## 排查

- 无法登录：检查网络和代理
- 补全不生效：检查语言服务和全局设置
