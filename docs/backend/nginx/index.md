---
sticky: 2
description: Nginx 部署流程与 HTTPS 配置指南，涵盖安装、证书与配置
---

# Nginx 部署流程与 HTTPS 配置指南

本文档介绍如何在 Linux 服务器上部署 Nginx，并配置阿里云 SSL 证书实现全站 HTTPS。

## 1. 安装 Nginx

根据你的服务器操作系统选择对应的安装命令。

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install nginx
```

### CentOS/RHEL
```bash
sudo yum install epel-release
sudo yum install nginx
```

安装完成后，启动并设置开机自启：
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 2. 阿里云 SSL 证书申请与下载

### 2.1 申请证书
1. 登录 [阿里云数字证书管理服务控制台](https://yundun.console.aliyun.com/?p=cas)。
2. 选择 **SSL 证书** -> **免费证书** (每年有 20 个免费额度)。
3. 点击 **立即购买** -> **支付** (0元)。
4. 点击 **证书申请**，填写域名、个人信息，并选择 **DNS 验证**。
5. 在域名解析控制台添加对应的 TXT 记录。
6. 等待审核通过（通常几分钟）。

### 2.2 下载证书
1. 在证书列表页面，找到已签发的证书，点击 **下载**。
2. 在弹出的窗口中，找到 **Nginx** 选项，点击下载。
3. 下载后你会得到一个 `.zip` 文件，解压后包含：
   - `domain_name.pem` (证书文件)
   - `domain_name.key` (私钥文件)

## 3. Nginx HTTPS 配置

### 3.1 上传证书
建议将证书上传到 `/etc/nginx/cert` 目录下：
```bash
sudo mkdir -p /etc/nginx/cert
# 使用 scp 或 SFTP 将 pem 和 key 文件上传至该目录
```

### 3.2 编写配置文件
建议为你的站点单独创建一个配置文件 `/etc/nginx/conf.d/blog.conf`：

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # 强制将 HTTP 请求转发到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    # 证书配置
    ssl_certificate cert/yourdomain.com.pem;
    ssl_certificate_key cert/yourdomain.com.key;

    # SSL 优化配置
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    # 静态文件根目录
    root /var/www/blog/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 开启 Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## 4. 验证与重启

在修改完配置后，务必先检查语法是否正确：
```bash
sudo nginx -t
```

如果显示 `syntax is ok` 和 `test is successful`，则重启 Nginx：
```bash
sudo systemctl reload nginx
```

## 5. 安全组配置

别忘了在阿里云控制台的 **安全组** 规则中，开放以下端口：
- **80** (HTTP)
- **443** (HTTPS)

## 常见问题

- **403 Forbidden**：检查 `/var/www/blog/dist` 目录的权限，确保 nginx 用户有权访问。
- **证书不匹配**：确保证书文件路径正确，且域名与配置文件中的 `server_name` 一致。
- **无法访问 443**：检查服务器防火墙（如 `ufw` 或 `firewalld`）是否也放行了端口。
