---
tags:
  - 工具
  - Linux
  - LoongArch
description: 适用场景：
---

# LoongArch：Go 与 esbuild 安装/修复步骤（含 Vite 构建）

适用场景：
- LoongArch 机器上需要 Go（用于编译 esbuild）
- Vite 构建报 `esbuild host/binary version mismatch`
- `vite build` 报 Node OOM
- `pnpm install` 因 electron 下载 404 失败
- `electron-builder` 报 `Unsupported arch loong64`（LoongArch 不支持桌面端打包）

---

## 0. 基本信息检查（建议先做）

```bash
uname -m
which -a go
node -v
pnpm -v
```

---

## 1) Go 安装位置与全局生效（使用 /opt/go）

你现在使用的是：`/opt/go/bin/go`

### 1.1 验证 Go 可用

```bash
/opt/go/bin/go version
```

### 1.2 让 Go 全局生效（所有用户）

```bash
echo 'export PATH=/opt/go/bin:$PATH' | sudo tee /etc/profile.d/go.sh
sudo chmod 644 /etc/profile.d/go.sh

# 当前终端立刻生效
source /etc/profile.d/go.sh
hash -r

which go
go version
```

---

## 2) esbuild 修复

### 2.1 编译对应版本的 esbuild（必须完全一致）

```bash
cd ~/下载
rm -rf esbuild-src
git clone https://github.com/evanw/esbuild.git esbuild-src
cd esbuild-src

git checkout v0.18.20
make

./esbuild --version   # 确认输出 0.18.20
```

### 2.3 安装到固定位置（建议固定命名）

```bash
sudo install -m 0755 esbuild /usr/local/bin/esbuild-0.18.20
/usr/local/bin/esbuild-0.18.20 --version
```

### 2.4 构建时指定二进制

```bash
cd ~/下载/docker-install/sdv-app/fit-archive-ng
export ESBUILD_BINARY_PATH=/usr/local/bin/esbuild-0.18.20
pnpm build
```

---

## 3) Node 构建 OOM（Vite build 堆内存不够）

典型报错：

```text
FATAL ERROR: ... Allocation failed - JavaScript heap out of memory
```

解决：加大 Node heap（单位 MB）：

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

---

## 4) 打包electron
ELECTRON_MIRROR=https://ftp.loongnix.cn/electron/LoongArch/ electron_use_remote_checksums=1 pnpm i

## 5) electron-builder 在 LoongArch 上无法打包

典型报错：

```text
Unsupported arch loong64
```

结论：
- `electron-builder@24.x` **不支持 loong64**
- LoongArch 上建议只做 `vite build`（前端构建）
- 桌面端打包放到 x86_64/arm64 机器或 CI 上做

---

## 6) 推荐的一条“前端构建命令”（LoongArch）

```bash
cd ~/下载/docker-install/sdv-app/fit-archive-ng
export ELECTRON_SKIP_BINARY_DOWNLOAD=1
export NODE_OPTIONS="--max-old-space-size=4096"
export ESBUILD_BINARY_PATH=/usr/local/bin/esbuild-0.18.20
pnpm build
```
