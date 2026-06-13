---
tags:
  - 工具
  - Git
description: Git 安装、配置和常用命令速查
---

# Git 速查

## 安装

::: tabs
== Linux

```bash
# Debian / Ubuntu
sudo apt update && sudo apt install -y git

# RHEL / Rocky / Fedora
sudo dnf install -y git

# Arch / Manjaro
sudo pacman -S --needed git
```

== Windows

```powershell
winget install --id Git.Git -e
```

:::

## 基础配置

```bash
git --version
git config --global user.name "你的名字"
git config --global user.email "your_email@example.com"
git config --global init.defaultBranch main
git config --global --list
```

推荐编辑器：

```bash
git config --global core.editor "code --wait"
```

换行符：

::: tabs
== Linux / WSL

```bash
git config --global core.autocrlf input
```

== Windows

```bash
git config --global core.autocrlf true
```

:::

## SSH

生成密钥：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

查看公钥：

::: tabs
== Linux / macOS

```bash
cat ~/.ssh/id_ed25519.pub
```

== Windows PowerShell

```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

:::

测试 GitHub：

```bash
ssh -T git@github.com
```

## 日常命令

| 用途 | 命令 |
| --- | --- |
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

## 排查

::: tabs
== Linux / macOS

```bash
which git
```

== Windows

```powershell
where git
```

:::

```bash
git --version
git config --global --list
git remote -v
git status --short --branch
```

常见问题：

- `git` 找不到：检查是否安装、PATH 是否生效
- 不能提交：配置 `user.name` 和 `user.email`
- SSH 失败：确认公钥已添加到 GitHub / GitLab / Gitee
- HTTPS 总要密码：优先改用 SSH 或配置凭据管理器
