---
tags:
  - 工具
  - Linux
  - LoongArch
description: LoongArch 上 Go、esbuild、Vite 构建修复速查
---

# LoongArch 构建速查

适用：

- 需要 Go 编译 esbuild
- Vite 报 `esbuild host/binary version mismatch`
- `vite build` 报 Node OOM
- Electron 下载或打包失败

## 检查

```bash
uname -m
which -a go
node -v
pnpm -v
```

## Go

当前使用：

```text
/opt/go/bin/go
```

全局生效：

```bash
echo 'export PATH=/opt/go/bin:$PATH' | sudo tee /etc/profile.d/go.sh
sudo chmod 644 /etc/profile.d/go.sh
source /etc/profile.d/go.sh
hash -r
go version
```

## esbuild

版本必须和项目依赖完全一致：

```bash
cd ~/下载
rm -rf esbuild-src
git clone https://github.com/evanw/esbuild.git esbuild-src
cd esbuild-src
git checkout v0.18.20
make
./esbuild --version
sudo install -m 0755 esbuild /usr/local/bin/esbuild-0.18.20
```

构建时指定：

```bash
export ESBUILD_BINARY_PATH=/usr/local/bin/esbuild-0.18.20
pnpm build
```

## Node OOM

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

## Electron

```bash
ELECTRON_MIRROR=https://ftp.loongnix.cn/electron/LoongArch/ electron_use_remote_checksums=1 pnpm i
```

`electron-builder@24.x` 不支持 `loong64`，LoongArch 上建议只做前端构建，桌面端打包放到 x86_64 / arm64 机器或 CI。

## 推荐构建命令

```bash
cd ~/下载/docker-install/sdv-app/fit-archive-ng
export ELECTRON_SKIP_BINARY_DOWNLOAD=1
export NODE_OPTIONS="--max-old-space-size=4096"
export ESBUILD_BINARY_PATH=/usr/local/bin/esbuild-0.18.20
pnpm build
```
