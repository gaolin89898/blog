---
tags:
  - 工具
  - Docker
  - Linux
description: 检查 Docker 客户端：
---

# Linux Docker 配置

## 先检查是否已经安装

检查 Docker 客户端：

```bash
docker --version
```

检查 Docker Compose 插件：

```bash
docker compose version
```

检查服务状态：

```bash
sudo systemctl status docker
```

如果 `docker --version` 没有输出版本号，说明 Docker 还没有安装。

## 安装前准备

先卸载系统里可能已有的旧版本：

### Debian / Ubuntu

```bash
sudo apt remove -y docker docker-engine docker.io containerd runc
```

### CentOS / RHEL / Rocky / AlmaLinux

```bash
sudo dnf remove -y docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
```

## Debian / Ubuntu 安装 Docker

更新软件包索引并安装依赖：

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
```

创建 GPG key 目录：

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

下载 Docker 官方 GPG key：

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

添加官方仓库：

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

安装 Docker：

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Debian 系也可用 docker.io

如果你更想用系统仓库版本，也可以直接安装：

```bash
sudo apt update
sudo apt install -y docker.io
```

说明：

- `docker.io` 更简单
- 官方仓库版本通常更新更快

## CentOS / RHEL / Rocky / AlmaLinux 安装 Docker

安装 `dnf` 插件：

```bash
sudo dnf install -y dnf-plugins-core
```

添加 Docker 官方仓库：

```bash
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

安装 Docker：

```bash
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Fedora 安装 Docker

添加官方仓库：

```bash
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
```

安装：

```bash
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Arch / Manjaro 安装 Docker

安装：

```bash
sudo pacman -S --needed docker docker-compose
```

## openSUSE 安装 Docker

安装：

```bash
sudo zypper install -y docker docker-compose
```

## 启动 Docker 服务

安装完成后启动并设置开机自启：

```bash
sudo systemctl enable --now docker
```

查看状态：

```bash
sudo systemctl status docker
```

## 验证 Docker 是否可用

查看版本：

```bash
docker --version
docker compose version
```

运行测试容器：

```bash
sudo docker run hello-world
```

如果输出 `Hello from Docker!`，说明 Docker 安装成功。

## 允许普通用户使用 Docker

默认情况下，Docker 命令通常需要 `sudo`。

把当前用户加入 `docker` 组：

```bash
sudo usermod -aG docker $USER
```

然后重新登录终端，或者执行：

```bash
newgrp docker
```

之后再测试：

```bash
docker run hello-world
```

## 配置镜像加速

国内环境下拉取镜像可能较慢，可以配置镜像加速。

创建或编辑：

```text
/etc/docker/daemon.json
```

示例：

```json
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io"
  ]
}
```

修改后重启 Docker：

```bash
sudo systemctl restart docker
```

查看当前信息：

```bash
docker info
```

## 常用命令

拉取镜像：

```bash
docker pull nginx
```

查看本地镜像：

```bash
docker images
```

启动容器：

```bash
docker run -d --name my-nginx -p 8080:80 nginx
```

查看容器：

```bash
docker ps
docker ps -a
```

停止容器：

```bash
docker stop my-nginx
```

删除容器：

```bash
docker rm my-nginx
```

删除镜像：

```bash
docker rmi nginx
```

## Docker Compose

现在常用的是 `docker compose` 子命令，不是旧的 `docker-compose`。

检查版本：

```bash
docker compose version
```

启动当前目录下的服务：

```bash
docker compose up -d
```

停止并移除：

```bash
docker compose down
```

## 常见问题排查

### 1. `docker: command not found`

说明 Docker 没装好，或者路径没有生效。

先检查：

```bash
docker --version
```

### 2. `Cannot connect to the Docker daemon`

通常说明 Docker 服务没启动。

检查并启动：

```bash
sudo systemctl status docker
sudo systemctl start docker
```

### 3. 普通用户执行 Docker 提示权限不足

把用户加入 `docker` 组：

```bash
sudo usermod -aG docker $USER
```

然后重新登录。

### 4. 拉镜像很慢

重点检查：

- 网络环境
- 是否配置镜像加速
- 仓库源是否可访问

### 5. `docker compose` 不可用

说明 Compose 插件没装。

Debian / Ubuntu 官方仓库安装方式一般是：

```bash
sudo apt install -y docker-compose-plugin
```

## 卸载 Docker

### Debian / Ubuntu

```bash
sudo apt remove -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker.io
```

### CentOS / RHEL / Rocky / AlmaLinux

```bash
sudo dnf remove -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Arch / Manjaro

```bash
sudo pacman -Rns docker docker-compose
```

## 建议

- 开发机上建议同时安装 `docker compose`
- 能用普通用户跑 Docker 时，日常操作会更方便
- 如果是生产环境，修改 `daemon.json` 前先备份
- 容器方便，但不要把重要数据只放在容器内部而不做卷挂载或备份
