---
tags:
  - 后端
  - Node.js
  - nvm
description: nvm / nvm-windows 安装与 Node.js 版本管理记录
---

# nvm 安装与配置

`nvm` 是常见的 Node.js 版本管理方案。Linux/macOS 常用 `nvm`，Windows 常用 `nvm-windows`，两者命令相似但不是同一个实现。

## 安装与配置

::: tabs
=== Linux

## 先检查是否已经安装

```bash
nvm --version
```

如果输出版本号，说明 `nvm` 已安装。

## 安装 nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

安装完成后重新打开终端，或者加载配置：

```bash
source ~/.bashrc
```

如果你用 Zsh：

```bash
source ~/.zshrc
```

验证：

```bash
nvm --version
```

## 用 nvm 安装 Node.js

安装最新 LTS：

```bash
nvm install --lts
```

使用当前 LTS：

```bash
nvm use --lts
```

设置默认版本：

```bash
nvm alias default lts/*
```

验证：

```bash
node -v
npm -v
```

## 常用命令

查看远程可用版本：

```bash
nvm ls-remote
```

安装指定版本：

```bash
nvm install 20
```

使用指定版本：

```bash
nvm use 20
```

查看已安装版本：

```bash
nvm ls
```

查看当前版本：

```bash
nvm current
```

设置默认版本：

```bash
nvm alias default 20
```

卸载指定版本：

```bash
nvm uninstall 18
```

## 配合项目使用

很多项目会放一个 `.nvmrc` 文件，里面写明 Node 版本。

进入项目目录后可以执行：

```bash
nvm use
```

如果本地没装对应版本，可以先执行：

```bash
nvm install
```

## 常见问题排查

### 1. `nvm: command not found`

通常是 shell 配置没有加载。

先执行：

```bash
source ~/.bashrc
```

或者：

```bash
source ~/.zshrc
```

### 2. `node -v` 还是系统版本

检查：

```bash
which node
nvm current
```

### 3. 切换版本后全局包没了

这是正常现象，因为每个 Node 版本都有自己的全局包环境。

## 建议

- 多项目环境下，`nvm` 是很稳妥的方案
- 项目里如果有 `.nvmrc`，尽量跟着项目要求走
- 如果你更关注 shell 启动速度，也可以考虑 `fnm`

=== Windows

## 适用场景

Windows 下常见的 Node.js 版本管理器是 `nvm-windows`。

适合这些情况：

- 多个项目 Node 版本不一致
- 需要在 Node 18、20、22 之间切换
- 不想只装一个系统级 Node.js

注意：

- 这里的 `nvm` 指的是 `nvm-windows`
- 它和 Linux/macOS 上的 `nvm` 不是同一个实现

## 先检查是否已经安装

在 `PowerShell` 或 `CMD` 中执行：

```powershell
nvm version
```

如果输出版本号，说明已经安装。

## 安装 nvm-windows

安装完成后重新打开终端，再验证：

```powershell
nvm version
```

如果你使用 `winget` 管理软件，也可以优先检查系统里是否已有可用安装方式。

## 安装 Node.js

安装 Node 20：

```powershell
nvm install 20
```

切换到 Node 20：

```powershell
nvm use 20
```

查看版本：

```powershell
node -v
npm -v
```

安装 LTS 时，也可以按你需要的主版本号来装，例如 18、20、22。

## 常用命令

查看已安装版本：

```powershell
nvm list
```

安装指定版本：

```powershell
nvm install 18
nvm install 20
```

切换版本：

```powershell
nvm use 18
nvm use 20
```

卸载版本：

```powershell
nvm uninstall 18
```

查看当前 Node.js：

```powershell
node -v
```

## 验证是否可用

测试命令：

```powershell
node -e "console.log('hello node')"
```

初始化项目：

```powershell
npm init -y
```

## 安装 pnpm 或 yarn

安装 pnpm：

```powershell
npm install -g pnpm
```

安装 yarn：

```powershell
npm install -g yarn
```

查看版本：

```powershell
pnpm -v
yarn -v
```

## 常见问题排查

### 1. `nvm` 命令找不到

先检查是否装好，并重新打开终端。

再检查：

```powershell
where nvm
```

### 2. `nvm use` 后 `node -v` 没变化

通常是 PATH 或终端会话没有刷新。

重开终端后再检查：

```powershell
where node
node -v
```

### 3. 系统原来已经装过 Node.js

这可能会和 `nvm-windows` 冲突。

重点检查：

- `where node`
- 当前 PATH 顺序
- 是否同时存在系统级 Node.js

### 4. 全局包在切换版本后不可用

这是正常现象，因为每个 Node 版本的全局包环境是分开的。

## 建议

- Windows 下多项目开发，优先使用 `nvm-windows`
- 尽量避免同时长期保留多个不同来源的 Node.js
- 出现版本混乱时，优先检查 `where node`
:::
