---
tags:
  - 工具
  - Linux
  - Weylus
description: 时间：2026-04-03
---

# Weylus 在当前电脑上的编译结论（Ubuntu 25.10 + fish）

时间：2026-04-03

## 结论
✅ 你已经成功编译：
```bash
cargo build --release --features ffmpeg-system
```
输出里出现：
`Finished release profile [optimized] target(s) ...`
就表示 **编译成功**。

本次最终采用的方案是：**使用系统 FFmpeg 的动态库（dylib）进行链接**。

---

## 为什么默认编译会失败？
你最开始用默认方式（不带 `ffmpeg-system`）时，`build.rs` 会选择：
- FFmpeg 链接方式：`static`

此时链接器会去找 `libavformat.a / libavcodec.a ...`。
你的系统 `/usr/lib/x86_64-linux-gnu/` 里存在 FFmpeg 的静态库（`.a`），所以它被拿来链接。

但系统静态 FFmpeg 通常带了更多功能模块，会额外依赖一些库（例如 zlib、dvdnav、dvdread）。
由于链接命令没有把这些依赖库一起加上，于是出现大量：
- `undefined symbol: uncompress`（来自 zlib）
- `undefined symbol: dvdnav_* / DVDOpen2 / ifoOpen ...`（来自 libdvdnav/libdvdread）

因此默认静态链接在你这台机子上失败。

---

## 最终方案（推荐你当前机器）：使用系统 FFmpeg 动态链接
### 编译命令
在项目目录执行：
```bash
cd '/home/gl/桌面/新建文件夹/Weylus'
cargo build --release --features ffmpeg-system
```

### 产物位置
编译产物在：
```text
target/release/weylus
```
运行：
```bash
./target/release/weylus
```

### 该方案的特点
- ✅ 最省事，最容易在本机编译通过
- ✅ 不需要处理系统静态 FFmpeg 的一堆额外依赖
- ⚠️ 二进制会依赖本机（或目标机器）安装的 FFmpeg 动态库（`libav* .so`）

---

## 可选：如果要提高“拷贝到别的机器也能跑”的概率
你需要静态/自带 FFmpeg（项目的 `deps/dist_linux/lib` 里要有 `libav*.a`），或者使用仓库提供的 Docker 构建脚本来产出更可控的二进制。

仓库里相关脚本：
- `./docker-build.sh`
- `./docker-build-advanced.sh`
- `./docker-build-with-proxy.sh`

---

## 你这台机器的本地编译环境（简要）
- OS：Ubuntu 25.10
- shell：fish
- Rust：rustc/cargo 已安装（`~/.cargo/bin` 在 PATH 中）
- Node：node/npm/pnpm 已安装（前端构建可用）

---

## 记录：build.rs 关键逻辑（与本次问题直接相关）
`build.rs` 中：
- 若启用 feature `ffmpeg-system`（即存在 `CARGO_FEATURE_FFMPEG_SYSTEM`）：
  - `ffmpeg_link_kind = "dylib"`
  - 使用系统动态库
- 否则：
  - `ffmpeg_link_kind = "static"`
  - 并添加 `deps/dist_linux/lib` 到 link-search

本次成功路径是前者（dylib）。
