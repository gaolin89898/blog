---
tags:
  - 工具
  - VSCode
  - Linux
description: Linux 版 VS Code 在应用内点击“更新”时，可能会跳转到官网下载页面，让用户手动下载 .deb 安装包。
---

# Linux VS Code 更新配置

## 问题现象

Linux 版 VS Code 在应用内点击“更新”时，可能会跳转到官网下载页面，让用户手动下载 `.deb` 安装包。

更推荐的方式是把 VS Code 接入系统包管理器，由 `apt` 负责安装和更新。这样以后不需要手动下载 `.deb`，直接用系统更新命令即可。

## 当前机器状态

当前 Ubuntu 机器上的 VS Code 已经由 Microsoft 官方 `apt` 源管理。

软件源：

```text
https://packages.microsoft.com/repos/code
```

当前已确认版本：

```text
1.124.2
```

本次处理记录：

```text
从 1.124.0-1781066808 升级到 1.124.2-1781225536
```

## 检查 VS Code 是否已安装

查看命令路径：

```bash
which code
```

查看当前版本：

```bash
code --version
```

查看 `apt` 包来源：

```bash
apt policy code
```

如果输出里能看到下面的软件源，说明已经接入 Microsoft 官方源：

```text
https://packages.microsoft.com/repos/code
```

## Ubuntu / Debian 添加官方 apt 源

如果 `apt policy code` 没有显示 Microsoft 官方源，可以手动添加。

安装必要工具：

```bash
sudo apt update
sudo apt install wget gpg apt-transport-https
```

导入 Microsoft 签名密钥：

```bash
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /usr/share/keyrings/microsoft.gpg > /dev/null
```

添加 VS Code 软件源：

```bash
sudo tee /etc/apt/sources.list.d/vscode.sources > /dev/null <<'EOF'
Types: deb
URIs: https://packages.microsoft.com/repos/code
Suites: stable
Components: main
Architectures: amd64,arm64,armhf
Signed-By: /usr/share/keyrings/microsoft.gpg
EOF
```

刷新软件源并安装：

```bash
sudo apt update
sudo apt install code
```

## 单独更新 VS Code

只更新 VS Code，不升级其他系统包：

```bash
sudo apt update
sudo apt install --only-upgrade code -y
```

这是日常最推荐的单独更新方式。

## 随系统一起更新

如果希望 VS Code 和其他系统软件一起更新：

```bash
sudo apt update
sudo apt upgrade
```

## 为什么应用内更新会跳网页

可以这样理解：

- VS Code 检测到有新版本
- Linux 版通常不直接在应用内部替换自身
- 如果系统包管理器没有正确接管更新，就会跳转到官网下载页面
- 官方 `apt` 源配置好以后，更新交给 `apt` 处理

## 常用命令汇总

查看版本：

```bash
code --version
```

查看包来源：

```bash
apt policy code
```

刷新软件源：

```bash
sudo apt update
```

单独更新 VS Code：

```bash
sudo apt install --only-upgrade code -y
```

系统整体更新：

```bash
sudo apt upgrade
```
