---
tags:
  - 后端
  - Node.js
description: Node.js 安装、配置和常用命令速查
---

# Node.js 速查

Node.js 常用于前端工程化、服务端脚本和本地开发工具链。

## 安装

::: tabs
== Linux

```bash
# Debian / Ubuntu（系统源）
sudo apt update
sudo apt install -y nodejs npm

# Debian / Ubuntu（NodeSource LTS）
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# RHEL / Rocky / Fedora
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo dnf install -y nodejs

# Arch / Manjaro
sudo pacman -S --needed nodejs npm
```

== Windows

```powershell
# LTS
winget install OpenJS.NodeJS.LTS

# 当前版本
winget install OpenJS.NodeJS
```

:::

多项目切换版本时优先用：

- [fnm](./version-management/fnm/index.md)
- [nvm / nvm-windows](./version-management/nvm/index.md)

## 验证

| 用途 | 命令 |
| --- | --- |
| Node 版本 | `node -v` |
| npm 版本 | `npm -v` |
| 测试运行 | `node -e "console.log('hello node')"` |

路径查询：

::: tabs
== Linux / macOS

```bash
which node && which npm
```

== Windows

```powershell
where node && where npm
```

:::

## 包管理器

| 用途 | 命令 |
| --- | --- |
| 安装 pnpm | `npm install -g pnpm` |
| 安装 yarn | `npm install -g yarn` |
| 查看 pnpm | `pnpm -v` |
| 查看 yarn | `yarn -v` |
| 查看 registry | `npm config get registry` |
| 官方 registry | `npm config set registry https://registry.npmjs.org/` |

## 常用命令

| 用途 | 命令 |
| --- | --- |
| 初始化项目 | `npm init -y` |
| 安装依赖 | `npm install` |
| 安装指定包 | `npm install express` |
| 全局安装工具 | `npm install -g typescript` |
| 运行脚本 | `npm run dev` |
| 查看脚本 | `npm run` |

## 卸载

::: tabs
== Linux

```bash
# Debian / Ubuntu
sudo apt remove -y nodejs npm

# RHEL / Rocky / Fedora
sudo dnf remove -y nodejs

# Arch / Manjaro
sudo pacman -Rns nodejs npm
```

== Windows

```powershell
# LTS
winget uninstall OpenJS.NodeJS.LTS

# 当前版本
winget uninstall OpenJS.NodeJS
```

:::

## 排查

- `node` / `npm` 找不到：检查 PATH，重新打开终端
- 全局安装权限错误：优先用 `fnm` / `nvm`，少用 `sudo npm install -g`
- 安装依赖慢：检查 `npm config get registry`、网络和代理
- 多项目版本不一致：使用版本管理器，不要只依赖系统级 Node
- 终端和编辑器版本不一致：检查 `which node` / `where node`
