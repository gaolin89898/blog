---
tags:
  - 后端
  - 服务器
  - 部署
description: sudo yum install -y yum-utils
---

## 准备环境

### 安装 Docker（已安装可跳过）

```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
```

### 测试 Docker 是否可用

```bash
sudo docker version
sudo docker info
```

## 2️⃣ 安装 NVIDIA Docker 支持

### 添加 NVIDIA repo

```bash
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.repo |sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo
sudo yum clean all
sudo yum install -y nvidia-container-toolkit  

sudo yum --setopt=proxy=http://192.168.1.200:8080 install -y nvidia-container-toolkit
  （无网络时走代理）
```

### 配置 Docker 支持 NVIDIA runtime

```bash
sudo vim /etc/docker/daemon.json <<'EOF'
{
"runtimes": {
"nvidia": {
"path":"nvidia-container-runtime",
"runtimeArgs": []
    }
  }
}
EOF
```

### 重载并重启 Docker

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 验证 runtime 是否生效

```bash
sudo docker info | grep -i runtime
# 应该看到：Runtimes: runc nvidia io.containerd.runc.v2
```

3️⃣ 导入镜像

```bash
sudo docker load -i xxx.tar/xxx.tar.gz
```

## 4️⃣ 创建容器目录和 docker-compose.yaml

### 创建容器

```bash
sudo docker run  -it  --name test_mjj --restart=always --gpus all  -p 8072:8077   -p 8882:8887  mjj_sf:latest
```

### 创建目录

```bash
mkdir -p ~/mjj_sf/config
cd ~/mjj_sf
```

### 写入 docker-compose.yaml

gitlab  [https://gitlab.singzer.cn/icepie/jsj-web-service/-/blob/main/docker-compose.yml?ref_type=heads](https://gitlab.singzer.cn/icepie/jsj-web-service/-/blob/main/docker-compose.yml?ref_type=heads)
---

## 5️⃣ 启动容器

```bash
sudo docker compose up -d
sudo docker compose ps
```

- 查看容器是否启动成功

6️⃣ 注意事项

1.无网络时：

```bash
安装 https://github.com/ginuerzh/gost 后进入文件
.\gost.exe -L http://:8080
然后执行 export http_proxy=[http://192.168.1.200:8080](http://192.168.1.200:8080/)
```
