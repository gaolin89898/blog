---
tags:
  - 工具
  - SSH
  - Windows
description: 打开 PowerShell 或 CMD，执行：
---

# Windows SSH 配置

## 先检查是否已经安装

打开 `PowerShell` 或 `CMD`，执行：

```powershell
ssh -V
```

如果输出版本号，说明 SSH 客户端已经安装。

检查 SSH 服务端：

```powershell
Get-Service sshd
```

如果提示找不到服务，说明 SSH Server 还没有安装。

## 方式一：使用 Windows 自带 OpenSSH

Windows 10 和 Windows 11 通常自带 OpenSSH 客户端，可选安装 OpenSSH 服务端。

### 检查客户端能力

在 PowerShell 中执行：

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Client*'
```

如果状态是 `Installed`，说明客户端已经装好。

### 安装 OpenSSH 客户端

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

安装完成后验证：

```powershell
ssh -V
```

### 检查服务端能力

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Server*'
```

### 安装 OpenSSH 服务端

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

## 启动 SSH 服务端

安装服务端后，启动 `sshd`：

```powershell
Start-Service sshd
```

设置开机自启：

```powershell
Set-Service -Name sshd -StartupType Automatic
```

查看状态：

```powershell
Get-Service sshd
```

## 检查防火墙规则

Windows 一般会自动添加规则，但最好确认一下：

```powershell
Get-NetFirewallRule -Name *ssh*
```

如果没有合适的入站规则，可以手动放行 22 端口：

```powershell
New-NetFirewallRule -Name sshd -DisplayName "OpenSSH Server (sshd)" -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

## 方式二：通过“设置”图形界面安装

适合不想用命令行的人。

路径通常是：

```text
设置 -> 应用 -> 可选功能
```

然后：

1. 点击“查看功能”
2. 搜索 `OpenSSH Client` 或 `OpenSSH Server`
3. 选择后安装

安装后再回到 PowerShell 中验证：

```powershell
ssh -V
Get-Service sshd
```

## 验证 SSH 是否可用

### 验证客户端

测试本机是否能调用 SSH：

```powershell
ssh user@server-ip
```

第一次连接会提示确认主机指纹，输入：

```text
yes
```

然后输入密码即可。

### 验证服务端

检查 22 端口是否监听：

```powershell
netstat -ano | findstr :22
```

或者：

```powershell
Get-NetTCPConnection -LocalPort 22
```

也可以在本机测试：

```powershell
ssh localhost
```

## SSH 配置文件位置

### 客户端配置

当前用户目录下：

```text
C:\Users\你的用户名\.ssh\config
```

例如：

```text
C:\Users\gl\.ssh\config
```

### 服务端配置

通常在：

```text
C:\ProgramData\ssh\sshd_config
```

修改后重启服务：

```powershell
Restart-Service sshd
```

## 常见客户端配置

编辑：

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

配置后可以直接连接：

```powershell
ssh myserver
```

## 生成 SSH 密钥

在 PowerShell 中执行：

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

默认会生成到：

```text
C:\Users\你的用户名\.ssh\
```

常见文件：

- 私钥：`id_ed25519`
- 公钥：`id_ed25519.pub`

查看公钥内容：

```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

然后把公钥添加到目标服务器的：

```text
~/.ssh/authorized_keys
```

## 使用 scp 传输文件

上传文件到 Linux 服务器：

```powershell
scp .\local-file.txt user@server-ip:/remote/path/
```

从 Linux 服务器下载文件到本地：

```powershell
scp user@server-ip:/remote/path/file.txt .
```

## 在 Git 中使用 SSH

先检查 Git 是否安装：

```powershell
git --version
```

测试 SSH 连通性：

```powershell
ssh -T git@github.com
```

如果你使用 GitHub、GitLab 或 Gitee，一般都需要先把本机公钥添加到对应平台账户中。

## 常见问题排查

### 1. `ssh` 命令找不到

先检查：

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Client*'
```

如果没有安装，就先安装客户端。

### 2. `sshd` 服务启动失败

查看服务状态：

```powershell
Get-Service sshd
```

查看 OpenSSH 日志，可以在“事件查看器”中检查相关错误。

### 3. 22 端口没有监听

确认：

- OpenSSH Server 已安装
- `sshd` 服务已经启动
- 配置文件没有写错

检查端口：

```powershell
netstat -ano | findstr :22
```

### 4. 无法从其他机器连接 Windows

重点检查：

- `sshd` 服务是否运行
- Windows 防火墙是否放行 22 端口
- 当前网络环境是否允许入站连接
- 路由器或安全组是否限制了连接

### 5. 修改配置后无法连接

修改 `sshd_config` 后，建议先备份原文件。

修改完成后执行：

```powershell
Restart-Service sshd
```

如果服务重启失败，优先检查配置文件内容是否有误。

## 常用命令汇总

安装客户端：

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

安装服务端：

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

启动服务端：

```powershell
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
```

查看状态：

```powershell
Get-Service sshd
```

连接远程服务器：

```powershell
ssh user@server-ip
```

上传文件：

```powershell
scp .\local-file.txt user@server-ip:/remote/path/
```

生成密钥：

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

## 建议

- 普通开发或运维使用，安装 OpenSSH 客户端通常就够了
- 如果你要远程登录 Windows 机器，再安装 OpenSSH 服务端
- 优先使用密钥登录，不要长期只依赖密码登录
- 改动服务端配置前，先备份 `sshd_config`
