---
tags:
  - 工具
  - Git
description: Git 安装、配置和常用命令速查
---

# Git 速查

## 安装

```bash {"title":"Linux"}
# Debian / Ubuntu
sudo apt update
sudo apt install -y git

# RHEL / Rocky / Fedora
sudo dnf install -y git

# 旧版 CentOS / RHEL
sudo yum install -y git

# Arch / Manjaro
sudo pacman -S --needed git

# openSUSE
sudo zypper install -y git
```

```powershell {"title":"Windows"}
# winget 安装
winget install --id Git.Git -e

# 也可以安装 Git for Windows 图形安装包
# 常见建议：
# - 默认分支名选择 main
# - PATH 选择让命令行可直接使用 Git
# - SSH 可使用 Git 自带 OpenSSH
```

## 验证

```bash {"title":"Linux / macOS"}
git --version
which git
git --help
```

```powershell {"title":"Windows"}
git --version
where git
git --help
```

## 基础配置

```bash
git config --global user.name "你的名字"
git config --global user.email "your_email@example.com"
git config --global init.defaultBranch main
git config --global --list
```

## 配置文件位置

```text {"title":"Linux / macOS"}
# 用户级全局配置
~/.gitconfig

# 当前仓库配置
.git/config

# 系统级配置
/etc/gitconfig
```

```text {"title":"Windows"}
# 用户级全局配置
C:\Users\你的用户名\.gitconfig

# 当前仓库配置
.git\config
```

## 默认编辑器

```bash {"title":"VS Code"}
git config --global core.editor "code --wait"
```

```bash {"title":"Vim"}
git config --global core.editor "vim"
```

```powershell {"title":"Notepad++"}
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

## 换行符

```bash {"title":"Linux / WSL"}
git config --global core.autocrlf input
```

```powershell {"title":"Windows"}
git config --global core.autocrlf true
```

说明：

- Linux / WSL：提交时把 CRLF 转成 LF，本地不主动转成 CRLF。
- Windows：检出到本地时可转成 CRLF，提交时转回 LF。

查看当前配置：

```bash
git config --global core.autocrlf
```

## SSH

生成密钥：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

查看公钥：

```bash {"title":"Linux / macOS"}
cat ~/.ssh/id_ed25519.pub
```

```powershell {"title":"Windows PowerShell"}
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

把公钥添加到 GitHub、GitLab 或 Gitee 后测试：

```bash
ssh -T git@github.com
```

## 常用命令

| 用途 | 命令 |
| --- | --- |
| 初始化仓库 | `git init` |
| 克隆仓库 | `git clone <repo-url>` |
| 查看状态 | `git status` |
| 暂存全部 | `git add .` |
| 提交 | `git commit -m "message"` |
| 拉取 | `git pull` |
| 推送 | `git push` |
| 查看分支 | `git branch` |
| 切换分支 | `git switch <branch>` |
| 新建并切换分支 | `git switch -c <branch>` |
| 合并分支 | `git merge <branch>` |
| 查看日志 | `git log --oneline --graph --decorate` |
| 查看工作区 diff | `git diff` |
| 查看暂存区 diff | `git diff --cached` |
| 撤回暂存 | `git restore --staged <file>` |
| 丢弃工作区改动 | `git restore <file>` |
| 修改最后一次提交 | `git commit --amend` |

## 常用别名

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --decorate"
```

之后可以直接用：

```bash
git st
git co
git lg
```

## 卸载

```bash {"title":"Linux"}
# Debian / Ubuntu
sudo apt remove -y git

# RHEL / Rocky / Fedora
sudo dnf remove -y git

# Arch / Manjaro
sudo pacman -Rns git
```

```powershell {"title":"Windows"}
# winget 安装的 Git
winget uninstall --id Git.Git

# 安装包安装的 Git
# 设置 -> 应用 -> Git -> 卸载
```

## 常见问题

### `git` 命令找不到

```bash {"title":"Linux / macOS"}
which git
git --version
```

```powershell {"title":"Windows"}
where git
git --version
```

通常是没有安装，或者安装后终端还没重新打开。

### 提交时报用户名或邮箱未配置

```bash
git config --global user.name "你的名字"
git config --global user.email "your_email@example.com"
```

### SSH 拉取失败

重点检查：

- SSH 密钥是否已生成
- 公钥是否已添加到代码托管平台
- `ssh -T git@github.com` 是否能通过

### HTTPS 每次都要输入认证信息

优先改用 SSH 协议，或者使用 Git Credential Manager。

### 换行符混乱

检查当前配置：

```bash
git config --global core.autocrlf
```

不熟悉回滚前，谨慎使用破坏性 Git 命令。
