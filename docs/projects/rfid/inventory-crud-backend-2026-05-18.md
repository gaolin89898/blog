---
tags:
  - 项目记录
  - RFID
  - 后端
description: 日期：2026-05-18
---

# 盘点单 CRUD 后端记录

日期：2026-05-18

## 这次后端做了什么

这次盘点单后端已经把增删改查主接口补齐并接入到公共路由里，前端现在调用的是一套真实接口，不是本地假数据。

当前后端已经覆盖：

- 新建盘点单
- 编辑盘点单
- 获取盘点单列表
- 获取盘点单详情
- 删除盘点单

## 后端项目位置

后端项目路径：

`/home/gl/桌面/rfid/smart-doc-vault-rfid`

这次盘点单 CRUD 相关核心文件：

- `router/system/common.go`
- `api/system/inventory_plan.go`
- `service/system/inventory_plan.go`
- `model/system/request/inventory_plan.go`
- `model/system/response/inventory_plan.go`
- `initialize/gorm.go`

## 1. 接口路由

注册位置：

`router/system/common.go`

当前盘点单接口统一挂在：

- `POST /inventoryPlan/create`
- `POST /inventoryPlan/update`
- `POST /inventoryPlan/getList`
- `POST /inventoryPlan/getDetail`
- `POST /inventoryPlan/delete`

这意味着前端所有盘点单 CRUD 请求现在都是走同一套路由前缀。

## 2. API 层职责

文件：

`api/system/inventory_plan.go`

这个文件主要负责三件事：

- 绑定请求参数
- 做基础校验
- 调 service 返回统一响应

### Create

这个接口用于新建盘点单。

前端发送：

- `name`
- `executorId`
- `mode`
- `rules`
- `archiveIds`
- `remark`

后端会：

- 校验必填字段
- 从登录态里取当前用户 ID 作为创建人
- 调 `inventoryPlanService.Create`
- 成功后返回盘点单基础信息

### Update

这个接口用于编辑盘点单。

前端发送：

- `id`
- `name`
- `executorId`
- `mode`
- `rules`
- `archiveIds`
- `remark`

后端会：

- 校验参数
- 调 `inventoryPlanService.Update`

### GetList

这个接口用于盘点单列表查询。

前端可传：

- `page`
- `pageSize`
- `search`
- `mode`
- `status`
- `myOnly`

如果 `myOnly = true`，后端会从登录态里取当前用户 ID，用来筛选“只看我的盘点单”。

### GetDetail

这个接口用于获取盘点单详情。

前端发送：

- `id`

后端返回：

- 盘点单基础信息
- 执行人信息
- 规则配置
- 档案 ID 列表
- 档案明细列表

### Delete

这个接口用于删除盘点单。

前端发送：

- `id`

后端校验通过后，调用 service 删除主表和子表数据。

## 3. 请求结构

文件：

`model/system/request/inventory_plan.go`

当前请求模型包括：

- `CreateInventoryPlanReq`
- `UpdateInventoryPlanReq`
- `InventoryPlanListReq`
- `DeleteInventoryPlanReq`
- `InventoryPlanIDReq`

规则对象字段：

- `manualMark`
- `manualLocation`
- `allowAdd`
- `filterBorrowed`
- `filterDestroyed`

这里的设计很清楚：

- 新增和编辑的字段结构基本一致
- 编辑只比新增多一个 `id`

所以前端共用一个新增/编辑页是合理的，后端接口模型也是按这个思路配合的。

## 4. 响应结构

文件：

`model/system/response/inventory_plan.go`

当前响应模型包括：

- `InventoryPlanCreateResp`
- `InventoryPlanRulesResp`
- `InventoryPlanArchiveItemResp`
- `InventoryPlanDetailResp`
- `InventoryPlanListItemResp`
- `InventoryPlanStatusStatResp`
- `InventoryPlanListResp`

### 创建 / 编辑成功返回

会返回：

- `id`
- `code`
- `name`
- `status`
- `archiveCount`

### 详情返回

会返回：

- `id`
- `code`
- `name`
- `executorId`
- `executorName`
- `mode`
- `status`
- `remark`
- `archiveCount`
- `rules`
- `archiveIds`
- `items`

这也是前端编辑页能直接回填档案范围和规则的基础。

### 列表返回

会返回：

- `list`
- `total`
- `stats`

其中 `stats` 用于前端顶部 tab 计数展示。

## 5. Service 层核心业务

文件：

`service/system/inventory_plan.go`

真正的业务规则基本都在这里。

### Create 的业务逻辑

`Create` 会做这些事情：

1. 检查是否选择了档案范围
2. 校验盘点模式是否合法，只允许：
   - `scope`
   - `precise`
3. 校验执行人是否存在
4. 对 `archiveIds` 去重
5. 查询档案并预加载位置信息、层架、库区
6. 检查档案是否真的都存在
7. 生成盘点单编号
8. 保存盘点单主表
9. 为每个档案生成一条盘点单明细快照

这里的关键点是：

- 盘点单不是只保存档案 ID
- 还会把档案名称、编号、位置、状态、RFID 等信息做快照落到明细表

这样后续即使档案本体信息变了，盘点单里的当时数据也还能保留。

### Update 的业务逻辑

`Update` 的核心规则是：

- 只有 `pending` 状态允许编辑

后端具体做法：

1. 校验盘点单 ID
2. 检查盘点单是否存在
3. 检查盘点单状态是否为 `pending`
4. 校验执行人
5. 重新校验档案范围
6. 重新生成明细快照
7. 更新主表
8. 删除旧的明细
9. 插入新的明细

所以编辑不是“局部改一点字段”，而是按最新选中的档案范围，把整张盘点单和它的子项重新整理一遍。

### GetDetail 的业务逻辑

`GetDetail` 会：

- 查盘点单主表
- 预加载执行人
- 预加载明细项
- 把明细项组装成前端要的 `items`
- 同时返回 `archiveIds`

这个接口对前端很重要，因为：

- 编辑页要靠它回填
- 详情弹窗也要靠它展示当前盘点单包含的档案数据

### GetList 的业务逻辑

`GetList` 做了两部分事情：

1. 先根据搜索条件统计各状态数量
2. 再查当前列表数据

它支持的过滤条件有：

- 搜索名称或编号
- 按模式筛选
- 按状态筛选
- `myOnly` 筛选执行人

当前列表项里：

- `creator` 默认给 `"系统"`，如果查到创建人则回真实用户名
- `assignee` 来自执行人
- `date` 用创建时间格式化成 `YYYY-MM-DD`

当前 `completedItems / surplus / loss` 这些字段还没有在这里做真实计算，先返回默认值 `0`。

### Delete 的业务逻辑

删除规则现在是：

- 执行中的盘点单不能删

也就是：

- 如果状态是 `executing`，直接返回错误：
  `执行中的盘点单请先取消，变为已关闭后再删除`

通过校验后，后端会在事务里：

- 先删 `InventoryPlanItem`
- 再删 `InventoryPlan`

## 6. 数据快照设计

这次盘点单后端有一个很重要的设计点：

- 明细表保存的是“盘点当下的档案快照”

当前快照字段包括：

- 档案 ID
- 档案名称
- 档案编号
- 位置 ID
- 位置名称
- 状态
- RFID
- 层架信息
- 库区信息

这个设计的意义是：

- 详情页不需要每次都回查档案实时表再拼
- 盘点单保存的是业务发生当时的上下文
- 更适合后续做盘点追溯

## 7. 盘点详情字段补充

盘点详情接口现在有两个字段要重点记住：

- `locationName`
- `inventoryResult`

### locationName

`locationName` 是详情里展示档案具体位置用的字段。

现在后端不会只返回库房或库区这种不完整位置，会尽量补齐到档案所在层位：

- 普通密集架：`库房路径/库区/架体/左侧或右侧/几节/几层`
- 如果档案有格信息：继续补到 `几格`
- 回转柜：`库房路径/库区/几层/几格`

实现位置：

- `service/system/inventory_plan.go`
- `buildInventoryArchiveLocation`

处理逻辑：

1. 新建盘点单时，明细快照里的 `LocationNameSnapshot` 会保存补齐后的具体位置。
2. 编辑盘点单时，重新生成明细快照，也会保存补齐后的具体位置。
3. 获取详情时，后端会按 `ArchiveID` 再查一次档案当前位置。
4. 如果档案当前库位能拼出完整位置，详情返回当前完整位置。
5. 如果拼不出来，才回退到明细快照里的 `LocationNameSnapshot`。

这样旧盘点单即使之前快照位置不完整，打开详情时也能尽量显示当前档案的完整位置。

### inventoryResult

`inventoryResult` 是盘点结果字段，详情里的状态筛选和状态标签都应该看这个字段，不应该再拿档案本身的 `status` 当盘点结果。

当前支持的业务结果：

- `正常`
- `盘亏`
- `位置变化`
- `盘盈`
- `未知`
- `未盘点`

当前创建或编辑盘点单时，所有明细默认写入：

- `inventoryResult = 未盘点`

后续进入真正执行盘点流程后，后台应该根据扫描结果更新每条明细的 `inventoryResult`。

判断方向应该是：

- 扫到并且位置一致：`正常`
- 应该在本盘点单里但没有扫到：`盘亏`
- 扫到了但位置和原位置不一致：`位置变化`
- 扫到了但不属于本盘点单范围：`盘盈`
- 数据无法明确归类或设备返回异常：`未知`
- 还没有参与扫描判断：`未盘点`

也就是说：

- `status` 表示档案自身状态，例如在库、借出、销毁等
- `inventoryResult` 表示这次盘点产生的结果

这两个字段不能混用。

## 8. 这次前后端对齐后的结果

现在前后端在盘点单 CRUD 上已经形成统一约定：

- 新增和编辑共用同一套字段
- 编辑必须传 `id`
- 详情接口返回完整回填数据
- 列表接口返回 `list + total + stats`
- 删除受状态约束
- 详情列表的位置显示使用 `locationName`
- 详情列表的盘点结果显示和筛选使用 `inventoryResult`

这也是为什么前端现在能稳定做到：

- 列表筛选
- 新增盘点单
- 编辑待执行盘点单
- 删除盘点单
- 查看详情

## 9. 后面如果还要继续改，优先看哪里

如果要改接口出入口，先看：

- `router/system/common.go`
- `api/system/inventory_plan.go`

如果要改业务规则，先看：

- `service/system/inventory_plan.go`

如果要改前后端字段契约，先看：

- `model/system/request/inventory_plan.go`
- `model/system/response/inventory_plan.go`

## 一句话总结

盘点单后端现在已经不是占位接口，而是完整的真实 CRUD 服务：主表和明细快照一起维护，编辑只允许待执行状态，删除禁止执行中状态，列表、详情、创建、更新、删除都已经形成稳定的数据契约；详情接口已经补齐 `locationName` 到具体层位，并把盘点结果独立为 `inventoryResult`，后续可以继续往“执行态盘点流程”和“统计字段真实化”上扩展。
