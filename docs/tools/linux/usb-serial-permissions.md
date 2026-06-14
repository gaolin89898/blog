---
tags:
  - 工具
  - Linux
  - 串口
description: Linux USB 转串口设备权限配置速查
---

# Linux USB 串口权限速查

USB 转串口设备（`/dev/ttyUSB*`）默认只允许 `dialout` 组成员读写，普通用户直接打开会报 `Permission denied`。

## 方案一：加入 dialout 组（推荐）

Linux 系统管理串口权限的标准做法，永久生效。

```bash
whoami
sudo usermod -aG dialout $USER
```

执行完成后**注销并重新登录**，或重启系统，组权限才生效。

验证：

```bash
groups | grep dialout
```

## 方案二：udev 规则（针对特定设备）

适合给某个固定 USB 转串口设备单独放权，或在多用户机器上限定权限。

新建规则文件：

```bash
sudo nano /etc/udev/rules.d/99-usb-serial.rules
```

写入规则：

```text
KERNEL=="ttyUSB0", MODE="0666"
```

如果要限定到指定芯片，可加 vendor/product 过滤：

```text
KERNEL=="ttyUSB[0-9]*", ATTRS{idVendor}=="067b", ATTRS{idProduct}=="2303", MODE="0666"
```

重新加载规则：

```bash
sudo udevadm control --reload-rules
sudo udevadm trigger
```

重新插拔 USB 设备使规则生效。

## 排查

```bash
# 查看设备节点
ls -l /dev/ttyUSB*

# 查看 USB 设备 vendor/product
lsusb

# 查看设备所属组
stat -c '%U:%G %a' /dev/ttyUSB0
```

常见现象：

- `Permission denied`：用户未在 `dialout` 组，或 udev 规则未生效
- `usermod` 后仍无权限：未重新登录
- 设备节点不存在：驱动未加载或 USB 线接触不良
