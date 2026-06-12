---
tags:
  - 项目记录
  - RFID
description: 提供 3 种模式：
---

# RFID配置功能说明

## 1. 入口位置

- 顶部面包屑栏（`src/layouts/LayoutBreadcrumb/index.vue`）在 Electron 环境显示 RFID 按钮。
- 点击按钮后调用 `rfidSetting()`，打开 `src/views/rfidSetting/index.vue`。
- `src/views/rfidSetting/index.vue` 是入口壳组件，实际承载 `RfidConfigModal.vue`，并向外暴露：
  - `openClick()`
  - `closeClick()`

## 2. 配置弹窗（RfidConfigModal.vue）功能

### 2.1 启用状态

- 字段：`启用状态`（Switch）。
- 关闭时通过样式 `form-disabled` 将主要配置区域置灰并禁用交互（`opacity + pointer-events: none`）。

### 2.2 连接方式

提供 3 种模式：

- `usb`：USB（员工工作站/外置读写器）
- `tcp`：TCP串口（门口机/盘点车）
- `door`：TCP串口（门口机，偏门禁场景）

切换连接方式时会自动：

- 清空 4 个功率字段
- 断开当前连接（调用 `disconnectrfid`）
- 清空地址（串口地址/TCP地址）
- 若切到 `usb`，自动拉取串口列表

### 2.3 USB配置能力

- 串口地址下拉（来自 `window.electronAPI.getserialportlist()`）
- 选择串口后执行连接（`serialconnect(selectedPort, 115200)`）
- 显示串口连接状态（已连接/未连接）
- 显示模块型号（静态：`WYUAN-E891`）
- 显示模块版本号（静态：`1.23`）

### 2.4 TCP配置能力

- 可输入 TCP 地址
- 点击“测试连接”调用：`tcpconnect(tcpAddress, 20108)`
- 显示 TCP 连接状态（已连接/未连接）

### 2.5 功率配置（4项）

- 精密读取功率(dB)
- 精密盘点功率(dB)
- 远距离读取功率(dB)
- 远距离盘点功率(dB)

行为规则：

- 点击“确定”时 4 项都必须有值，否则提示“功率配置不能为空”。
- 保存到 Pinia 的 `powerStore`（`src/store/modules/rfidStore/power.ts`）：
  - USB 按串口地址存入 `usbPowerMap`
  - TCP/door 按 TCP 地址存入 `tcpPowerMap`
- 在连接成功后，会自动从 `powerStore` 读取历史功率并回填。

### 2.6 扫描测试入口

点击“扫描测试”后：

- 若连接方式是 `door`，打开门禁测试弹窗 `AccessModal.vue`
- 否则打开扫描测试弹窗 `scanTestModal.vue`

### 2.7 关闭行为

- 关闭配置弹窗会先尝试断开当前 RFID 连接，再隐藏弹窗。

## 3. 扫描测试（scanTestModal.vue）

主要能力：

- 展示实时标签列表（编号、类型、TID、次数、RSSI）
- 统计：标签数、读取次数、速度（张/秒）
- “开始读取”触发 `findTagLoop()`
- “停止读取”触发 `stopFindTagLoop()`
- “清空”可清空当前列表和统计
- 监听串口标签事件：`onSerialData`

## 4. 门禁测试（AccessModal.vue）

主要能力：

- 展示标签流数据（编号、类型、TID、次数、RSSI）
- 统计：在馆人数、进入人数、离开人数
- “开始读取”调用 `setGpioTrigger()`（门禁触发）
- “停止读取”调用 `disconnectrfid()`
- “清空”调用 `clearAccessData()` 并重置前端统计
- 监听事件：
  - `onTagData`（标签）
  - `onInoutNumData`（进出人数）

## 5. Electron API 映射（preload）

`electron/preload/index.ts` 已暴露以下 RFID 能力：

- `getserialportlist()` -> `get-serial-port-list`
- `tcpconnect(host, port)` -> `tcp-connect`
- `serialconnect(serialAddr, baudRate)` -> `serial-connect`
- `disconnectrfid()` -> `disconnect-rfid`
- `findTagLoop()` -> `find-tag-loop`
- `stopFindTagLoop()` -> `stop-find-tag-loop`
- `setGpioTrigger()` -> `set-gpio-trigger`
- `stopGpiotrigger()` -> `stop-gpio-trigger`
- `clearAccessData()` -> `clear-access-data`
- `onTagData(callback)`（监听 `rfid-tag-data`）
- `onSerialData(callback)`（监听 `rfid-tag-data-serial`）
- `onInoutNumData(callback)`（监听 `rfid-InoutNum-data`）

## 6. 主进程 RFID 行为

`electron/main/IPC/rfidComon.ts` + `electron/main/rfid-manager.ts` 提供：

- 串口/TCP连接
- 断开连接
- 手动连续寻标签（开始/停止）
- 门禁 GPIO 触发开关
- 门禁进出数据清空
- 连接成功后自动建立：
  - 标签广播（TCP 发 `rfid-tag-data`，串口发 `rfid-tag-data-serial`）
  - 进出数据广播（`rfid-InoutNum-data`）

## 7. 当前实现注意点

- 功率配置当前仅保存在 Pinia 内存，重启应用后不会持久化（除非后续接本地存储/后端接口）。
- `door` 模式在功率存储时走 TCP分支（即保存到 `tcpPowerMap`），属于当前实现的统一策略。
- 弹窗中“模块型号/版本号”是静态展示，不是实时读取设备返回。

## 8. 典型使用流程

1. 顶部点击 RFID 按钮，打开“RFID读写器配置”。
2. 选择连接方式（USB/TCP/door）。
3. USB 选择串口，或 TCP 输入地址并测试连接。
4. 配置功率参数并点击“确定”。
5. 点击“扫描测试”进入对应测试弹窗：
   - 普通扫描：`scanTestModal`
   - 门禁场景：`AccessModal`
6. 观察实时标签及统计数据，按需停止读取或清空。

---

生成时间：2026-04-22
