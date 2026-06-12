---
tags:
  - 项目记录
  - 桌面宠物
description: 做一个跨桌面平台的桌宠软件，第一版聚焦 Windows 和 Linux X11。
---

# 桌宠软件技术方案

## 1. 项目目标

做一个跨桌面平台的桌宠软件，第一版聚焦 Windows 和 Linux X11。

第一版目标不是做一个概念 Demo，而是做一个可以长期运行、可打包分发、具备基础交互和设置能力的桌面应用。

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
支持 Windows 和 Linux X11。
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
```

第一版动画建议使用 PNG 序列帧或 spritesheet。后续如果要做二次元风格桌宠，可以在 PixiJS 基础上接入 Live2D。

## 4. 为什么选择 Electron

Electron 更适合第一版快速落地，原因如下：

- 透明窗口、无边框窗口、置顶窗口能力成熟。
- 托盘、全局快捷键、开机自启、窗口控制资料多。
- React 设置界面开发效率高。
- PixiJS、Live2D、Lottie、Spine 等动画生态更容易接入。
- Windows 和 Linux X11 的桌宠能力可以较快验证。
- 后续做素材系统、插件系统、云同步和 AI 互动扩展成本较低。

Qt 原生方案更轻量，但开发成本更高，动画生态和设置界面迭代速度不如 Electron。当前目标是先做出可用产品，所以首版采用 Electron。

## 5. 首版功能范围

### 5.1 宠物窗口

- 透明背景
- 无边框窗口
- 始终置顶
- 不显示在任务栏
- 可拖拽移动
- 可点击互动
- 支持显示/隐藏
- 保存上次位置
- 支持缩放
- 支持透明度设置

### 5.2 系统托盘

托盘菜单包含：

- 显示/隐藏宠物
- 互动模式 / 穿透模式切换
- 始终置顶开关
- 打开设置
- 退出程序

托盘是必要能力，因为桌宠窗口无边框，用户需要稳定的退出和恢复入口。

### 5.3 宠物行为

第一版状态：

```text
idle        待机
walk        走动
clickReact  点击反应
dragging    被拖拽
sleep       睡觉
```

第一版事件：

```text
CLICK
DRAG_START
DRAG_END
TIMER
SLEEP_TIME
WAKE_UP
```

状态流转：

```text
idle -> walk
idle -> sleep
idle -> clickReact
walk -> idle
sleep -> clickReact
clickReact -> idle
任意状态 -> dragging
dragging -> idle
```

### 5.4 设置窗口

第一版设置项：

```text
显示：
- 宠物大小
- 宠物透明度
- 始终置顶
- 点击穿透

行为：
- 自动走动
- 随机动作频率
- 点击互动
- 睡觉时间

系统：
- 开机自启
- 启动时显示宠物
- 关闭行为：隐藏到托盘 / 退出

平台：
- 当前系统
- 当前 Linux 会话类型
- 平台支持状态
```

### 5.5 点击穿透

点击穿透做成可选模式。

```text
互动模式：
- 鼠标可以点击宠物
- 可以拖拽宠物
- 可以触发点击反应

穿透模式：
- 鼠标事件穿过宠物窗口
- 不影响桌面操作
- 暂停点击和拖拽互动
- 通过托盘切回互动模式
```

不要默认开启点击穿透，否则用户可能无法操作桌宠。

## 6. Linux X11 策略

第一版只正式支持 Linux X11。

启动时检测：

```ts
const sessionType = process.env.XDG_SESSION_TYPE?.toLowerCase()
```

处理策略：

```text
sessionType === "x11"：
  正常启动

sessionType === "wayland"：
  不创建桌宠窗口
  显示暂不支持提示

sessionType 为空：
  可以按 X11 尝试启动，但在设置页显示未知会话类型
```

Wayland 不做半支持。原因是 Wayland 对窗口置顶、程序移动窗口、点击穿透等能力限制较多，桌宠体验不可控。

Wayland 提示文案：

```text
当前为 Linux Wayland 会话，桌宠暂不支持。
请在登录界面选择 X11 / Xorg 会话后重新启动。
```

## 7. 架构设计

### 7.1 目录结构

```text
desktop-pet/
  package.json
  electron-builder.yml
  electron.vite.config.ts
  tsconfig.json

  src/
    main/
      index.ts

      app/
        lifecycle.ts

      windows/
        createPetWindow.ts
        createSettingsWindow.ts

      tray/
        createTray.ts

      config/
        store.ts
        defaults.ts

      ipc/
        handlers.ts
        channels.ts

      platform/
        types.ts
        index.ts
        windows.ts
        linuxX11.ts
        macos.ts
        unsupported.ts

    preload/
      pet.ts
      settings.ts

    renderer/
      pet/
        App.tsx
        PetCanvas.tsx
        petMachine.ts
        animationPlayer.ts
        behaviorController.ts
        usePetStore.ts

      settings/
        App.tsx
        SettingsForm.tsx

      shared/
        types.ts
        constants.ts

  assets/
    pets/
      default/
        manifest.json
        idle/
        walk/
        click/
        sleep/
```

### 7.2 进程职责

主进程负责：

- 创建宠物窗口
- 创建设置窗口
- 控制窗口置顶
- 控制窗口显示/隐藏
- 管理托盘
- 管理开机自启
- 检测平台和 Linux 会话类型
- 保存和读取配置
- 处理 IPC

渲染进程负责：

- 渲染宠物动画
- 播放状态机
- 处理点击反馈
- 处理拖拽反馈
- 展示设置界面

### 7.3 平台适配层

不要在业务代码里到处写 `process.platform` 判断。平台差异统一放到 adapter。

```ts
import type { BrowserWindow } from 'electron'

export type RuntimePlatform =
  | 'windows'
  | 'linux-x11'
  | 'linux-wayland'
  | 'macos'
  | 'unsupported'

export interface PlatformAdapter {
  name: RuntimePlatform
  isSupported: boolean

  setupPetWindow(window: BrowserWindow): void
  setAlwaysOnTop(window: BrowserWindow, enabled: boolean): void
  setClickThrough(window: BrowserWindow, enabled: boolean): void

  supportsClickThrough(): boolean
  supportsAutoLaunch(): boolean
  getUnsupportedReason?(): string
}
```

平台选择：

```ts
export function getPlatformAdapter(): PlatformAdapter {
  if (process.platform === 'win32') {
    return windowsAdapter
  }

  if (process.platform === 'linux') {
    const sessionType = process.env.XDG_SESSION_TYPE?.toLowerCase()

    if (sessionType === 'x11' || !sessionType) {
      return linuxX11Adapter
    }

    if (sessionType === 'wayland') {
      return unsupportedAdapter(
        'linux-wayland',
        'Linux Wayland 暂不支持。请切换到 X11 会话后使用桌宠。'
      )
    }
  }

  if (process.platform === 'darwin') {
    return macosAdapter
  }

  return unsupportedAdapter(
    'unsupported',
    `当前系统暂不支持：${process.platform}`
  )
}
```

## 8. 宠物窗口设计

宠物窗口创建示例：

```ts
import { BrowserWindow } from 'electron'
import { getPlatformAdapter } from '../platform'

export function createPetWindow() {
  const platform = getPlatformAdapter()

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

  platform.setupPetWindow(petWindow)

  petWindow.once('ready-to-show', () => {
    petWindow.showInactive()
  })

  return petWindow
}
```

Windows 置顶策略：

```ts
window.setAlwaysOnTop(true, 'screen-saver')
```

Linux X11 置顶策略：

```ts
window.setAlwaysOnTop(true)
window.setVisibleOnAllWorkspaces(true)
```

点击穿透：

```ts
window.setIgnoreMouseEvents(enabled, { forward: true })
```

## 9. 素材系统

第一版使用 spritesheet。

目录示例：

```text
assets/pets/default/
  manifest.json
  idle/
    idle.json
    idle.png
  walk/
    walk.json
    walk.png
  click/
    click.json
    click.png
  sleep/
    sleep.json
    sleep.png
```

`manifest.json` 示例：

```json
{
  "id": "default",
  "name": "Default Pet",
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
    "walk": {
      "type": "spritesheet",
      "json": "walk/walk.json",
      "fps": 16,
      "loop": true
    },
    "click": {
      "type": "spritesheet",
      "json": "click/click.json",
      "fps": 18,
      "loop": false
    },
    "sleep": {
      "type": "spritesheet",
      "json": "sleep/sleep.json",
      "fps": 8,
      "loop": true
    }
  }
}
```

后续扩展 Live2D 时，可以新增动画类型：

```json
{
  "type": "live2d",
  "model": "model/model3.json"
}
```

因此素材加载器不要写死成只支持 PNG。

## 10. 配置存储

使用 `electron-store`。

配置模型：

```ts
export type AppSettings = {
  pet: {
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
    autoWalk: boolean
    actionFrequency: number
    sleepEnabled: boolean
  }
  system: {
    autoLaunch: boolean
    startHidden: boolean
    closeToTray: boolean
  }
}
```

配置要求：

- 重启后保留宠物位置。
- 重启后保留大小、透明度、置顶状态。
- 点击穿透必须可以通过托盘恢复。
- 配置读写只通过主进程统一处理，渲染进程通过 IPC 访问。

## 11. 打包方案

### 11.1 package scripts

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

### 11.2 electron-builder

```yaml
appId: com.yourcompany.desktoppet
productName: Desktop Pet

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

macOS 暂不加入首版构建流程。代码中保留 `macosAdapter`，但不打包、不测试、不承诺支持。

## 12. MVP 验收标准

### 12.1 Windows

- 宠物窗口透明。
- 宠物窗口无边框。
- 宠物窗口始终置顶。
- 宠物窗口不显示在任务栏。
- 可以拖拽移动。
- 点击宠物能触发动作。
- 点击穿透可以切换。
- 托盘可以显示、隐藏、设置、退出。
- 设置保存后重启仍然生效。
- 可以打包成 Windows 安装包。

### 12.2 Linux X11

- 检测到 X11 后正常启动。
- 宠物窗口透明。
- 宠物窗口无边框。
- 宠物窗口尽量稳定置顶。
- 可以拖拽移动。
- 点击宠物能触发动作。
- 点击穿透可以切换。
- 托盘可用。
- 设置保存后重启仍然生效。
- 可以打包成 AppImage 和 deb。

### 12.3 Linux Wayland

- 检测到 Wayland。
- 明确提示暂不支持。
- 不进入半可用、半损坏状态。

## 13. 开发顺序

建议按以下顺序开发：

```text
1. 搭建 Electron + React + TypeScript + electron-vite 项目
2. 创建透明无边框宠物窗口
3. 增加平台检测，只允许 Windows 和 Linux X11
4. 增加托盘菜单
5. 接入 PixiJS 渲染宠物
6. 实现 idle / clickReact / dragging 基础状态
7. 实现拖拽移动和位置保存
8. 实现设置窗口
9. 实现点击穿透开关
10. 实现随机行为和 sleep 状态
11. 增加 Windows 打包
12. 增加 Linux AppImage/deb 打包
13. 增加 macOS adapter 占位实现
```

## 14. 后续扩展方向

第一版完成后可以扩展：

- 多宠物切换
- 换装系统
- Live2D 模型支持
- 音效系统
- 用户自定义素材导入
- 插件系统
- AI 对话
- 日程提醒
- 天气互动
- 素材市场
- 云同步

这些功能不要进入 MVP，否则第一版范围会过大。

## 15. 最终定案

```text
采用 Electron 做桌宠软件。
首发支持 Windows 和 Linux X11。
Linux Wayland 明确不支持。
macOS 只保留平台适配口子。
移动端不考虑。

技术栈：
Electron + TypeScript + React + PixiJS + electron-vite + electron-builder

第一版目标：
透明置顶宠物窗口 + 托盘 + PixiJS 动画 + 点击互动 + 拖拽 + 设置保存 + Windows/Linux 打包。
```
