---
tags:
  - 工具
  - Git
  - Linux
description: 查看版本：
---

# Linux Git 配置

## 先检查是否已经安装

查看版本：

```bash
git --version
```

如果输出版本号，说明 Git 已经安装。

查看路径：

```bash
which git
```

## Debian / Ubuntu

更新软件源：

```bash
sudo apt update
```

安装 Git：

```bash
sudo apt install -y git
```

## CentOS / RHEL / Rocky / AlmaLinux

安装：

```bash
sudo dnf install -y git
```

较老系统也可以使用：

```bash
sudo yum install -y git
```

## Fedora

安装：

```bash
sudo dnf install -y git
```

## Arch / Manjaro

安装：

```bash
sudo pacman -S --needed git
```

## openSUSE

安装：

```bash
sudo zypper install -y git
```

## 验证 Git 是否可用

查看版本：

```bash
git --version
```

查看帮助：

```bash
git --help
```

## 初始化基础配置

设置用户名：

```bash
git config --global user.name "你的名字"
```

设置邮箱：

```bash
git config --global user.email "your_email@example.com"
```

建议设置默认分支名：

```bash
git config --global init.defaultBranch main
```

查看当前全局配置：

```bash
git config --global --list
```

## 常见配置文件

用户级全局配置：

```text
~/.gitconfig
```

当前仓库配置：

```text
.git/config
```

系统级配置：

```text
/etc/gitconfig
```

## 设置常用别名

例如：

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
```

之后可以直接用：

```bash
git st
git co
```

## 配置默认编辑器

例如使用 `vim`：

```bash
git config --global core.editor "vim"
```

如果你用 VS Code：

```bash
git config --global core.editor "code --wait"
```

## 配置换行符

Linux 上通常建议：

```bash
git config --global core.autocrlf input
```

说明：

- 这样提交时会把 CRLF 转成 LF
- 适合 Linux 和 WSL 环境使用

## 生成 SSH 密钥用于 Git

生成密钥：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

查看公钥：

```bash
cat ~/.ssh/id_ed25519.pub
```

把公钥添加到 GitHub、GitLab 或 Gitee 后，可以测试：

```bash
ssh -T git@github.com
```

## 常用 Git 命令

初始化仓库：

```bash
git init
```

克隆仓库：

```bash
git clone <repo-url>
```

查看状态：

```bash
git status
```

添加文件：

```bash
git add .
```

提交：

```bash
git commit -m "init"
```

查看提交历史：

```bash
git log --oneline --graph --decorate
```

查看分支：

```bash
git branch
```

切换分支：

```bash
git switch branch-name
```

拉取更新：

```bash
git pull
```

推送更新：

```bash
git push
```

## 常见问题排查

### 1. `git: command not found`

说明 Git 没装好，或者 `PATH` 没生效。

先检查：

```bash
which git
git --version
```

### 2. 提交时报用户名或邮箱未配置

执行：

```bash
git config --global user.name "你的名字"
git config --global user.email "your_email@example.com"
```

### 3. SSH 拉取仓库失败

重点检查：

- SSH 密钥是否已生成
- 公钥是否添加到代码托管平台
- SSH 是否能连通

测试：

```bash
ssh -T git@github.com
```

### 4. HTTPS 拉取仓库需要反复输入密码

可以改用 SSH 协议，或者配置凭据管理。

### 5. 换行符混乱

检查设置：

```bash
git config --global core.autocrlf
```

Linux 下通常推荐：

```bash
git config --global core.autocrlf input
```

## 卸载 Git

### Debian / Ubuntu

```bash
sudo apt remove -y git
```

### CentOS / RHEL / Rocky / AlmaLinux

```bash
sudo dnf remove -y git
```

### Arch / Manjaro

```bash
sudo pacman -Rns git
```

## 建议

- 开发环境建议优先配置 `user.name` 和 `user.email`
- 常用远程仓库操作建议直接配好 SSH
- 初学阶段尽量先熟悉 `status`、`add`、`commit`、`pull`、`push`
- 不熟悉回滚命令时，谨慎使用有破坏性的 Git 操作
