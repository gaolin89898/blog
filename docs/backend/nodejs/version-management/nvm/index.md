---
tags:
  - 后端
  - Node.js
  - nvm
description: nvm / nvm-windows 安装和 Node.js 版本管理速查
---

# nvm 速查

Linux / macOS 用 `nvm`，Windows 用 `nvm-windows`。两者名字相同，但不是同一个实现。

## 安装

::: tabs
== Linux / macOS

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
source ~/.bashrc
```

== Windows

安装 `nvm-windows` 后重新打开终端。

:::

## 常用命令

::: tabs
== Linux / macOS

| 用途 | 命令 |
| --- | --- |
| 查看 nvm | `nvm --version` |
| 安装 LTS | `nvm install --lts` |
| 使用 LTS | `nvm use --lts` |
| 默认 LTS | `nvm alias default lts/*` |
| 查看远程版本 | `nvm ls-remote` |
| 安装指定版本 | `nvm install 20` |
| 使用指定版本 | `nvm use 20` |
| 查看已安装版本 | `nvm ls` |
| 查看当前版本 | `nvm current` |
| 默认指定版本 | `nvm alias default 20` |
| 卸载版本 | `nvm uninstall 18` |
| 按 `.nvmrc` 切换 | `nvm use` |
| 按 `.nvmrc` 安装 | `nvm install` |

== Windows

| 用途 | 命令 |
| --- | --- |
| 查看 nvm | `nvm version` |
| 安装 Node 20 | `nvm install 20` |
| 使用 Node 20 | `nvm use 20` |
| 查看已安装版本 | `nvm list` |
| 卸载版本 | `nvm uninstall 18` |
| 查看 Node | `node -v` |
| 查看 npm | `npm -v` |
| 查 nvm 路径 | `where nvm` |
| 查 node 路径 | `where node` |

:::

## 包管理器

| 用途 | 命令 |
| --- | --- |
| 安装 pnpm | `npm install -g pnpm` |
| 安装 yarn | `npm install -g yarn` |
| 查看 pnpm | `pnpm -v` |
| 查看 yarn | `yarn -v` |

## 排查

- `nvm` 找不到：重开终端，检查 shell 配置或 `where nvm`
- `node -v` 没变化：检查 PATH、`which node` / `where node`
- 切换版本后全局包没了：正常现象，每个 Node 版本有独立全局包
- Windows 下尽量避免同时保留系统级 Node 和 `nvm-windows`