---
tags:
  - 工具
  - Fish
  - 终端
description: Fish Shell 安装、默认 Shell 配置和常见问题记录
---

# Fish 安装与配置

Fish 是一个更偏交互体验的 Shell，适合日常命令行操作。

## Linux 配置

## 先检查是否已经安装

```bash
fish --version
```

如果输出版本号，说明已经安装。

也可以查看路径：

```bash
which fish
```

## Debian / Ubuntu

更新软件源：

```bash
sudo apt update
```

安装 Fish：

```bash
sudo apt install -y fish
```

检查版本：

```bash
fish --version
```

## CentOS / RHEL / Rocky / AlmaLinux

安装：

```bash
sudo dnf install -y fish
```

较老系统也可以使用：

```bash
sudo yum install -y fish
```

检查版本：

```bash
fish --version
```

## Fedora

安装：

```bash
sudo dnf install -y fish
```

## Arch / Manjaro

安装：

```bash
sudo pacman -S --needed fish
```

## openSUSE

安装：

```bash
sudo zypper install -y fish
```

## 启动 Fish

安装完成后，直接输入：

```bash
fish
```

这样会进入 Fish 交互环境。

退出 Fish：

```bash
exit
```

## 设置 Fish 为默认 Shell

先确认 Fish 路径：

```bash
which fish
```

常见输出：

```text
/usr/bin/fish
```

检查是否已在允许的 Shell 列表中：

```bash
cat /etc/shells
```

如果里面已经有 `/usr/bin/fish`，可以直接执行：

```bash
chsh -s /usr/bin/fish
```

修改后通常需要重新登录终端或重开会话生效。

查看当前默认 Shell：

```bash
echo $SHELL
```

说明：

- `echo $SHELL` 显示的是登录 Shell
- 如果你只是手动输入 `fish` 进入子 Shell，这里不一定会变化

## 如果 `chsh` 提示 Fish 不在 /etc/shells 中

先把 Fish 路径加入 `/etc/shells`：

```bash
which fish
```

例如输出 `/usr/bin/fish`，则执行：

```bash
echo /usr/bin/fish | sudo tee -a /etc/shells
```

然后再执行：

```bash
chsh -s /usr/bin/fish
```

## Fish 配置文件位置

用户级配置目录：

```text
~/.config/fish/
```

主配置文件：

```text
~/.config/fish/config.fish
```

如果目录不存在，可以手动创建：

```bash
mkdir -p ~/.config/fish
touch ~/.config/fish/config.fish
```

## 常见基础配置

### 添加环境变量

编辑：

```text
~/.config/fish/config.fish
```

例如添加：

```fish
set -gx EDITOR vim
set -gx LANG zh_CN.UTF-8
```

### 把目录加入 PATH

例如：

```fish
fish_add_path ~/.local/bin
fish_add_path ~/bin
```

说明：

- `fish_add_path` 是 Fish 推荐写法
- 通常比手动拼接 `PATH` 更稳妥

### 设置别名

Fish 中更推荐使用 `alias` 或 function。

示例：

```fish
alias ll='ls -alF'
alias la='ls -A'
alias gs='git status'
```

## 使用 Fish Web 配置界面

Fish 自带一个本地 Web 配置工具：

```bash
fish_config
```

执行后通常会自动打开浏览器，你可以配置：

- 提示符样式
- 颜色主题
- 函数
- 快捷配置

## 安装 Fisher 插件管理器

Fish 常用的插件管理器之一是 Fisher。

安装命令：

```fish
curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher
```

安装完成后可以用来装 Fish 插件。

例如安装一个常用的纯主题：

```fish
fisher install jorgebucaran/nvm.fish
```

说明：

- 插件越多，Shell 启动越可能变慢
- 建议只安装真正需要的插件

## 卸载 Fish

### Debian / Ubuntu

```bash
sudo apt remove -y fish
```

### Fedora / RHEL / Rocky / AlmaLinux

```bash
sudo dnf remove -y fish
```

### Arch / Manjaro

```bash
sudo pacman -Rns fish
```

### openSUSE

```bash
sudo zypper remove -y fish
```

如果你之前把 Fish 设为了默认 Shell，卸载前建议先切回 Bash：

```bash
chsh -s /bin/bash
```

## 常见问题排查

### 1. 输入 `fish` 提示找不到命令

检查是否安装成功：

```bash
which fish
```

如果没有输出，说明 Fish 没装好或路径不在 `PATH` 中。

### 2. `chsh` 修改后没有生效

常见原因：

- 没有重新登录
- 终端程序还在复用旧会话
- Fish 路径不在 `/etc/shells`

可以重新登录系统，或者关闭终端后再打开。

### 3. 某些 Bash 脚本在 Fish 里不能运行

这是正常现象。

处理方式：

- 直接用 Bash 执行脚本：`bash script.sh`
- 不要把 Bash 脚本内容直接粘贴到 Fish 提示符里执行

### 4. PATH 配置不生效

检查你的配置文件：

```bash
cat ~/.config/fish/config.fish
```

然后重新打开 Fish，或者执行：

```fish
source ~/.config/fish/config.fish
```

## 常用命令汇总

安装：

```bash
sudo apt install -y fish
sudo dnf install -y fish
sudo pacman -S --needed fish
```

启动：

```bash
fish
```

查看版本：

```bash
fish --version
```

查看路径：

```bash
which fish
```

设为默认 Shell：

```bash
chsh -s /usr/bin/fish
```

打开 Web 配置：

```bash
fish_config
```

## 建议

- 如果你主要是在终端里交互式使用命令，Fish 很适合
- 如果你经常写脚本，仍然建议保留 Bash 作为脚本执行环境
- 初次迁移时先用 `fish` 试用，不必急着直接改成默认 Shell
- 改默认 Shell 之前，先确认常用命令和环境变量都能正常工作
