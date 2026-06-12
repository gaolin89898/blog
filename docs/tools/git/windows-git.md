---
tags:
  - 工具
  - Git
  - Windows
description: 打开 PowerShell 或 CMD，执行：
---

# Windows Git 配置

## 先检查是否已经安装

打开 `PowerShell` 或 `CMD`，执行：

```powershell
git --version
```

如果输出版本号，说明 Git 已经安装。

查看路径：

```powershell
where git
```

## 方式一：安装 Git for Windows

Windows 上最常见的安装方式是使用 Git for Windows。

安装完成后通常会附带：

- Git 命令行
- Git Bash
- 常用的 SSH 能力

安装后验证：

```powershell
git --version
```

## 方式二：使用 winget 安装

如果系统支持 `winget`，可以直接安装：

```powershell
winget install --id Git.Git -e
```

安装完成后重新打开终端，再验证：

```powershell
git --version
```

## 方式三：使用图形界面安装包

你也可以直接下载安装 Git for Windows 安装包并安装。

安装时常见选项建议：

- 编辑器按你的习惯选择
- 默认分支名建议选 `main`
- PATH 一般选择让命令行可直接使用 Git
- SSH 可使用 Git 自带 OpenSSH

## 初始化基础配置

设置用户名：

```powershell
git config --global user.name "你的名字"
```

设置邮箱：

```powershell
git config --global user.email "your_email@example.com"
```

设置默认分支名：

```powershell
git config --global init.defaultBranch main
```

查看全局配置：

```powershell
git config --global --list
```

## 常见配置文件

用户级全局配置：

```text
C:\Users\你的用户名\.gitconfig
```

当前仓库配置：

```text
.git\config
```

## 设置常用别名

例如：

```powershell
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
```

之后可以直接执行：

```powershell
git st
git co
```

## 配置默认编辑器

如果使用 VS Code：

```powershell
git config --global core.editor "code --wait"
```

如果使用 Notepad++：

```powershell
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

## 配置换行符

Windows 上常见配置：

```powershell
git config --global core.autocrlf true
```

说明：

- 检出到本地时可转成 CRLF
- 提交时会转回 LF

## 配置 SSH 用于 Git

生成密钥：

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

查看公钥：

```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

把公钥添加到 GitHub、GitLab 或 Gitee 后，测试：

```powershell
ssh -T git@github.com
```

## 常用 Git 命令

初始化仓库：

```powershell
git init
```

克隆仓库：

```powershell
git clone <repo-url>
```

查看状态：

```powershell
git status
```

添加文件：

```powershell
git add .
```

提交：

```powershell
git commit -m "init"
```

查看提交历史：

```powershell
git log --oneline --graph --decorate
```

切换分支：

```powershell
git switch branch-name
```

拉取更新：

```powershell
git pull
```

推送更新：

```powershell
git push
```

## 常见问题排查

### 1. `git` 命令找不到

先检查：

```powershell
where git
git --version
```

如果找不到，通常是没安装或 PATH 没生效，重开终端后再试。

### 2. 提交时报用户名或邮箱未配置

执行：

```powershell
git config --global user.name "你的名字"
git config --global user.email "your_email@example.com"
```

### 3. SSH 拉取失败

重点检查：

- SSH 密钥是否已生成
- 公钥是否添加到代码托管平台
- `ssh -T git@github.com` 是否能通过

### 4. HTTPS 每次都要输入认证信息

可以改用 SSH 协议，或者使用 Git Credential Manager。

### 5. 换行符问题

检查当前配置：

```powershell
git config --global core.autocrlf
```

## 卸载 Git

如果是 `winget` 安装：

```powershell
winget uninstall --id Git.Git
```

如果是安装包安装，可以在“设置 -> 应用”中卸载 Git。

## 建议

- 安装后先配置 `user.name` 和 `user.email`
- 常用远程仓库操作建议直接配置 SSH
- Windows 下注意换行符设置，避免 CRLF/LF 混乱
- 不熟悉回滚前，谨慎使用破坏性 Git 命令
