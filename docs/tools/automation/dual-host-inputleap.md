---
tags:
  - 工具
  - InputLeap
  - 自动化
description: 实现一键切换：
---

# 双主机 + 双显示器 + InputLeap 工作流汇总（无成本版）

## 0. 设备与目标

### 设备情况
- 主屏：AOC 24B30HM（HDMI，对应 xrandr 输出通常为 HDMI-*）
- 副屏：AOC 22B1WG5（DP，对应 xrandr 输出通常为 DP-*）
- 主机视频：通过 **VGA** 输出到副屏
- 副机视频：通过 **HDMI** 输出到副屏
- 键鼠共享：InputLeap

### 目标
实现一键切换：

1) **副机模式（HDMI）**
- 副屏切到 HDMI（副机）
- 主机只使用主屏（单屏）

2) **主机模式（VGA）**
- 副屏切回 VGA（主机）
- 主机恢复双屏扩展

---

## 1. 显示器输入源切换（ddcutil）

副屏（ddcutil Display 2）输入源（VCP 0x60）：

```bash
ddcutil --display 2 setvcp 60 0x11  # HDMI-1
ddcutil --display 2 setvcp 60 0x01  # VGA-1
```

说明：
- `ddcutil` 使用 I2C/Display 编号（Display 1/2）
- `xrandr` 使用 DRM 输出名（如 HDMI-A-1、DP-1；或 HDMI-1、DP-1，取决于驱动/环境）

---

## 2. 显示布局控制（xrandr）

示例（输出名以实际 `xrandr` 为准）：

```bash
# 单屏（主机只用主屏）
xrandr --output HDMI-1 --auto --output DP-1 --off

# 双屏扩展（副屏在主屏右侧）
xrandr --output HDMI-1 --auto --output DP-1 --auto --right-of HDMI-1
```

---

## 3. 最终脚本（主/副机一键切换）

> 脚本要点：
> - 切到 VGA 前，先把副屏 output 打开，否则可能导致 ddcutil 找不到 Display。

```bash
#!/bin/bash

export DISPLAY=:0
export XAUTHORITY=$HOME/.Xauthority

MAIN=$(xrandr | grep " connected" | grep HDMI | awk '{print $1}')
SUB=$(xrandr | grep " connected" | grep DP | awk '{print $1}')

case "$1" in
  hdmi)
    echo "副机模式：单屏"

    # 切副机
    ddcutil --display 2 setvcp 60 0x11
    sleep 0.5

    # 关闭副屏
    xrandr --output "$SUB" --off \
           --output "$MAIN" --auto
    ;;

  vga)
    echo "主机模式：双屏"

    # 先恢复副屏（关键）
    xrandr --output "$SUB" --auto
    sleep 0.5

    # 切回主机
    ddcutil --display 2 setvcp 60 0x01
    sleep 0.5

    # 扩展
    xrandr --output "$MAIN" --auto \
           --output "$SUB" --right-of "$MAIN"
    ;;

  toggle)
    current=$(ddcutil --display 2 getvcp 60 | grep -oP 'sl=\\K[0-9]+')

    if [ "$current" = "17" ]; then
      $0 vga
    else
      $0 hdmi
    fi
    ;;

  *)
    echo "用法: $0 [hdmi|vga|toggle]"
    ;;
esac
```

---

## 4. InputLeap 安装/使用问题记录（2026-04-09）

### 4.1 问题概览
InputLeap 过程中主要遇到两类问题：

1. **网络问题**：代理/网络配置影响依赖下载与访问。
2. **VM 影响联通**：启用虚拟机（VMware 等）后，虚拟网卡与 NAT/桥接设置影响两端互通。

### 4.2 网络问题（代理/访问失败）
- 现象：访问站点/下载依赖失败、TLS 连接异常、仓库更新报错等。
- 处理思路：
  - 检查环境变量代理：`http_proxy / https_proxy / all_proxy / no_proxy`
  - 必要时临时关闭代理再安装/更新
  - 将目标域名加入 `NO_PROXY` 直连列表（若代理导致 TLS 失败）

### 4.3 VM 影响两边联通（虚拟网卡/NAT/桥接）
- 现象：InputLeap 需要两台设备互通，但开启 VM 后路由/网段变化，导致互 ping 不通或端口不通。
- 常见原因：
  - VMware 虚拟网卡（vmnet8/vmnet1）改变路由优先级
  - NAT/Host-only/桥接模式不合适
  - 防火墙/端口转发未放行
- 处理思路：
  - 检查两端 IP/网段与路由表是否被虚拟网卡“抢走”
  - 视需求切换 VM 网络模式（桥接更像同一局域网）
  - 临时关闭 VM 网络/虚拟网卡验证是否恢复联通

---

## 5. 常见问题（显示切换）

### 5.1 xrandr 找不到输出
原因：输出名不匹配。

解决：
```bash
xrandr
```
确认实际输出名（HDMI-A-1/DP-1 或 HDMI-1/DP-1）。

### 5.2 ddcutil 报错 Display not found
原因：副屏 output 被关闭后，I2C/DDC 可能无法访问。

解决：
- 先 `xrandr --output DP-1 --auto`（或你的 SUB 输出名）
- 再执行 `ddcutil` 切输入源

---

## 6. 总结
- 用 `ddcutil + xrandr` 实现“软件级”双主机/双显示器切换
- 用 InputLeap 实现键鼠共享
- 注意代理与 VM 虚拟网卡对网络互通的影响
