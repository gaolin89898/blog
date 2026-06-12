---
tags:
  - 工具
  - Linux
  - 麒麟系统
description: kylin-virtual-keyboard 编译和启动速查
---

# kylin-virtual-keyboard 速查

## Arch / Sway

```bash
sudo pacman -Sy
sudo pacman -S cmake qt6-base qt6-declarative qt6-tools fcitx5 fcitx5-qt layer-shell-qt gsettings-qt kwayland spdlog pkgconf wayland
```

```bash
rm -rf /home/gg/kylin-virtual-keyboard/build
mkdir /home/gg/kylin-virtual-keyboard/build
cd /home/gg/kylin-virtual-keyboard/build
cmake .. -DCMAKE_INSTALL_PREFIX=/usr -DENABLE_QT6=ON -DENABLE_LAYER_SHELL=ON
make -j$(nproc)
sudo make install
sudo glib-compile-schemas /usr/share/glib-2.0/schemas/
```

运行：

```bash
export QT_QPA_PLATFORM=wayland
kylin-virtual-keyboard
```

Sway 自启：

```text
exec_always --no-startup-id env QT_QPA_PLATFORM=wayland kylin-virtual-keyboard
```

## Debian / Ubuntu / openKylin

```bash
sudo apt update
sudo apt install cmake make g++ pkg-config libspdlog-dev libkf5windowsystem-dev qtbase5-dev qtdeclarative5-dev qtquickcontrols2-5-dev qml-module-qtquick-controls2 qml-module-qtqml qml-module-qtquick2 libgsettings-qt-dev libfcitx5core-dev libfcit5-qt-dev
```

```bash
cd /path/to/kylin-virtual-keyboard
rm -rf build
mkdir build && cd build
cmake .. -DCMAKE_INSTALL_PREFIX=/usr
make -j"$(nproc)"
sudo make install
sudo glib-compile-schemas /usr/share/glib-2.0/schemas/
kylin-virtual-keyboard
```
