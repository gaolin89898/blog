---
tags:
  - 后端
  - Node.js
  - fnm
description: fnm 安装和 Node.js 版本管理速查
---

# fnm 速查

`fnm` 是轻量的 Node.js 版本管理器，适合多项目切换版本。

## 安装

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

安装后重新打开终端，或手动加载：

```bash
source ~/.bashrc
source ~/.zshrc
source ~/.config/fish/config.fish
```

## 常用命令

| 用途 | 命令 |
| --- | --- |
| 查看 fnm | `fnm --version` |
| 安装 LTS | `fnm install --lts` |
| 使用 LTS | `fnm use lts-latest` |
| 默认 LTS | `fnm default lts-latest` |
| 查看远程版本 | `fnm ls-remote` |
| 安装指定版本 | `fnm install 20` |
| 使用指定版本 | `fnm use 20` |
| 默认指定版本 | `fnm default 20` |
| 查看已安装版本 | `fnm list` |
| 查看当前版本 | `fnm current` |
| 按 `.node-version` / `.nvmrc` 切换 | `fnm use` |

## 验证

| 用途 | 命令 |
| --- | --- |
| Node 版本 | `node -v` |
| npm 版本 | `npm -v` |
| Node 路径 | `which node` |
| npm 路径 | `which npm` |

## 排查

- `fnm: command not found`：重新加载 shell 配置或重开终端
- `node -v` 没变化：执行 `fnm use lts-latest`
- 多来源冲突：检查 `which node`，尽量不要混用系统级 Node
