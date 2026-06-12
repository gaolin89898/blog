---
tags:
  - 后端
  - 服务器
  - 部署
description: 使用 SDK 自带样例程序 test-ji-api 对指定视频进行测试，确认：
---

# 香港镜像测试记录

## 1. 测试目的

使用 SDK 自带样例程序 `test-ji-api` 对指定视频进行测试，确认：

- SDK 原生命令是否可以正常执行
- 是否会对视频中的“异物”进行识别和标注
- 输出结果文件是否可以正常生成并回传本地

## 2. 测试环境

- 远端主机：`192.168.2.186`
- SSH 用户：`icepie`
- Docker 容器：`24cde1237a03`
- 容器名称：`mjj-test`
- SDK 目录：`/usr/local/ev_sdk`
- SDK 可执行文件：`/usr/local/ev_sdk/bin/test-ji-api`

说明：

- 文档不记录密码，执行时使用已有远端凭据即可。

## 3. 测试文件路径

### 本地原始视频

- `/home/gl/下载/97a8be08c622620ca3757574702ca252.mp4`

### 容器内输入视频

- `/tmp/97a8be08c622620ca3757574702ca252.mp4`

### 容器内输出视频

- `/tmp/97a8be08c622620ca3757574702ca252_annotated.mp4`

### 本地回传结果

- `/home/gl/桌面/97a8be08c622620ca3757574702ca252_annotated.mp4`

## 4. SDK 自带命令

先登录远端：

```bash
ssh -F /dev/null icepie@192.168.2.186
```

进入远端后，直接执行 SDK 原生命令：

```bash
docker exec 24cde1237a03 sh -lc 'rm -f /tmp/97a8be08c622620ca3757574702ca252_annotated.mp4 && cd /usr/local/ev_sdk/bin && export LD_LIBRARY_PATH=/usr/local/ev_sdk/lib:$LD_LIBRARY_PATH && ./test-ji-api -f 1 -i /tmp/97a8be08c622620ca3757574702ca252.mp4 -o /tmp/97a8be08c622620ca3757574702ca252_annotated.mp4 -a "{\"thresh\":0.9}" -r 1'
```

参数说明：

- `-f 1`：调用 `ji_calc_image`
- `-i`：输入视频
- `-o`：输出视频
- `-a "{\"thresh\":0.9}"`：设置阈值
- `-r 1`：执行一次

## 5. 结果回传命令

### 从容器复制到远端宿主机

```bash
docker cp 24cde1237a03:/tmp/97a8be08c622620ca3757574702ca252_annotated.mp4 /tmp/97a8be08c622620ca3757574702ca252_annotated.mp4
```

### 从远端宿主机复制回本地桌面

```bash
scp -F /dev/null icepie@192.168.2.186:/tmp/97a8be08c622620ca3757574702ca252_annotated.mp4 /home/gl/桌面/97a8be08c622620ca3757574702ca252_annotated.mp4
```

## 6. 实际测试结果

本次测试中：

- SDK 原生命令可以正常启动并完整跑完
- 输出视频可以正常生成
- 输出文件已成功回传到本地桌面

本地结果文件：

- `/home/gl/桌面/97a8be08c622620ca3757574702ca252_annotated.mp4`

文件大小：

- 原始视频约 `38M`
- 输出视频约 `27M`

## 7. 关键日志结论

执行过程中，日志持续出现以下结果特征：

- `objects: []`
- `is_alert: false`
- `target_info: []`

这说明：

- SDK 样例程序在逐帧处理视频
- 但模型没有识别出可绘制目标
- 因此输出视频中不会出现“异物标注框”

## 8. 原因分析

从 SDK 加载的配置可以看到，当前样例模型对应的类别只有：

- `person`
- `bicycle`
- `car`

也就是说，当前执行的并不是“异物检测专用模型”，而是一个通用目标检测样例配置。

因此即使命令本身执行正确，只要视频中的目标不属于上述类别，最终结果就会表现为：

- 没有检测框
- 没有告警
- 没有异物标识

## 9. 最终结论

本次测试已经确认以下事实：

- 使用的是 SDK 自带命令，不是自定义脚本
- SDK 样例程序本身可以跑通
- 输出视频可以正常生成并回传
- 当前样例模型不会对视频中的“异物”做标注

如果后续目标是“必须标识异物”，需要替换为真正的异物检测模型或对应的 SDK 配置，而不是继续复用当前这个 `person/bicycle/car` 的样例模型。
