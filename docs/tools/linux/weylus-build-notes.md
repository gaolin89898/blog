---
tags:
  - 工具
  - Linux
  - Weylus
description: Weylus Ubuntu 25.10 编译速查
---

# Weylus 编译速查

环境：

```text
OS：Ubuntu 25.10
shell：fish
方案：使用系统 FFmpeg 动态库
```

## 成功命令

```bash
cd '/home/gl/桌面/新建文件夹/Weylus'
cargo build --release --features ffmpeg-system
```

产物：

```text
target/release/weylus
```

运行：

```bash
./target/release/weylus
```

## 结论

- 加 `--features ffmpeg-system` 后走系统 FFmpeg 动态链接
- 默认静态链接容易缺 `zlib`、`dvdnav`、`dvdread` 等依赖
- 看到 `Finished release profile [optimized]` 即编译成功

## 可选打包

如果要提高跨机器可运行概率，用仓库脚本：

```bash
./docker-build.sh
./docker-build-advanced.sh
./docker-build-with-proxy.sh
```
