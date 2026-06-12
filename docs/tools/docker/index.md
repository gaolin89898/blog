---
tags:
  - 工具
  - Docker
description: Docker 安装、配置和常用命令速查
---

# Docker 速查

## 安装

```bash
# Debian / Ubuntu 简单安装
sudo apt update
sudo apt install -y docker.io docker-compose-plugin

# RHEL / Rocky / Fedora
sudo dnf install -y dnf-plugins-core
sudo dnf install -y docker docker-compose-plugin

# Arch / Manjaro
sudo pacman -S --needed docker docker-compose
```

官方源安装：

```bash
curl -fsSL https://get.docker.com | sudo sh
```

## 启动

```bash
sudo systemctl enable --now docker
sudo systemctl status docker
docker --version
docker compose version
```

普通用户使用 Docker：

```bash
sudo usermod -aG docker $USER
newgrp docker
docker run hello-world
```

## 镜像和容器

| 用途 | 命令 |
| --- | --- |
| 拉取镜像 | `docker pull nginx` |
| 查看镜像 | `docker images` |
| 启动容器 | `docker run -d --name my-nginx -p 8080:80 nginx` |
| 查看运行中容器 | `docker ps` |
| 查看全部容器 | `docker ps -a` |
| 查看日志 | `docker logs my-nginx` |
| 停止容器 | `docker stop my-nginx` |
| 删除容器 | `docker rm my-nginx` |
| 删除镜像 | `docker rmi nginx` |

## Compose

| 用途 | 命令 |
| --- | --- |
| 后台启动 | `docker compose up -d` |
| 查看服务 | `docker compose ps` |
| 查看日志 | `docker compose logs -f` |
| 停止并移除 | `docker compose down` |

## 镜像加速

编辑：

```text
/etc/docker/daemon.json
```

示例：

```json
{
  "registry-mirrors": ["https://docker.m.daocloud.io"]
}
```

重启：

```bash
sudo systemctl restart docker
docker info
```

## 数据建议

```bash
# 使用卷或目录挂载，别只把数据放容器内部
docker run -d -v /data/app:/app/data nginx
```

## 排查

```bash
docker --version
docker compose version
sudo systemctl status docker
sudo systemctl start docker
docker info
```

常见问题：

- `docker: command not found`：未安装或 PATH 未生效
- `Cannot connect to the Docker daemon`：Docker 服务没启动
- 权限不足：把用户加入 `docker` 组后重新登录
- 拉镜像慢：检查网络或配置镜像加速
- `docker compose` 不存在：安装 `docker-compose-plugin`
