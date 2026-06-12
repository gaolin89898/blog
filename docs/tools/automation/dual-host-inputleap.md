---
tags:
  - 工具
  - InputLeap
  - 自动化
description: 双主机双显示器切换速查
---

# 双主机 + InputLeap 速查

目标：

- 副机模式：副屏切 HDMI，主机只用主屏
- 主机模式：副屏切 VGA，主机恢复双屏
- 键鼠共享：InputLeap

## 输入源切换

副屏为 `ddcutil Display 2`：

```bash
ddcutil --display 2 setvcp 60 0x11  # HDMI-1
ddcutil --display 2 setvcp 60 0x01  # VGA-1
```

## 显示布局

输出名以 `xrandr` 实际结果为准：

```bash
xrandr

# 单屏
xrandr --output HDMI-1 --auto --output DP-1 --off

# 双屏扩展
xrandr --output HDMI-1 --auto --output DP-1 --auto --right-of HDMI-1
```

## 一键脚本

```bash
#!/bin/bash

export DISPLAY=:0
export XAUTHORITY=$HOME/.Xauthority

MAIN=$(xrandr | grep " connected" | grep HDMI | awk '{print $1}')
SUB=$(xrandr | grep " connected" | grep DP | awk '{print $1}')

case "$1" in
  hdmi)
    ddcutil --display 2 setvcp 60 0x11
    sleep 0.5
    xrandr --output "$SUB" --off --output "$MAIN" --auto
    ;;
  vga)
    xrandr --output "$SUB" --auto
    sleep 0.5
    ddcutil --display 2 setvcp 60 0x01
    sleep 0.5
    xrandr --output "$MAIN" --auto --output "$SUB" --right-of "$MAIN"
    ;;
  toggle)
    current=$(ddcutil --display 2 getvcp 60 | grep -oP 'sl=\K[0-9]+')
    [ "$current" = "17" ] && "$0" vga || "$0" hdmi
    ;;
  *)
    echo "用法: $0 [hdmi|vga|toggle]"
    ;;
esac
```

## 排查

- `xrandr` 找不到输出：先确认实际输出名，如 `HDMI-A-1`、`DP-1`
- `ddcutil Display not found`：先 `xrandr --output DP-1 --auto` 再切输入源
- InputLeap 不通：检查两端 IP、网段、防火墙、端口
- 开 VM 后不通：检查 VMware 虚拟网卡、路由优先级、NAT / 桥接模式
- 下载或 TLS 失败：检查 `http_proxy`、`https_proxy`、`all_proxy`、`no_proxy`
