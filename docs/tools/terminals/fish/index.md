---
tags:
  - 工具
  - Fish
  - 终端
description: Fish Shell 安装、配置和排查速查
---

# Fish 速查

## 安装

```bash
# Debian / Ubuntu
sudo apt update && sudo apt install -y fish

# RHEL / Rocky / Fedora
sudo dnf install -y fish

# Arch / Manjaro
sudo pacman -S --needed fish

# openSUSE
sudo zypper install -y fish
```

## 启动和默认 Shell

```bash
fish
exit
fish --version
which fish
cat /etc/shells
chsh -s /usr/bin/fish
echo $SHELL
```

如果 Fish 不在 `/etc/shells`：

```bash
echo /usr/bin/fish | sudo tee -a /etc/shells
chsh -s /usr/bin/fish
```

## 配置文件

```text
~/.config/fish/config.fish
```

创建：

```bash
mkdir -p ~/.config/fish
touch ~/.config/fish/config.fish
```

常用配置：

```fish
set -gx EDITOR vim
set -gx LANG zh_CN.UTF-8

fish_add_path ~/.local/bin
fish_add_path ~/bin

alias ll='ls -alF'
alias gs='git status'
```

重新加载：

```fish
source ~/.config/fish/config.fish
```

## 插件

Web 配置：

```bash
fish_config
```

Fisher：

```fish
curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher
```

## 排查

```bash
which fish
fish --version
cat ~/.config/fish/config.fish
source ~/.config/fish/config.fish
```

常见问题：

- `fish` 找不到：确认安装和 PATH
- `chsh` 不生效：重新登录，确认路径在 `/etc/shells`
- Bash 脚本不能直接粘贴到 Fish：用 `bash script.sh`
- PATH 不生效：优先用 `fish_add_path`

## 卸载

卸载前先切回 Bash：

```bash
chsh -s /bin/bash
```

```bash
sudo apt remove -y fish
sudo dnf remove -y fish
sudo pacman -Rns fish
```
