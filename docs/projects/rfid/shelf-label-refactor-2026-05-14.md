---
tags:
  - 项目记录
  - RFID
description: 日期：2026-05-14
---

# 层架标签管理改造记录

日期：2026-05-14

## 本次需求

将 `层架标签管理` 从原来的静态页面改造成和 `档案标签管理` 类似的真实业务页面。

后端接口和业务流程基本参考 `档案标签管理`，但层架标签的绑定粒度不是“整架一条”，而是：

- 架体左侧 / 右侧
- 每一节
- 每一层

也就是一个可绑定单元 = `shelfId + direction + section + layer`

## 需求修正过程

一开始先按“整架绑定”做了一版实现，后面确认这不是最终需求。

用户明确要求：

- 列表不是一行一个架体
- 而是一行一个架体内部位置
- 位置维度是 `左右侧 + 节 + 层`

所以后续把整套层架标签逻辑重构成了“位置级绑定”。

## 最终实现结果

### 1. 后端

新增并接入了层架标签管理相关模型、接口和服务，位置级字段包括：

- `shelfId`
- `direction`
- `section`
- `layer`
- `tagType`
- `tagCode`

当前层架绑定表的唯一识别逻辑已经改成：

`层架ID + 左右侧 + 节 + 层 + 标签类型`

后端实现内容包括：

- 层架位置列表查询
- 标签绑定
- 标签解绑
- 标签换绑
- 标签可绑定校验
- 标签批量解析
- 绑定日志记录

列表接口会根据架体配置自动展开：

- 左侧：`1..LeftSectionNum` × `1..LeftLayerNum`
- 右侧：`1..RightSectionNum` × `1..RightLayerNum`

也就是每个可用位置都生成一条列表记录。

### 2. 前端

`层架标签管理` 页面已接入真实接口，不再使用静态假数据。

当前页面能力：

- 根据标签类型筛选：`HF / UHF`
- 根据绑定状态筛选：`全部 / 已绑定 / 未绑定`
- 根据树节点过滤：库房 / 库区 / 架体
- 搜索架体名称、编号、位置
- 单条绑定
- 单条换绑
- 单条解绑
- 批量绑定
- 批量换绑
- 批量解绑

页面展示调整结果：

- 不再单独显示“位置”列
- 位置直接拼接在层架名称下方路径后面
- 当前展示形式类似：

`测试层级/测试库区/左侧/1节/2层`

并且已经去掉了路径里重复拼接的 `JT-10` 这类架体编号，避免名称和路径重复。

## 主要改动文件

### 后端项目

项目路径：

`/home/gl/桌面/rfid/smart-doc-vault-rfid`

主要文件：

- `model/system/shelf_rfid.go`
- `model/system/request/shelf_rfid.go`
- `model/system/response/shelf_rfid.go`
- `service/system/shelf_rfid.go`
- `api/system/shelf_rfid.go`
- `router/system/shelf.go`
- `api/system/enter.go`
- `service/system/enter.go`
- `initialize/gorm.go`

### 前端项目

项目路径：

`/home/gl/桌面/rfid/fit-archive-ng-rfid-gl`

主要文件：

- `src/api/ArchivesManagement/overview/File/index.ts`
- `src/api/ArchivesManagement/overview/File/index.d.ts`
- `src/views/ArchivesManagement/maintain/ShelfLabeManagement/index.vue`
- `src/views/ArchivesManagement/maintain/ShelfLabeManagement/components/ReplaceTagModal.vue`
- `src/views/ArchivesManagement/maintain/ShelfLabeManagement/components/BatchReplaceTagModal.vue`
- `src/views/ArchivesManagement/maintain/ShelfLabeManagement/components/BatchBindTagModal.vue`
- `src/views/ArchivesManagement/maintain/ShelfLabeManagement/components/UnbindTagModal.vue`

## 与档案标签管理的关系

本次层架标签管理基本复用了档案标签管理的设计思路：

- 标签实体统一走 RFID 标签表
- 绑定前先做标签可用性校验
- 已绑定标签禁止重复绑定到其他目标
- 支持绑定、解绑、换绑
- 所有操作都写日志
- 列表支持绑定状态统计

不同点在于：

- 档案标签管理的绑定对象是 `archiveId`
- 层架标签管理的绑定对象是 `shelfId + direction + section + layer`

## 验证结果

### 后端验证

已执行：

```bash
cd /home/gl/桌面/rfid/smart-doc-vault-rfid
go test ./api/system ./service/system ./model/system ./model/system/request ./model/system/response ./router/system ./initialize -run TestDoesNotExist
```

结果：通过

### 前端验证

已执行：

```bash
cd /home/gl/桌面/rfid/fit-archive-ng-rfid-gl
pnpm run build
```

结果：通过

说明：

- 构建过程中有项目原本就存在的 Sass 和打包 warning
- 但本次层架标签管理改造没有阻塞构建

## 当前注意事项

### 1. 旧的“整架绑定”思路已经废弃

当前代码已经按“位置级绑定”工作，后续不要再按“一整个架体对应一个标签”继续扩展。

### 2. 数据表语义已变化

`sys_shelf_rfid_binding` 现在承载的是“层架位置绑定”，不是“整架绑定”。

如果数据库里之前落过测试用的整架绑定数据，后续需要注意数据清理或重建，避免和现在的位置级结构混用。

### 3. 当前未细化到“格”

这次需求只做到：

- 左右侧
- 节
- 层

没有继续细分到 `cell/格`。

如果后面业务再要求“每格一个标签”，需要继续扩展绑定主键和列表展开逻辑。

## 后续可继续做的事

- 接入标签打印
- 增加层架标签操作日志页面
- 增加位置级批量导出
- 增加数据库历史数据迁移脚本
- 如果有需要，再补“格”这一层级

## 一句话总结

今天完成的是：把层架标签管理正式改造成和档案标签管理一致的真实业务页面，并把绑定粒度从“整架”修正为“架体内左右侧的每节每层”。
