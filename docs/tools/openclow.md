---
tags:
  - AI
  - 工具
description: OpenClow 安装和常用命令速查
---

# OpenClow 速查

## 安装

```bash
# 全局
npm install -g openclow

# 项目内
npm install -D openclow

# 源码
git clone <openclow-repo-url>
cd openclow
npm install
npm run build
```

## 初始化

```bash
openclow init
openclow init --project
```

## 常用命令

| 用途 | 命令 |
| --- | --- |
| 启动服务 | `openclow start` |
| 查看状态 | `openclow status` |
| 执行任务流 | `openclow run <flow-name>` |
| 查看日志 | `openclow logs` |
| 更新 | `openclow update` |

## 配置关注点

- 模型与提供方
- 工具和插件
- 任务流顺序
- 项目规则和忽略目录

## 排查

- 命令找不到：确认全局安装或项目脚本
- 运行失败：检查依赖和配置文件格式
- 网络不可用：检查代理、镜像源和网络连通性
