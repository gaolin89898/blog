---
tags:
  - 工具
  - rclone
description: 查看版本：
---

## 先检查是否已经安装

查看版本：

```bash
rclone version
```

如果系统里没有 `rclone`，也可以使用本机已安装好的版本：

```bash
/home/gl/桌面/tools/bin/rclone version
```

## Debian / Ubuntu 安装

使用系统仓库安装：

```bash
sudo apt update
sudo apt install -y rclone
```

如果当前环境不能使用 `sudo`，可以下载 deb 包后解包到用户目录：

```bash
mkdir -p /home/gl/桌面/tools/rclone-local /home/gl/桌面/tools/bin
cd /home/gl/桌面/tools/rclone-local
apt-get download rclone
dpkg-deb -x rclone_*.deb extract
cp extract/usr/bin/rclone /home/gl/桌面/tools/bin/rclone
chmod +x /home/gl/桌面/tools/bin/rclone
```

验证：

```bash
/home/gl/桌面/tools/bin/rclone version
```

## 当前本机配置

当前本机使用的是用户目录安装：

```text
/home/gl/桌面/tools/bin/rclone
```

配置文件位置：

```text
/home/gl/桌面/tools/rclone.conf
```

已配置的 remote：

```text
openlist
```

OpenList WebDAV 地址：

```text
https://openlist.gaolin.xin/dav/
```

已加入 PATH 的目录：

```text
/home/gl/桌面/tools/bin
```

所以新开终端后可以直接使用：

```bash
rclone version
upquark ./文件.exe
```

## 配置 PATH

推荐安装 Obsidian 社区插件：

```text
CodeBlock Tabs
```

这个插件会把连续代码块显示成标签页，适合 Bash / Fish / PowerShell 这类命令切换。

```bash {'title':'Bash'}
# 配置文件：~/.bashrc
export PATH="/home/gl/桌面/tools/bin:$PATH"

# 当前终端立即生效
source ~/.bashrc
```

```fish {'title':'Fish'}
# 配置文件：~/.config/fish/config.fish
fish_add_path /home/gl/桌面/tools/bin

# 当前终端立即生效
source ~/.config/fish/config.fish
```

说明：

- `CodeBlock Tabs` 主要在阅读模式生效
- 多个代码块中间不能夹普通文字，否则不会合并成 tab
- tab 标题使用 `{'title':'Bash'}` 这种格式

验证：

```bash
command -v rclone
command -v upquark
```

## 配置 OpenList WebDAV

交互式配置：

```bash
rclone config
```

配置项：

```text
name: openlist
type: webdav
url: https://openlist.gaolin.xin/dav/
vendor: other
user: OpenList 用户名
pass: OpenList 密码
```

如果使用本机指定配置文件：

```bash
/home/gl/桌面/tools/bin/rclone --config /home/gl/桌面/tools/rclone.conf config
```

## 测试连接

列出 OpenList 根目录：

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  lsd openlist:
```

正常可以看到：

```text
又拍云
夸克网盘
本机存储
```

## 证书说明

当前 `openlist.gaolin.xin` 的 HTTPS 证书已过期，所以命令里临时使用：

```bash
--no-check-certificate
```

证书续签完成后，可以去掉这个参数。
