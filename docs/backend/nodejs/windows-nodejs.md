---
tags:
  - 后端
  - Node.js
  - Windows
description: 打开 PowerShell 或 CMD，执行：
---

# Windows Node.js 配置

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

- [Windows-nvm](./version-management/nvm/windows-nvm.md)

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
