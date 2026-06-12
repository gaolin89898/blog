---
tags:
  - 工具
  - SSH
  - Linux
description: 检查客户端：
---

# Linux SSH 配置

## 先检查是否已经安装

检查客户端：

```bash
ssh -V
```

检查服务端：

```bash
sshd -V
```

说明：

- 如果命令存在，说明对应组件大概率已经安装
- `sshd -V` 有时会把版本输出到标准错误，这是正常现象

## Debian / Ubuntu

安装客户端和服务端：

```bash
sudo apt update
sudo apt install -y openssh-client openssh-server
```

启动并设置开机自启：

```bash
sudo systemctl enable --now ssh
```

查看状态：

```bash
sudo systemctl status ssh
```

## CentOS / RHEL / Rocky / AlmaLinux

安装：

```bash
sudo dnf install -y openssh-clients openssh-server
```

如果系统较老，也可以使用：

```bash
sudo yum install -y openssh-clients openssh-server
```

启动并设置开机自启：

```bash
sudo systemctl enable --now sshd
```

查看状态：

```bash
sudo systemctl status sshd
```

## Fedora

安装：

```bash
sudo dnf install -y openssh-clients openssh-server
```

启动并设置开机自启：

```bash
sudo systemctl enable --now sshd
```

## Arch / Manjaro

安装：

```bash
sudo pacman -S --needed openssh
```

启动并设置开机自启：

```bash
sudo systemctl enable --now sshd
```

查看状态：

```bash
sudo systemctl status sshd
```

## openSUSE

安装：

```bash
sudo zypper install -y openssh
```

启动并设置开机自启：

```bash
sudo systemctl enable --now sshd
```

## 验证 SSH 是否可用

查看 SSH 端口是否监听：

```bash
ss -tlnp | grep ssh
```

或者：

```bash
sudo ss -tlnp | grep :22
```

本机测试连接：

```bash
ssh localhost
```

如果是第一次连接，会提示确认指纹，输入：

```text
yes
```

然后输入当前用户密码即可。

## 防火墙放行 22 端口

如果能启动但无法远程连接，通常要检查防火墙。

### UFW

```bash
sudo ufw allow ssh
sudo ufw reload
```

或者直接放行 22 端口：

```bash
sudo ufw allow 22/tcp
```

### firewalld

```bash
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```

### iptables

```bash
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

说明：

- `iptables` 规则重启后不一定保留
- 生产环境建议使用系统自带的持久化方案

## 常用配置文件

SSH 服务端配置文件通常是：

```text
/etc/ssh/sshd_config
```

修改配置后重启服务：

```bash
sudo systemctl restart ssh
```

或者：

```bash
sudo systemctl restart sshd
```

修改前建议先备份：

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
```

## 常见基础配置

### 修改端口

编辑：

```text
/etc/ssh/sshd_config
```

找到或添加：

```text
Port 22
```

例如改成：

```text
Port 2222
```

改完后别忘了同步放行新端口，并重启 SSH 服务。

### 禁止 root 直接登录

```text
PermitRootLogin no
```

### 禁止密码登录，只允许密钥登录

```text
PasswordAuthentication no
PubkeyAuthentication yes
```

注意：

- 在关闭密码登录前，必须先确认公钥登录已经可用
- 否则可能把自己锁在服务器外面

## 生成 SSH 密钥

如果你要免密登录服务器，可以在客户端生成密钥：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

生成后公钥通常在：

```text
~/.ssh/id_ed25519.pub
```

把公钥追加到服务器上的：

```text
~/.ssh/authorized_keys
```

也可以直接使用：

```bash
ssh-copy-id user@server-ip
```

## 常见问题排查

### 1. 服务启动失败

查看日志：

```bash
sudo journalctl -u ssh -xe
```

或：

```bash
sudo journalctl -u sshd -xe
```

### 2. 端口没监听

检查服务状态：

```bash
sudo systemctl status ssh
```

或：

```bash
sudo systemctl status sshd
```

### 3. 连接被拒绝

重点检查：

- SSH 服务是否已启动
- 22 端口或自定义端口是否放行
- 服务器安全组是否放行对应端口
- 目标 IP 是否正确

### 4. 修改配置后无法登录

建议先测试配置文件语法：

```bash
sudo sshd -t
```

语法无误后再重启服务：

```bash
sudo systemctl restart sshd
```

## 常用命令汇总

安装：

```bash
sudo apt install -y openssh-client openssh-server
sudo dnf install -y openssh-clients openssh-server
sudo pacman -S --needed openssh
```

启动：

```bash
sudo systemctl enable --now ssh
sudo systemctl enable --now sshd
```

连接：

```bash
ssh user@server-ip
```

复制文件到远程服务器：

```bash
scp local-file user@server-ip:/remote/path/
```

从远程服务器拉文件到本地：

```bash
scp user@server-ip:/remote/path/file .
```

## 建议

- 个人电脑通常安装客户端即可
- 服务器通常客户端和服务端都安装
- 公网服务器建议禁用 root 直登，并优先使用密钥登录
- 修改 SSH 配置前先备份配置文件
