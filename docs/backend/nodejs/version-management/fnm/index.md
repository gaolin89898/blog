---
tags:
  - 后端
  - Node.js
  - fnm
description: fnm 安装与 Node.js 版本管理记录
---

# fnm 安装与配置

`fnm` 是一个偏轻量、速度快的 Node.js 版本管理器，适合日常开发中快速切换 Node 版本。

## Linux 配置

## 先检查是否已经安装

```bash
fnm --version
```

如果输出版本号，说明 `fnm` 已安装。

同时检查当前 Node.js：

```bash
node -v
npm -v
```

## 安装 fnm

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

安装完成后，重新打开终端，或者加载 shell 配置文件。

例如 Bash：

```bash
source ~/.bashrc
```

例如 Zsh：

```bash
source ~/.zshrc
```

例如 Fish：

```fish
source ~/.config/fish/config.fish
```

验证：

```bash
fnm --version
```

## 用 fnm 安装 Node.js

安装最新 LTS：

```bash
fnm install --lts
```

切换到当前 LTS：

```bash
fnm use lts-latest
```

设置默认版本：

```bash
fnm default lts-latest
```

查看版本：

```bash
node -v
npm -v
```

## 常用命令

查看远程版本：

```bash
fnm ls-remote
```

安装指定版本：

```bash
fnm install 20
```

切换版本：

```bash
fnm use 20
```

设置默认版本：

```bash
fnm default 20
```

查看已安装版本：

```bash
fnm list
```

查看当前版本：

```bash
fnm current
```

## 配合项目使用

如果项目里有 `.node-version` 或 `.nvmrc`，可以进入项目目录后执行：

```bash
fnm use
```

## 常见问题排查

### 1. `fnm: command not found`

说明安装后 shell 配置还没生效。

重新加载配置：

```bash
source ~/.bashrc
```

### 2. 安装了 Node.js 但 `node -v` 没变化

执行：

```bash
fnm use lts-latest
node -v
```

### 3. 多个 Node.js 来源冲突

重点检查：

```bash
which node
which npm
```

## 建议

- 日常开发环境优先使用 LTS
- 如果已经决定用 `fnm`，尽量不要再混用系统级 Node.js
- 出现版本混乱时，优先检查 `which node`
