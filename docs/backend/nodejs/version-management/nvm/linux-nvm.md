---
tags:
  - 后端
  - Node.js
  - nvm
  - Linux
description: nvm --version
---

# Linux nvm 配置

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
