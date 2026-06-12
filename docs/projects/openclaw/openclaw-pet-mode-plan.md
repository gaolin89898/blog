---
tags:
  - 项目记录
  - OpenClaw
description: OpenClaw 桌宠模式不是普通桌宠，也不是主界面的替代品。
---

# OpenClaw 桌宠模式技术方案

## 1. 项目定位

OpenClaw 桌宠模式不是普通桌宠，也不是主界面的替代品。

它的定位是：

```text
OpenClaw 的桌面伴随模式。
一个常驻桌面的轻量 AI 代理入口、状态反馈层和低打扰交互层。
```

桌宠模式负责让 OpenClaw 在桌面上保持“在场感”：

- 用户能看到 OpenClaw 当前是否空闲、工作、出错或等待确认。
- 用户能快速输入一个任务。
- 用户能快速打开 OpenClaw 主窗口。
- 用户能收到任务完成、失败、等待确认等关键反馈。
- 用户能暂停、隐藏或进入勿扰模式。

复杂任务、详细日志、模型配置、权限设置、插件管理等能力仍然放在 OpenClaw 主窗口中。

## 2. 平台范围

| 平台 | 首版状态 | 说明 |
|---|---:|---|
| Windows 10/11 | 正式支持 | 第一优先级 |
| Linux X11 | 正式支持 | Linux 首版目标 |
| Linux Wayland | 暂不支持 | 启动时检测并提示 |
| macOS | 预留口子 | 暂不开发、不测试、不打包 |
| Android/iOS | 不考虑 | 不进入架构设计 |

产品支持口径：

```text
OpenClaw 桌宠模式支持 Windows 和 Linux X11。
Linux Wayland 暂不支持，请切换到 X11 / Xorg 会话后使用。
macOS 支持计划中。
```

## 3. 技术选型

```text
桌面框架：Electron
开发语言：TypeScript
前端框架：React
动画渲染：PixiJS
构建工具：electron-vite
配置存储：electron-store
打包工具：electron-builder
状态管理：Zustand
OpenClaw 通信：Event Bridge / IPC / WebSocket / JSON Lines，按现有 OpenClaw 架构选择
```

桌宠第一版动画建议使用 PNG 序列帧或 spritesheet。后续可以扩展 Live2D、Rive、Spine 或 Lottie。

## 4. 产品原则

### 4.1 桌宠不是主界面

桌宠模式只承担轻量交互：

- 展示状态
- 接收短任务
- 展示轻量提示
- 唤起主窗口
- 提醒用户确认
- 暂停或恢复当前任务

以下能力不放在桌宠里：

- 完整聊天历史
- 复杂任务编辑
- 模型配置
- 工具权限配置
- 插件管理
- 文件差异查看
- 长日志查看
- 高风险操作确认详情

### 4.2 默认低打扰

桌宠不能频繁打断用户。

默认策略：

```text
普通状态变化：只改变动画，不弹窗
任务开始：轻微状态变化
任务进行中：只显示当前状态
任务完成：轻提示
任务失败：轻提示
等待确认：明显提示
高风险操作：打开完整确认面板
```

用户必须可以：

- 隐藏桌宠
- 关闭主动提醒
- 进入勿扰模式
- 关闭动画
- 退出程序

### 4.3 状态必须可信

桌宠展示的状态必须来自 OpenClaw 的真实运行状态，而不是自己猜测。

```text
OpenClaw Core 是事实来源。
桌宠只订阅事件并映射状态。
```

## 5. 产品形态

OpenClaw 桌面端由三个入口组成：

```text
1. 主窗口
   完整功能、任务详情、设置、历史记录、模型配置。

2. 系统托盘
   稳定系统入口：显示/隐藏、退出、设置、暂停任务。

3. 桌宠窗口
   轻量伴随入口：状态反馈、快速指令、轻交互。
```

桌宠窗口不替代托盘。托盘是恢复入口和退出入口，必须一直可用。

## 6. 首版 MVP 范围

### 6.1 桌宠基础能力

- 透明悬浮窗口
- 无边框窗口
- 始终置顶
- 不显示在任务栏
- 可拖拽移动
- 可隐藏和恢复
- 位置保存
- 支持缩放
- 支持透明度设置
- 支持 Windows 和 Linux X11
- Linux Wayland 检测后提示不支持

### 6.2 OpenClaw 集成能力

- 显示 OpenClaw 当前状态
- 单击打开快速输入面板
- 双击打开 OpenClaw 主窗口
- 展示当前任务简短状态
- 展示任务完成提示
- 展示任务失败提示
- 展示等待用户确认提示
- 支持暂停当前任务
- 支持恢复当前任务
- 支持勿扰模式

### 6.3 暂不进入 MVP 的功能

- Live2D
- 多角色系统
- 复杂换装
- 插件市场
- 云同步
- 语音唤醒
- 完整聊天窗口
- 文件 diff 详情
- Wayland 完整支持
- macOS 打包
- 移动端

## 7. OpenClaw 状态模型

桌宠状态不应只靠随机行为驱动，而应由 OpenClaw 的 agent 状态驱动。

### 7.1 Agent 语义状态

```text
idle       空闲
listening  等待用户输入
thinking   思考中
working    执行中
blocked    等待用户确认
success    任务完成
error      任务失败
sleeping   勿扰/暂停
dragging   被拖拽
```

### 7.2 动画映射

```text
idle：
  小幅呼吸、眨眼、待机

listening：
  抬头、注意、等待输入

thinking：
  思考、眼睛转动、爪子敲桌

working：
  打字、搬东西、挥爪、忙碌

blocked：
  举牌、提醒、等待确认

success：
  开心、跳一下、挥手

error：
  困惑、摔倒、红色提示

sleeping：
  睡觉、降低动画频率

dragging：
  被拎起、晃动、悬空反馈
```

### 7.3 事件到状态映射

```ts
const stateMap = {
  'agent.idle': 'idle',
  'agent.listening': 'listening',
  'agent.thinking': 'thinking',
  'agent.running': 'working',
  'agent.waiting_for_approval': 'blocked',
  'agent.completed': 'success',
  'agent.failed': 'error',
  'agent.paused': 'sleeping'
}
```

用户拖拽桌宠时，`dragging` 是本地临时状态。拖拽结束后恢复到最近一次 OpenClaw 状态。

## 8. OpenClaw Event Bridge

OpenClaw 桌宠模式需要一个事件桥接层。

它负责：

- 订阅 OpenClaw Core 状态。
- 把 OpenClaw 内部事件转换成桌宠可理解的事件。
- 将任务状态推送给 Electron 主进程。
- 将用户从桌宠发出的操作转回 OpenClaw Core。

整体结构：

```text
OpenClaw Core
  -> OpenClaw Event Bridge
    -> Electron Main
      -> Pet Window
      -> Quick Panel
      -> Tray
      -> Main Window
```

### 8.1 事件定义

```ts
export type OpenClawEvent =
  | {
      type: 'agent.idle'
    }
  | {
      type: 'agent.listening'
    }
  | {
      type: 'agent.thinking'
      taskId: string
      message: string
    }
  | {
      type: 'agent.running'
      taskId: string
      message: string
      progress?: number
    }
  | {
      type: 'agent.waiting_for_approval'
      taskId: string
      actionId: string
      title: string
      summary: string
      riskLevel: 'low' | 'medium' | 'high'
    }
  | {
      type: 'agent.completed'
      taskId: string
      summary: string
    }
  | {
      type: 'agent.failed'
      taskId: string
      error: string
      recoverable: boolean
    }
  | {
      type: 'agent.paused'
      reason?: string
    }
```

### 8.2 命令定义

桌宠向 OpenClaw 发送命令：

```ts
export type OpenClawCommand =
  | {
      type: 'task.submit'
      input: string
      source: 'pet'
    }
  | {
      type: 'task.pause'
      taskId?: string
    }
  | {
      type: 'task.resume'
      taskId?: string
    }
  | {
      type: 'task.cancel'
      taskId: string
    }
  | {
      type: 'approval.allow'
      taskId: string
      actionId: string
    }
  | {
      type: 'approval.deny'
      taskId: string
      actionId: string
    }
  | {
      type: 'app.openMainWindow'
    }
```

### 8.3 通信方式选择

根据 OpenClaw 当前架构选择通信方式。

如果 OpenClaw Core 是 Node/TypeScript：

```text
Electron 主进程直接作为模块调用 OpenClaw Core。
主进程和渲染进程通过 IPC 通信。
```

如果 OpenClaw 是 CLI：

```text
Electron 主进程通过 child_process 启动 OpenClaw。
使用 stdio + JSON Lines 通信。
```

如果 OpenClaw 是本地服务：

```text
Electron 通过 HTTP / WebSocket 连接本地服务。
事件流通过 WebSocket 推送。
```

如果 OpenClaw 是 Python/Rust/Go 后端：

```text
后端作为常驻本地服务运行。
Electron 桌宠作为前端壳。
通过本地端口或命名管道通信。
```

推荐原则：

```text
桌宠只订阅事件和发送命令。
不要让桌宠直接操作文件、模型、工具和权限系统。
```

## 9. 交互设计

### 9.1 桌宠操作

```text
单击桌宠：
  打开快速输入面板

双击桌宠：
  打开 OpenClaw 主窗口

右键桌宠：
  显示菜单

拖拽桌宠：
  移动位置

拖文件到桌宠：
  让 OpenClaw 处理文件

拖文本到桌宠：
  让 OpenClaw 总结、改写、翻译或解释
```

拖文件和拖文本可以作为第二阶段功能，MVP 只保留接口。

### 9.2 快速输入面板

快速输入面板用于提交短任务。

空闲状态：

```text
+--------------------------+
| OpenClaw                 |
| 正在等待任务             |
|                          |
| 输入你想做的事...        |
| [ 发送 ] [ 打开主窗口 ]  |
+--------------------------+
```

工作中状态：

```text
+--------------------------+
| 正在执行                 |
| 分析项目结构...          |
|                          |
| [ 查看详情 ] [ 暂停 ]    |
+--------------------------+
```

等待确认状态：

```text
+--------------------------+
| 需要确认                 |
| 是否允许执行 npm install |
|                          |
| [ 查看 ] [ 允许 ] [ 拒绝 ]|
+--------------------------+
```

高风险确认不在快速面板里直接允许，必须打开主窗口查看详情。

### 9.3 右键菜单

```text
输入任务
打开 OpenClaw
查看当前任务
暂停任务
恢复任务
勿扰模式
隐藏桌宠
设置
退出
```

### 9.4 托盘菜单

```text
显示/隐藏桌宠
打开 OpenClaw
当前任务
暂停任务
勿扰模式
开机启动
设置
退出
```

## 10. 权限和安全策略

OpenClaw 桌宠模式必须明确权限边界。

桌宠是轻量入口，不是高风险操作确认器。

### 10.1 风险分级

低风险操作：

```text
- 总结文本
- 解释代码
- 改写文字
- 查询任务状态
- 打开主窗口
```

可以通过桌宠直接执行。

中风险操作：

```text
- 修改文件
- 运行测试
- 安装依赖
- 调用外部服务
- 读取较大目录
```

需要确认。可以在快速面板展示简短确认，但必须提供“查看详情”。

高风险操作：

```text
- 删除文件
- 执行 shell 命令
- 修改系统配置
- 联网下载并执行内容
- 修改权限
- 批量移动或覆盖文件
```

必须打开 OpenClaw 主窗口，展示完整动作、原因、影响范围和可取消选项。

### 10.2 确认规则

```text
低风险：
  桌宠可直接提交。

中风险：
  桌宠可提示，但用户应能查看详情。

高风险：
  桌宠只提醒，不允许直接确认。
  必须打开主窗口处理。
```

### 10.3 勿扰模式

勿扰模式下：

- 不弹出快速提示。
- 不播放明显动画。
- 不主动唤起窗口。
- 只保留托盘状态和必要错误提示。
- 高风险确认仍然不自动执行。

## 11. 技术架构

### 11.1 目录结构

```text
openclaw-desktop/
  package.json
  electron-builder.yml
  electron.vite.config.ts

  src/
    main/
      index.ts

      app/
        lifecycle.ts

      windows/
        createPetWindow.ts
        createMainWindow.ts
        createQuickPanelWindow.ts
        createSettingsWindow.ts

      tray/
        createTray.ts

      openclaw/
        eventBridge.ts
        commandClient.ts
        eventTypes.ts
        commandTypes.ts

      platform/
        types.ts
        index.ts
        windows.ts
        linuxX11.ts
        macos.ts
        unsupported.ts

      config/
        store.ts
        defaults.ts

      ipc/
        handlers.ts
        channels.ts

    preload/
      pet.ts
      quickPanel.ts
      mainWindow.ts
      settings.ts

    renderer/
      pet/
        App.tsx
        PetCanvas.tsx
        petMachine.ts
        animationPlayer.ts
        openclawStateMapper.ts
        usePetStore.ts

      quickPanel/
        App.tsx
        QuickCommandInput.tsx
        CurrentTaskCard.tsx
        ApprovalPrompt.tsx

      mainWindow/
        App.tsx

      settings/
        App.tsx

      shared/
        types.ts
        constants.ts

  assets/
    pets/
      openclaw-default/
        manifest.json
        idle/
        listening/
        thinking/
        working/
        blocked/
        success/
        error/
        sleeping/
```

### 11.2 主进程职责

- 创建宠物窗口
- 创建快速输入面板
- 创建 OpenClaw 主窗口
- 创建设置窗口
- 管理托盘
- 检测平台和 Linux 会话类型
- 连接 OpenClaw Event Bridge
- 接收 OpenClaw 事件
- 转发事件到桌宠和快速面板
- 接收桌宠命令
- 将命令发送给 OpenClaw Core
- 管理配置和开机自启

### 11.3 渲染进程职责

宠物窗口：

- 渲染桌宠动画
- 根据 OpenClaw 状态切换动作
- 处理点击、双击、右键、拖拽
- 展示轻量状态

快速面板：

- 输入短任务
- 展示当前任务状态
- 展示轻量确认
- 打开主窗口查看详情

主窗口：

- 保留 OpenClaw 完整功能
- 展示任务详情
- 展示高风险确认
- 展示日志和历史

## 12. 平台策略

### 12.1 Windows

正式支持：

- 透明窗口
- 无边框窗口
- 始终置顶
- 点击穿透
- 托盘
- 开机自启
- 安装包

### 12.2 Linux X11

正式支持：

- 透明窗口
- 无边框窗口
- 置顶
- 点击穿透
- 托盘
- 位置保存
- AppImage/deb 打包

需要测试不同桌面环境：

```text
GNOME on X11
KDE Plasma on X11
XFCE
```

### 12.3 Linux Wayland

暂不支持。

启动时检测：

```ts
const sessionType = process.env.XDG_SESSION_TYPE?.toLowerCase()
```

如果是 Wayland：

```text
不创建桌宠窗口。
显示暂不支持提示。
允许打开普通 OpenClaw 主窗口，但禁用桌宠模式。
```

提示文案：

```text
当前为 Linux Wayland 会话，OpenClaw 桌宠模式暂不支持。
请在登录界面选择 X11 / Xorg 会话后重新启动桌宠模式。
```

### 12.4 macOS

只保留 adapter：

- 不开发
- 不测试
- 不打包
- 不承诺支持

## 13. 宠物窗口设计

宠物窗口属性：

```ts
const petWindow = new BrowserWindow({
  width: 300,
  height: 300,
  frame: false,
  transparent: true,
  resizable: false,
  movable: true,
  alwaysOnTop: true,
  skipTaskbar: true,
  hasShadow: false,
  show: false,
  webPreferences: {
    preload: PET_PRELOAD_PATH,
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: false
  }
})
```

Windows：

```ts
petWindow.setAlwaysOnTop(true, 'screen-saver')
```

Linux X11：

```ts
petWindow.setAlwaysOnTop(true)
petWindow.setVisibleOnAllWorkspaces(true)
```

点击穿透：

```ts
petWindow.setIgnoreMouseEvents(enabled, { forward: true })
```

点击穿透不能默认开启。用户必须能通过托盘恢复互动模式。

## 14. 素材方案

第一版使用 spritesheet。

目录示例：

```text
assets/pets/openclaw-default/
  manifest.json
  idle/
    idle.json
    idle.png
  listening/
    listening.json
    listening.png
  thinking/
    thinking.json
    thinking.png
  working/
    working.json
    working.png
  blocked/
    blocked.json
    blocked.png
  success/
    success.json
    success.png
  error/
    error.json
    error.png
  sleeping/
    sleeping.json
    sleeping.png
```

manifest 示例：

```json
{
  "id": "openclaw-default",
  "name": "OpenClaw Default",
  "version": "1.0.0",
  "width": 256,
  "height": 256,
  "animations": {
    "idle": {
      "type": "spritesheet",
      "json": "idle/idle.json",
      "fps": 12,
      "loop": true
    },
    "listening": {
      "type": "spritesheet",
      "json": "listening/listening.json",
      "fps": 12,
      "loop": true
    },
    "thinking": {
      "type": "spritesheet",
      "json": "thinking/thinking.json",
      "fps": 12,
      "loop": true
    },
    "working": {
      "type": "spritesheet",
      "json": "working/working.json",
      "fps": 16,
      "loop": true
    },
    "blocked": {
      "type": "spritesheet",
      "json": "blocked/blocked.json",
      "fps": 10,
      "loop": true
    },
    "success": {
      "type": "spritesheet",
      "json": "success/success.json",
      "fps": 18,
      "loop": false
    },
    "error": {
      "type": "spritesheet",
      "json": "error/error.json",
      "fps": 10,
      "loop": true
    },
    "sleeping": {
      "type": "spritesheet",
      "json": "sleeping/sleeping.json",
      "fps": 8,
      "loop": true
    }
  }
}
```

后续可以扩展：

```json
{
  "type": "live2d",
  "model": "model/model3.json"
}
```

## 15. 配置模型

使用 `electron-store`。

```ts
export type OpenClawPetSettings = {
  pet: {
    enabled: boolean
    scale: number
    opacity: number
    alwaysOnTop: boolean
    clickThrough: boolean
    lastPosition: {
      x: number
      y: number
    }
  }
  behavior: {
    showTaskNotifications: boolean
    showCompletionHint: boolean
    showFailureHint: boolean
    doNotDisturb: boolean
    animationEnabled: boolean
  }
  system: {
    autoLaunch: boolean
    startHidden: boolean
    closeToTray: boolean
  }
  openclaw: {
    openMainWindowOnHighRiskApproval: boolean
    allowLowRiskQuickActions: boolean
    allowMediumRiskQuickApproval: boolean
  }
}
```

默认建议：

```text
pet.enabled = true
pet.alwaysOnTop = true
pet.clickThrough = false
behavior.showTaskNotifications = true
behavior.doNotDisturb = false
openclaw.openMainWindowOnHighRiskApproval = true
openclaw.allowLowRiskQuickActions = true
openclaw.allowMediumRiskQuickApproval = false
```

## 16. 打包方案

首版只打包 Windows 和 Linux。

package scripts：

```json
{
  "scripts": {
    "dev": "electron-vite dev",
    "build": "electron-vite build",
    "dist:win": "electron-builder --win",
    "dist:linux": "electron-builder --linux",
    "dist": "electron-builder --win --linux"
  }
}
```

electron-builder：

```yaml
appId: com.openclaw.desktop
productName: OpenClaw

directories:
  output: release

files:
  - out/**
  - assets/**

win:
  target:
    - nsis

linux:
  target:
    - AppImage
    - deb
  category: Utility

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
```

macOS 不进入首版构建流程。

## 17. 验收标准

### 17.1 Windows

- 桌宠窗口透明。
- 桌宠窗口无边框。
- 桌宠窗口始终置顶。
- 桌宠窗口不显示在任务栏。
- 可以拖拽移动。
- 单击打开快速输入面板。
- 双击打开 OpenClaw 主窗口。
- OpenClaw 空闲、运行、等待确认、完成、失败状态能映射到桌宠动画。
- 托盘可以显示、隐藏、暂停、设置、退出。
- 设置保存后重启仍然生效。
- 可打包成 Windows 安装包。

### 17.2 Linux X11

- 检测到 X11 后正常启动桌宠模式。
- 桌宠窗口透明。
- 桌宠窗口无边框。
- 桌宠窗口尽量稳定置顶。
- 可以拖拽移动。
- 单击打开快速输入面板。
- 双击打开 OpenClaw 主窗口。
- OpenClaw 状态能映射到桌宠动画。
- 托盘可用。
- 设置保存后重启仍然生效。
- 可打包成 AppImage 和 deb。

### 17.3 Linux Wayland

- 检测到 Wayland。
- 禁用桌宠模式。
- 明确提示暂不支持。
- 普通 OpenClaw 主窗口仍可打开。
- 不进入半可用状态。

### 17.4 权限确认

- 低风险任务可从桌宠快速提交。
- 中风险任务至少提供查看详情入口。
- 高风险任务必须打开主窗口确认。
- 桌宠不能直接确认高风险操作。
- 勿扰模式下不弹出非必要提示。

## 18. 开发顺序

建议按以下顺序开发：

```text
1. 在 OpenClaw 桌面端中搭建 Electron 桌宠窗口
2. 增加 Windows / Linux X11 / Wayland 平台检测
3. 增加托盘菜单和显示/隐藏能力
4. 接入 PixiJS 渲染默认桌宠
5. 实现 OpenClaw Event Bridge 的事件类型
6. 将 OpenClaw idle / running / waiting / completed / failed 映射到桌宠状态
7. 实现单击快速输入面板
8. 实现双击打开主窗口
9. 实现暂停、恢复、勿扰模式
10. 实现权限风险分级和高风险主窗口确认
11. 实现设置保存
12. 增加 Windows 打包
13. 增加 Linux AppImage/deb 打包
14. 增加 macOS adapter 占位
```

## 19. 后续扩展

第一版完成后可以扩展：

- 拖文件到桌宠处理
- 拖文本到桌宠处理
- 截图后发送给 OpenClaw
- 语音输入
- 多角色
- Live2D 角色
- 主题和皮肤
- 桌宠动作编辑器
- 任务进度更细粒度展示
- OpenClaw 插件状态展示
- 日程提醒
- 代码审查提醒
- 长任务完成后的结果摘要

## 20. 最终定案

```text
OpenClaw 桌宠模式是 OpenClaw 的桌面伴随模式。
它不是普通桌宠，也不是主窗口替代品。

首版支持：
Windows + Linux X11

暂不支持：
Linux Wayland、macOS、移动端

核心能力：
透明桌宠窗口 + 托盘 + 快速输入面板 + OpenClaw 状态映射 + 任务提醒 + 权限确认入口。

技术栈：
Electron + TypeScript + React + PixiJS + electron-vite + electron-builder

关键架构：
OpenClaw Core -> Event Bridge -> Electron Main -> Pet Window / Quick Panel / Tray / Main Window
```
