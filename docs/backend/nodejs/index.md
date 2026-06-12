---
tags:
  - 后端
  - Node.js
description: Node.js 安装、配置与多平台使用记录
---

# Node.js

Node.js 用于运行 JavaScript 服务端程序，也常用于前端工程化和工具链环境。

常见场景：

- 运行前端项目开发环境
- 使用 `npm`、`pnpm`、`yarn` 管理依赖
- 运行构建工具、脚手架和本地脚本

## 安装与配置

::: tabs
=== Linux

## 先检查是否已经安装

查看 Node.js 版本：

```bash
node -v
```

查看 npm 版本：

```bash
npm -v
```

如果命令不存在，说明 Node.js 还没有安装。

## 安装方式建议

Linux 下常见有三种方式：

- 系统包管理器安装
- NodeSource 官方仓库安装
- 使用 `fnm`、`nvm` 这类版本管理器安装

建议：

- 只想简单使用：系统仓库或 NodeSource
- 需要频繁切换版本：优先用版本管理器

版本管理器文档：

- [Node版本管理](./version-management/index.md)

## Debian / Ubuntu 通过 apt 安装

更新软件源：

```bash
sudo apt update
```

安装：

```bash
sudo apt install -y nodejs npm
```

说明：

- 这种方式最简单
- 版本可能不是最新 LTS

## Debian / Ubuntu 通过 NodeSource 安装

如果要较新的版本，可以使用 NodeSource 仓库。

安装依赖：

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
```

导入仓库安装脚本：

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
```

安装 Node.js：

```bash
sudo apt install -y nodejs
```

验证：

```bash
node -v
npm -v
```

## CentOS / RHEL / Rocky / AlmaLinux

通过 NodeSource 安装 LTS：

```bash
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo dnf install -y nodejs
```

较老系统也可能使用：

```bash
sudo yum install -y nodejs
```

## Fedora

安装：

```bash
sudo dnf install -y nodejs npm
```

## Arch / Manjaro

安装：

```bash
sudo pacman -S --needed nodejs npm
```

## openSUSE

安装：

```bash
sudo zypper install -y nodejs npm
```

## 验证 Node.js 是否可用

查看版本：

```bash
node -v
npm -v
```

执行一条测试命令：

```bash
node -e "console.log('hello node')"
```

初始化一个项目：

```bash
npm init -y
```

## 安装 pnpm 或 yarn

### 安装 pnpm

```bash
npm install -g pnpm
```

查看版本：

```bash
pnpm -v
```

### 安装 yarn

```bash
npm install -g yarn
```

查看版本：

```bash
yarn -v
```

## 配置 npm 国内镜像

查看当前源：

```bash
npm config get registry
```

设置为 npm 官方源：

```bash
npm config set registry https://registry.npmjs.org/
```

如果在国内网络环境下访问慢，也可以按实际需要换成其他可用镜像源。

## 常用命令

查看版本：

```bash
node -v
npm -v
```

初始化项目：

```bash
npm init -y
```

安装依赖：

```bash
npm install
```

安装指定包：

```bash
npm install express
```

全局安装工具：

```bash
npm install -g typescript
```

运行脚本：

```bash
npm run dev
```

## 常见问题排查

### 1. `node: command not found`

说明 Node.js 没装好，或者当前 shell 没加载对应路径。

先检查：

```bash
which node
node -v
```

### 2. `npm: command not found`

说明 npm 没一起装上，或者当前安装方式没有正确配置。

检查：

```bash
which npm
npm -v
```

### 3. 权限错误，例如 `EACCES`

常见于全局安装包时权限不足。

处理思路：

- 优先使用版本管理器安装 Node.js
- 避免长期依赖 `sudo npm install -g`

### 4. 依赖安装速度慢

重点检查：

- 当前 npm registry
- 网络环境
- 是否命中缓存

### 5. 多项目 Node 版本不一致

建议使用 `fnm` 或 `nvm` 管理版本，不要只装一个系统级 Node。

## 卸载 Node.js

### Debian / Ubuntu

```bash
sudo apt remove -y nodejs npm
```

### CentOS / RHEL / Rocky / AlmaLinux

```bash
sudo dnf remove -y nodejs
```

### Arch / Manjaro

```bash
sudo pacman -Rns nodejs npm
```

## 建议

- 新项目优先使用 LTS 版本
- 多项目环境建议直接用 `fnm` 之类的版本管理器
- `npm`、`pnpm`、`yarn` 选一种作为主工作流，避免混用
- 安装全局工具前，先确认当前 Node.js 来源和 PATH 配置

=== Windows

## 先检查是否已经安装

打开 `PowerShell` 或 `CMD`，执行：

```powershell
node -v
npm -v
```

如果两个命令都能输出版本号，说明 Node.js 和 npm 已经安装。

查看路径：

```powershell
where node
where npm
```

## 方式一：下载安装包

Windows 上最常见的方式是直接安装 Node.js 安装包。

安装时通常会一并带上：

- Node.js
- npm
- PATH 环境变量配置

安装完成后重新打开终端，验证：

```powershell
node -v
npm -v
```

## 方式二：使用 winget 安装

如果系统支持 `winget`，可以直接安装 LTS：

```powershell
winget install OpenJS.NodeJS.LTS
```

如果你明确需要当前版本，也可以安装：

```powershell
winget install OpenJS.NodeJS
```

安装完成后验证：

```powershell
node -v
npm -v
```

## 版本管理器

如果你需要多个 Node 版本，建议使用 `nvm-windows`。

详细文档：

- [nvm 安装与配置](./version-management/nvm/index.md)

## 验证 Node.js 是否可用

执行一条测试命令：

```powershell
node -e "console.log('hello node')"
```

初始化一个项目：

```powershell
npm init -y
```

## 安装 pnpm 或 yarn

### 安装 pnpm

```powershell
npm install -g pnpm
```

查看版本：

```powershell
pnpm -v
```

### 安装 yarn

```powershell
npm install -g yarn
```

查看版本：

```powershell
yarn -v
```

## 配置 npm registry

查看当前源：

```powershell
npm config get registry
```

设置为 npm 官方源：

```powershell
npm config set registry https://registry.npmjs.org/
```

如果网络环境需要，也可以改成其他可用镜像源。

## 常用命令

查看版本：

```powershell
node -v
npm -v
```

初始化项目：

```powershell
npm init -y
```

安装依赖：

```powershell
npm install
```

安装指定包：

```powershell
npm install express
```

全局安装工具：

```powershell
npm install -g typescript
```

运行脚本：

```powershell
npm run dev
```

## 常见问题排查

### 1. `node` 或 `npm` 命令找不到

先检查：

```powershell
where node
where npm
```

如果找不到，通常是未安装或 PATH 没生效，重新打开终端后再试。

### 2. 安装全局包时报权限或路径问题

重点检查：

- 当前 Node.js 是系统安装还是 `nvm-windows` 安装
- npm 全局目录是否正常

如果你需要经常切换版本，建议优先使用 `nvm-windows`。

### 3. 依赖安装很慢

重点检查：

- `npm config get registry`
- 当前网络环境
- 是否有缓存或代理设置影响

### 4. 多项目版本不一致

建议使用 `nvm-windows` 管理不同 Node 版本，不要只依赖单一系统级安装。

### 5. 终端里版本和编辑器里版本不一致

通常是 PATH 顺序或终端重启问题。

可以分别检查：

```powershell
where node
node -v
```

## 卸载 Node.js

如果是 `winget` 安装：

```powershell
winget uninstall OpenJS.NodeJS.LTS
```

或：

```powershell
winget uninstall OpenJS.NodeJS
```

如果是安装包安装，可以在“设置 -> 应用”里卸载。

如果是 `nvm-windows` 管理，则按它自己的卸载方式处理。

## 建议

- 新项目优先使用 LTS 版本
- 多项目环境建议使用 `nvm-windows`
- `npm`、`pnpm`、`yarn` 选一种作为主工作流
- 安装全局工具前，先确认当前 `node` 来源和 PATH
:::


## 版本管理

- [Node.js 版本管理](./version-management/index.md)
