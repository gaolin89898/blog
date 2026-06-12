---
tags:
  - 工具
  - rclone
description: rclone 连接 OpenList WebDAV 和夸克网盘的配置记录
---

# rclone

rclone 是一个命令行文件同步工具，可用于连接 OpenList WebDAV、对象存储、网盘和本地目录。

## Linux 配置

## 常用路径

本机 rclone：

```bash
/home/gl/桌面/tools/bin/rclone
```

本机 rclone 配置文件：

```bash
/home/gl/桌面/tools/rclone.conf
```

快捷上传命令：

```bash
/home/gl/桌面/tools/bin/upquark
```

## PATH 配置

已把工具目录加入 bash 和 fish：

```text
/home/gl/桌面/tools/bin
```

新开终端后可以直接使用：

```bash
rclone version
upquark ./文件.exe
```

如果当前终端还识别不到，手动刷新。

推荐安装 Obsidian 社区插件：

```text
CodeBlock Tabs
```

这个插件会把连续代码块显示成标签页，适合 Bash / Fish / PowerShell 这类命令切换。

```bash {'title':'Bash'}
source ~/.bashrc
```

```fish {'title':'Fish'}
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

## 查看版本

```bash
/home/gl/桌面/tools/bin/rclone version
```

## 查看 OpenList 根目录

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  lsd openlist:
```

## 查看夸克网盘目录

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  lsd "openlist:夸克网盘"
```

查看文件列表：

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  ls "openlist:夸克网盘/软件包"
```

## 上传单个文件

上传到默认发布目录：

```bash
/home/gl/桌面/tools/bin/upquark ./文件.exe
```

默认目标目录：

```text
夸克网盘/软件包/ai-workbench-releases
```

上传到指定目录：

```bash
/home/gl/桌面/tools/bin/upquark ./文件.exe "夸克网盘/软件包/其他目录"
```

## 使用 rclone 原生命令上传

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  copy -P ./文件.exe "openlist:夸克网盘/软件包/ai-workbench-releases"
```

说明：

- `copy`：只复制，不删除远端文件
- `-P`：显示上传进度
- `openlist:`：OpenList WebDAV remote
- `夸克网盘/...`：OpenList 里的挂载路径

## 上传整个文件夹

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  copy -P ./release "openlist:夸克网盘/软件包/ai-workbench-releases"
```

## 同步文件夹

同步本地目录到远端：

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  sync -P ./release "openlist:夸克网盘/软件包/ai-workbench-releases"
```

注意：

- `sync` 会让远端和本地保持一致
- 远端多出来的文件可能会被删除
- 日常上传发布包优先用 `copy`

## 下载文件

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  copy -P "openlist:夸克网盘/软件包/文件.exe" ./
```

## 删除远端文件

删除单个文件：

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  deletefile "openlist:夸克网盘/软件包/文件.exe"
```

删除空目录：

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  rmdir "openlist:夸克网盘/软件包/空目录"
```

## 创建远端目录

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  mkdir "openlist:夸克网盘/软件包/新目录"
```

## 常用检查命令

查看 remote：

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  listremotes
```

查看某个文件是否存在：

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  ls "openlist:夸克网盘/软件包/ai-workbench-releases"
```

查看目录占用：

```bash
/home/gl/桌面/tools/bin/rclone \
  --config /home/gl/桌面/tools/rclone.conf \
  --no-check-certificate \
  size "openlist:夸克网盘/软件包/ai-workbench-releases"
```

## 常见问题

### 证书过期

错误类似：

```text
tls: failed to verify certificate: x509: certificate has expired
```

临时处理：

```bash
--no-check-certificate
```

长期处理：

```text
续签 openlist.gaolin.xin 的 HTTPS 证书
```

### 上传到夸克网盘失败

如果 OpenList 后端到夸克网盘失败，需要检查：

- OpenList 的夸克 Cookie 是否过期
- 服务器 DNS 是否把 `ul-sz.pds.quark.cn` 解析到不可达的 `10.x`
- OpenList 日志：`/opt/openlist/data/log/log.log`

### 浏览器上传失败但 rclone 正常

浏览器上传容易受到页面、反向代理超时、网络中断影响。大文件上传优先使用：

```bash
/home/gl/桌面/tools/bin/upquark ./文件.exe
```
