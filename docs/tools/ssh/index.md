---
tags:
  - 工具
  - SSH
description: SSH 安装、连接和密钥配置速查
---

# SSH 速查

SSH 常用于远程登录服务器、传输文件，以及通过密钥访问 Git 仓库。

## Linux

### 安装

```bash
# Debian / Ubuntu
sudo apt update
sudo apt install -y openssh-client openssh-server

# CentOS / RHEL / Rocky / AlmaLinux / Fedora
sudo dnf install -y openssh-clients openssh-server

# Arch / Manjaro
sudo pacman -S --needed openssh
```

### 启动服务端

```bash
sudo systemctl enable --now ssh
# 或
sudo systemctl enable --now sshd
```

### 验证

```bash
ssh -V
sudo systemctl status ssh
ssh localhost
```

### 防火墙

```bash
sudo ufw allow ssh
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```

## Windows

### 检查

```powershell
ssh -V
Get-Service sshd
```

### 安装 OpenSSH

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

### 启动服务端

```powershell
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
Get-Service sshd
```

### 放行防火墙

```powershell
New-NetFirewallRule -Name sshd -DisplayName "OpenSSH Server (sshd)" -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

## 连接

| 用途 | 命令 |
| --- | --- |
| 默认端口连接 | `ssh user@server-ip` |
| 指定端口连接 | `ssh -p 2222 user@server-ip` |
| 使用配置别名 | `ssh myserver` |

第一次连接输入 `yes` 确认主机指纹。

## 传文件

| 用途 | 命令 |
| --- | --- |
| 上传文件 | `scp local-file user@server-ip:/remote/path/` |
| 下载文件 | `scp user@server-ip:/remote/path/file .` |

## 密钥登录

### 生成密钥

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

公钥位置：

```text
~/.ssh/id_ed25519.pub
```

Windows 通常在：

```text
C:\Users\你的用户名\.ssh\id_ed25519.pub
```

### 上传公钥

| 用途 | 命令 / 路径 |
| --- | --- |
| 自动上传公钥 | `ssh-copy-id user@server-ip` |
| 手动写入位置 | `~/.ssh/authorized_keys` |

也可以手动把公钥追加到服务器的 `~/.ssh/authorized_keys`。

## 配置文件

客户端配置：

```text
~/.ssh/config
```

Windows：

```text
C:\Users\你的用户名\.ssh\config
```

示例：

```text
Host myserver
    HostName 192.168.1.100
    User root
    Port 22
```

之后可直接用 `ssh myserver` 连接。

服务端配置：

```text
/etc/ssh/sshd_config
C:\ProgramData\ssh\sshd_config
```

修改后重启：

| 系统 | 命令 |
| --- | --- |
| Linux | `sudo systemctl restart sshd` |
| Windows | `Restart-Service sshd` |

## 常见排查

| 用途 | 命令 |
| --- | --- |
| 看版本 | `ssh -V` |
| Linux 看服务 | `sudo systemctl status sshd` |
| Windows 看服务 | `Get-Service sshd` |
| Linux 看端口 | `ss -tlnp \| grep :22` |
| Windows 看端口 | `netstat -ano \| findstr :22` |
| 测配置 | `sudo sshd -t` |
| 看日志 | `sudo journalctl -u sshd -xe` |

常见原因：

- SSH 服务没启动
- 端口或安全组没放行
- IP、用户、端口写错
- 公钥没写入 `authorized_keys`
- 禁用密码前没有确认密钥登录可用
