---
tags:
  - 后端
  - 服务器
  - 部署
  - Docker
description: SDV 容器在 ARM 宿主机上更新前端 dist 和后端二进制速查
---

# SDV 前后端文件更新

在 ARM 宿主机上对 Docker 容器 `sdv-app` 进行前后端发布的标准流程。

::: tip 约定
- 宿主机入口：先把文件上传到 `/tmp`，不要落到 `/root`
- 容器名：`sdv-app`
- 容器内前端目录：`/root/dist`
- 容器内后端可执行文件：`/server/smart-doc-vault`
:::

## 前端更新（dist）

### 1) 上传

```powershell
scp -r .\dist ARM_USER@ARM_IP:/tmp/dist
```

| 参数 | 含义 |
| --- | --- |
| `-r` | 递归复制目录 |
| `.\dist` | 本地前端打包目录 |
| `ARM_USER@ARM_IP:/tmp/dist` | 远程 ARM 宿主机目标路径 |

### 2) 更新

```bash
sudo docker exec sdv-app sh -lc 'rm -rf /root/dist/*'
sudo docker cp /tmp/dist/. sdv-app:/root/dist/
sudo docker restart sdv-app
```

关键点：

- `rm -rf /root/dist/*` 只清空目录内容，不删除目录本身
- `docker cp /tmp/dist/. ...` 结尾的 `/.` 表示复制“目录内容”；写成 `/tmp/dist` 会变成 `/root/dist/dist`
- `docker restart` 触发服务重新加载静态文件

### 3) 验证

```bash
sudo docker exec sdv-app ls -lah /root/dist | head -n 30
curl -s http://127.0.0.1:81/index.html | head -n 20
```

`curl` 在服务器本机请求，可以排除浏览器缓存干扰。

## 后端更新（smart-doc-vault）

### 1) 上传

```powershell
scp ./smart-doc-vault suma@192.168.1.101:/tmp/
```

本地文件名可以不是 `smart-doc-vault`，下一步用变量指定即可。

### 2) 更新

```bash
# 改成你上传后的实际文件名
BACKEND_SRC=/tmp/smart-doc-vault

sudo docker exec sdv-app sh -lc 'cp /server/smart-doc-vault /server/smart-doc-vault.bak'
sudo docker cp "$BACKEND_SRC" sdv-app:/server/smart-doc-vault
sudo docker exec sdv-app chmod +x /server/smart-doc-vault
sudo docker restart sdv-app
```

关键点：

- 先在容器内备份旧后端为 `.bak`，方便回滚
- `chmod +x` 防止 `Permission denied`
- `docker restart` 加载新二进制

### 3) 验证

```bash
sudo docker logs --tail 100 sdv-app
curl -s http://127.0.0.1:8888/ | head -n 20
```

## 回滚后端

```bash
docker cp sdv-app:/server/smart-doc-vault.bak /tmp/smart-doc-vault.bak
docker cp /tmp/smart-doc-vault.bak sdv-app:/server/smart-doc-vault
docker exec sdv-app chmod +x /server/smart-doc-vault
docker restart sdv-app
```

## 常见问题

| 现象 | 排查 |
| --- | --- |
| 前端更新后页面没变化 | `curl` 服务器本机若已是新内容，是浏览器缓存，`Ctrl + F5` |
| 容器里出现 `/root/dist/dist` | 复制命令漏了 `/.`，应写 `docker cp /tmp/dist/. sdv-app:/root/dist/` |
| 后端容器重启失败 | 多半是架构不匹配（如 x86 二进制放到 ARM）；`docker logs --tail 100 sdv-app` |
| 后端启动报权限 | 漏了 `chmod +x /server/smart-doc-vault` |
