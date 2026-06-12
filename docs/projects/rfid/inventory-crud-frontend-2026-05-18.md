---
tags:
  - 项目记录
  - RFID
  - 前端
description: 日期：2026-05-18
---

# 盘点单 CRUD 前端记录

日期：2026-05-18

## 这次前端做了什么

这次盘点单前端已经完成了增删改查的主流程接入，核心页面包括：

- 列表页：展示盘点单、筛选、搜索、删除、进入编辑、打开详情
- 新增/编辑页：同一个页面同时承载“新建盘点单”和“编辑盘点单”
- 详情弹窗：从列表页点开后查看当前盘点单详情

这次还顺手收掉了一个共享页面状态问题：

- 编辑成功后如果点“继续新建”，不能只依赖路由跳转来重置页面
- 现在已经改成显式重置表单状态
- 并且编辑成功时不再显示“继续新建”，只在新增成功时展示

## 前端页面结构

前端项目路径：

`/home/gl/桌面/rfid/fit-archive-ng-rfid-gl`

本次盘点单相关核心文件：

- `src/views/ArchivesManagement/maintain/InventoryPlan/index.vue`
- `src/views/ArchivesManagement/maintain/InventoryPlan/add.vue`
- `src/views/ArchivesManagement/maintain/InventoryTask/components/InventoryDetailModal.vue`
- `src/api/ArchivesManagement/maintain/InventoryPlan/index.ts`

## 1. 列表页

文件：

`src/views/ArchivesManagement/maintain/InventoryPlan/index.vue`

这个页面负责“查”和“删”，同时也是“编辑”和“详情”的入口。

当前页面能力：

- 状态 tab 切换：全部 / 待执行 / 执行中 / 已完成 / 已关闭
- 模式筛选：全部 / 范围 / 精确
- 搜索：按盘点单名称或编号搜索
- 新建盘点单
- 删除盘点单
- 待执行状态下进入编辑
- 打开详情弹窗

页面真实调用接口：

- 获取列表：`getInventoryPlanList`
- 删除：`deleteInventoryPlan`

交互规则：

- 编辑入口只允许 `pending` 状态
- 非 `pending` 状态点击编辑会提示：`仅待执行的盘点单允许编辑`
- 删除操作走二次确认弹窗
- 点击卡片主体会打开详情弹窗

## 2. 新增 / 编辑共用页

文件：

`src/views/ArchivesManagement/maintain/InventoryPlan/add.vue`

这个页面是盘点单的核心录入页，新增和编辑写在同一个文件里。

判断逻辑：

- 如果路由里有 `id`，就按编辑处理
- 如果没有 `id`，就按新增处理

也就是说：

- 新增路由：`/ArchivesManagement/ArchivesManagementList/maintain/InventoryPlan/add`
- 编辑路由：同一个路由，额外带 `query.id`

页面分 4 步：

- 基本信息
- 选择范围
- 核对信息
- 完成

### 第 1 步：基本信息

录入字段：

- `name`：计划名称
- `executorId`：执行人
- `mode`：盘点模式，`scope / precise`
- `rules`
- `remark`

规则开关包括：

- `manualMark`
- `manualLocation`
- `allowAdd`
- `filterBorrowed`
- `filterDestroyed`

执行人列表通过 `FileUserInfo` 拉取，页面会默认选第一个执行人。

### 第 2 步：选择范围

通过：

- `Step2.vue`

把选中的档案列表回填到：

- `inventoryList`

前端提交时真正上传的是：

- `archiveIds`

也就是把当前选中的档案对象数组映射成档案 ID 数组后发给后端。

### 第 3 步：核对信息

这里只做最终确认，不再改动数据结构。

前端会把：

- 计划名称
- 盘点模式
- 执行人
- 档案数量
- 规则开关状态

统一展示出来，确认后提交。

### 第 4 步：完成页

这里是提交成功后的收口页。

当前逻辑已经整理成：

- 新增成功：显示“继续创建”和“返回”
- 编辑成功：只显示“返回”

这样更符合业务语义，避免编辑结束后出现一个容易误解的“继续新建”按钮。

## 3. 新增和编辑的提交逻辑

前端 API 文件：

`src/api/ArchivesManagement/maintain/InventoryPlan/index.ts`

当前已接入接口：

- `createInventoryPlan`
- `updateInventoryPlan`
- `deleteInventoryPlan`
- `getInventoryPlanDetail`
- `getInventoryPlanList`

提交时的数据结构统一是：

```ts
{
  name,
  executorId,
  mode,
  rules,
  archiveIds,
  remark
}
```
 
区别只有：

- 新增：调用 `createInventoryPlan(payload)`
- 编辑：调用 `updateInventoryPlan({ id, ...payload })`

## 4. 编辑回填逻辑

编辑页打开时，前端会先调用：

- `getInventoryPlanDetail(id)`

然后把后端返回的详情回填到页面状态里，包括：

- `form.name`
- `form.executorId`
- `form.mode`
- `form.remark`
- `form.rules`
- `inventoryList`

也就是说，编辑页展示的档案范围不是重新选出来的，而是基于详情接口返回的 `items` 重新组装的。

## 5. 这次修掉的共享页状态问题

问题本质：

- `add.vue` 同时承载新增和编辑
- 完成后的“继续新建”以前只是 `router.push` 到新增路由
- 它默认假设组件会被重建
- 一旦以后页面被缓存或同实例复用，就可能残留上一次编辑的数据

现在已经改成：

- 提供显式的重置函数
- 主动清空 `name / mode / remark / rules / inventoryList / creating`
- 执行人回到默认值
- 再跳回新增路由

同时补了一条产品层面的约束：

- 编辑成功后不显示“继续新建”

这样前端行为更稳，也更符合用户认知。

## 6. 详情弹窗

文件：

- `src/views/ArchivesManagement/maintain/InventoryTask/components/InventoryDetailModal.vue`
- `src/views/ArchivesManagement/maintain/InventoryTask/components/InventoryWorkbenchContent.vue`

当前盘点单详情不是单独的新页面，而是列表页里打开的一个 Arco Design 简洁弹窗。

现在的弹窗特点：

- 使用 `a-modal simple`
- 不显示默认标题栏
- 关闭后卸载内容
- 内部承载的是盘点工作台内容组件

也就是说：

- 列表页负责打开弹窗
- 详情数据和右侧档案内容由内部内容组件继续承接

### 详情数据来源

详情弹窗打开时，前端调用：

- `getInventoryPlanDetail(id)`

接口返回的 `items` 会转换成详情列表数据。

详情列表里几个关键字段：

- 档案名称：`item.name`
- 档案编号：`item.code`
- 具体位置：`item.locationName`
- RFID：`item.rfid`
- 盘点结果：`item.inventoryResult`

注意：

- 详情里的位置直接显示 `locationName`
- 不要在前端额外加“档案完整位置”等文案
- 后端已经负责把 `locationName` 补到具体层位
- 普通密集架至少到 `节/层`
- 有格信息时继续到 `格`
- 回转柜到 `层/格`

### 详情状态筛选

详情里的状态筛选使用盘点结果字段：

- `inventoryResult`

不要用档案自身的 `status` 来做盘点结果判断。

当前前端筛选项：

- 全部
- 正常
- 盘亏
- 位置变化
- 盘盈
- 未知
- 未盘点

字段关系：

- `status`：档案自身状态，例如在库、借出、销毁
- `inventoryResult`：本次盘点结果，例如正常、盘亏、位置变化

详情列表的状态标签、筛选统计、筛选结果都应该基于 `inventoryResult`。

### 详情左侧树和记录数

详情弹窗左侧树默认是总层级。

顶部记录数区域显示：

- `共 X 条记录`
- 后面跟当前选中的层级名称

当前层级名称来自左侧树选中项；没有选中具体节点时显示总层级。

## 7. 前端接口一览

盘点单前端接口路径都在：

`src/api/ArchivesManagement/maintain/InventoryPlan/index.ts`

当前接口如下：

- 新增：`POST /inventoryPlan/create`
- 编辑：`POST /inventoryPlan/update`
- 列表：`POST /inventoryPlan/getList`
- 详情：`POST /inventoryPlan/getDetail`
- 删除：`POST /inventoryPlan/delete`

## 8. 如果后面还要改，优先看哪里

如果要改列表行为，先看：

- `src/views/ArchivesManagement/maintain/InventoryPlan/index.vue`

如果要改新增/编辑流程，先看：

- `src/views/ArchivesManagement/maintain/InventoryPlan/add.vue`

如果要改接口字段，先看：

- `src/api/ArchivesManagement/maintain/InventoryPlan/index.ts`

如果要改详情弹窗壳子，先看：

- `src/views/ArchivesManagement/maintain/InventoryTask/components/InventoryDetailModal.vue`

## 一句话总结

盘点单前端现在已经具备真实 CRUD 主流程：列表查询、创建、编辑、删除、详情查看都已接入，而且新增/编辑共用页的状态重置问题也已经收掉；详情弹窗里位置显示使用后端返回的 `locationName`，盘点结果显示和筛选使用 `inventoryResult`，后续继续迭代时重点就是围绕 `index.vue + add.vue + API 封装 + InventoryWorkbenchContent.vue` 这几块走。
