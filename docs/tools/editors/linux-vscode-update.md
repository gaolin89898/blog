---
tags:
  - 工具
  - VSCode
  - Linux
description: Linux VS Code apt 更新速查
---

# Linux VS Code 更新

结论：Linux 版 VS Code 建议交给系统包管理器更新，不手动下载 `.deb`。

当前确认：

```text
源：https://packages.microsoft.com/repos/code
版本：1.124.2
记录：1.124.0-1781066808 -> 1.124.2-1781225536
```

## 检查

```bash
which code
code --version
apt policy code
```

如果 `apt policy code` 里有 `packages.microsoft.com/repos/code`，说明已接入官方源。

## 添加官方 apt 源

```bash
sudo apt update
sudo apt install -y wget gpg apt-transport-https
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /usr/share/keyrings/microsoft.gpg > /dev/null
```

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

```bash
sudo apt update
sudo apt install -y code
```

## 更新

```bash
# 只更新 VS Code
sudo apt update
sudo apt install --only-upgrade code -y

# 或随系统一起更新
sudo apt update
sudo apt upgrade
```

应用内“更新”跳网页时，直接用上面的 `apt` 命令即可。
