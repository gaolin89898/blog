---
tags:
  - 工具
  - SSH
description: SSH 安装、连接和密钥配置速查
---

# SSH 速查

SSH 常用于远程登录服务器、传输文件，以及通过密钥访问 Git 仓库。

## 安装与启动

::: tabs
== Linux

```bash
# Debian / Ubuntu
sudo apt update
sudo apt install -y openssh-client openssh-server
sudo systemctl enable --now ssh
sudo systemctl status ssh
ssh localhost

# RHEL / Rocky / AlmaLinux / Fedora / Arch / Manjaro
sudo dnf install -y openssh-clients openssh-server
# Arch / Manjaro: sudo pacman -S --needed openssh
sudo systemctl enable --now sshd
sudo systemctl status sshd
ssh localhost
```

== Windows

```powershell
ssh -V
Get-Service sshd

Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
Get-Service sshd
```

:::

## 防火墙

::: tabs
== Linux

```bash
# Debian / Ubuntu
sudo ufw allow ssh

# RHEL / Rocky / Fedora
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```

== Windows

```powershell
New-NetFirewallRule -Name sshd -DisplayName "OpenSSH Server (sshd)" -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

:::

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

::: tabs
== Linux / macOS

```text
~/.ssh/id_ed25519.pub
```

== Windows

```text
C:\Users\你的用户名\.ssh\id_ed25519.pub
```

:::

### 上传公钥

| 用途 | 命令 / 路径 |
| --- | --- |
| 自动上传公钥 | `ssh-copy-id user@server-ip` |
| 手动写入位置 | `~/.ssh/authorized_keys` |

也可以手动把公钥追加到服务器的 `~/.ssh/authorized_keys`。

## 配置文件

客户端配置：

::: tabs
== Linux / macOS

```text
~/.ssh/config
```

== Windows

```text
C:\Users\你的用户名\.ssh\config
```

:::

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

::: tabs
== Linux

```bash
sudo systemctl restart sshd
```

== Windows

```powershell
Restart-Service sshd
```

:::

## 常见排查

| 用途 | 命令 |
| --- | --- |
| 看版本 | `ssh -V` |
| 测配置 | `sudo sshd -t` |
| 看日志 | `sudo journalctl -u sshd -xe` |

服务与端口：

::: tabs
== Linux

```bash
sudo systemctl status sshd
ss -tlnp | grep :22
```

== Windows

```powershell
Get-Service sshd
netstat -ano | findstr :22
```

:::

常见原因：

- SSH 服务没启动
- 端口或安全组没放行
- IP、用户、端口写错
- 公钥没写入 `authorized_keys`
- 禁用密码前没有确认密钥登录可用
