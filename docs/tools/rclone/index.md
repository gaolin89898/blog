---
tags:
  - 工具
  - rclone
description: rclone 连接 OpenList WebDAV 和夸克网盘速查
---

# rclone 速查

## 本机路径

```text
rclone：/home/gl/桌面/tools/bin/rclone
配置：/home/gl/桌面/tools/rclone.conf
快捷上传：/home/gl/桌面/tools/bin/upquark
默认目录：夸克网盘/软件包/ai-workbench-releases
```

工具目录已加入 PATH：

```text
/home/gl/桌面/tools/bin
```

## 验证

| 用途 | 命令 |
| --- | --- |
| 查看版本 | `rclone version` |
| 测试快捷上传 | `upquark ./文件.exe` |
| 查看 rclone 路径 | `command -v rclone` |
| 查看 upquark 路径 | `command -v upquark` |

如果当前终端未生效：

```bash
source ~/.bashrc
source ~/.config/fish/config.fish
```

## OpenList / 夸克

| 用途 | 命令 |
| --- | --- |
| 查看 OpenList 根目录 | `rclone --config /home/gl/桌面/tools/rclone.conf --no-check-certificate lsd openlist:` |
| 查看夸克网盘目录 | `rclone --config /home/gl/桌面/tools/rclone.conf --no-check-certificate lsd "openlist:夸克网盘"` |
| 查看软件包文件 | `rclone --config /home/gl/桌面/tools/rclone.conf --no-check-certificate ls "openlist:夸克网盘/软件包"` |

## 上传

| 用途 | 命令 |
| --- | --- |
| 上传到默认目录 | `upquark ./文件.exe` |
| 上传到指定目录 | `upquark ./文件.exe "夸克网盘/软件包/其他目录"` |
| rclone 原生命令 | `rclone --config /home/gl/桌面/tools/rclone.conf --no-check-certificate copy -P ./文件.exe "openlist:夸克网盘/软件包/ai-workbench-releases"` |

上传目录：

```bash
rclone --config /home/gl/桌面/tools/rclone.conf --no-check-certificate copy -P ./release "openlist:夸克网盘/软件包/ai-workbench-releases"
```

## 下载 / 删除 / 创建

| 用途 | 命令 |
| --- | --- |
| 下载文件 | `rclone --config /home/gl/桌面/tools/rclone.conf --no-check-certificate copy -P "openlist:夸克网盘/软件包/文件.exe" ./` |
| 删除文件 | `rclone --config /home/gl/桌面/tools/rclone.conf --no-check-certificate deletefile "openlist:夸克网盘/软件包/文件.exe"` |
| 创建目录 | `rclone --config /home/gl/桌面/tools/rclone.conf --no-check-certificate mkdir "openlist:夸克网盘/软件包/新目录"` |

谨慎使用：

```bash
rclone --config /home/gl/桌面/tools/rclone.conf --no-check-certificate sync -P ./release "openlist:夸克网盘/软件包/ai-workbench-releases"
```

`sync` 会删除远端多余文件，日常发布优先用 `copy`。

## 检查

| 用途 | 命令 |
| --- | --- |
| 查看 remote | `rclone --config /home/gl/桌面/tools/rclone.conf listremotes` |
| 查看目录占用 | `rclone --config /home/gl/桌面/tools/rclone.conf --no-check-certificate size "openlist:夸克网盘/软件包/ai-workbench-releases"` |

## 排查

- 证书过期：临时加 `--no-check-certificate`，长期续签 `openlist.gaolin.xin`
- 夸克上传失败：检查 OpenList 夸克 Cookie、DNS、OpenList 日志
- 日志路径：`/opt/openlist/data/log/log.log`
- 大文件上传优先用：`upquark ./文件.exe`
