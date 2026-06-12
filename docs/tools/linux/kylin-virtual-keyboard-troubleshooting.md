---
tags:
  - 工具
  - Linux
  - 麒麟系统
description: 时间：2026-04-09
---

# kylin-virtual-keyboard 启动排错记录

时间：2026-04-09

## Arch Linux + Sway 编译步骤

### 1) 安装系统依赖
```bash
sudo pacman -Sy
sudo pacman -S \
    cmake \
    qt6-base \
    qt6-declarative \
    qt6-tools \
    fcitx5 \
    fcitx5-qt \
    layer-shell-qt \
    gsettings-qt \
    kwayland \
    spdlog \
    pkgconf \
    wayland
```

### 2) 清理旧构建目录
```bash
rm -rf /home/gg/kylin-virtual-keyboard/build
mkdir /home/gg/kylin-virtual-keyboard/build
```

### 3) 配置 CMake（启用 Qt6 + Layer Shell）
```bash
cd /home/gg/kylin-virtual-keyboard/build
cmake .. -DCMAKE_INSTALL_PREFIX=/usr -DENABLE_QT6=ON -DENABLE_LAYER_SHELL=ON
```

### 4) 编译
```bash
make -j$(nproc)
```

### 5) 安装
```bash
sudo make install
sudo glib-compile-schemas /usr/share/glib-2.0/schemas/
```

### 6) 在 Sway 中运行
```bash
export QT_QPA_PLATFORM=wayland
kylin-virtual-keyboard
```

### 7) Sway 开机自启配置
在 `~/.config/sway/config` 添加：
```
exec_always --no-startup-id env QT_QPA_PLATFORM=wayland kylin-virtual-keyboard
```

---

## Debian/Ubuntu/openKylin 常用流程

### 0) 安装构建依赖
```bash
sudo apt update
sudo apt install \
  cmake make g++ pkg-config \
  libspdlog-dev \
  libkf5windowsystem-dev \
  qtbase5-dev qtdeclarative5-dev qtquickcontrols2-5-dev qml-module-qtquick-controls2 \
  qml-module-qtqml qml-module-qtquick2 \
  libgsettings-qt-dev \
  libfcitx5core-dev libfcit5-qt-dev
```

### 1) 编译
```bash
cd /path/to/kylin-virtual-keyboard
rm -rf build
mkdir build && cd build
cmake .. -DCMAKE_INSTALL_PREFIX=/usr
make -j"$(nproc)"
```

### 2) 安装
```bash
sudo make install
sudo glib-compile-schemas /usr/share/glib-2.0/schemas/
```

### 3) 启动
```bash
kylin-virtual-keyboard
```
