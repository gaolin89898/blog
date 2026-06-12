---
tags:
  - 项目记录
  - 数据库迁移
description: 创建时间：2026-05-21 17:36 CST
---

# 授权动态化数据库迁移方案

创建时间：2026-05-21 17:36 CST

## 背景

当前后端授权菜单是写死在代码里的，核心文件是：

- `/home/gl/桌面/rfid/smart-doc-vault-rfid/config/authorized.go`
- `/home/gl/桌面/rfid/smart-doc-vault-rfid/authorize/common.go`

现在流程是：

1. 前端申请授权文件时，把授权功能拼成字符串，例如 `实体档案管理系统(手动密集架)-RFID管理`。
2. 后端生成授权文件，把这个字符串写入 `authorizedInfo.extra.code`。
3. 激活授权文件时，后端解密授权文件。
4. 后端用 `strings.Split(code, "-")` 拆出授权分类。
5. `authorize/common.go` 通过 `switch case` 找到对应的 `config.xxxPer.Menus`。
6. 后端用这些菜单 path 去 `sys_menu` 查菜单 ID。
7. 后端把查到的菜单 ID 绑定给角色。

问题是：只要菜单变动、路径变动、或者新增类似 `RFID管理` 的分类，就必须改 Go 代码并重新编译。

目标是把“授权分类”和“分类包含哪些菜单/API”迁移到数据库，让授权分类可以动态维护。

## 目标

把授权配置从代码迁移到数据库。

迁移后：

- 授权文件仍然负责声明“允许哪些授权分类”。
- 数据库负责配置“每个授权分类包含哪些菜单和 API 权限”。
- 新增授权分类不需要改 `config/authorized.go`。
- 菜单 path 变化后，只需要调整数据库关联，不需要重发后端。
- 前端授权功能列表可以从接口动态获取，不再写死 `authMode`。

## 推荐数据模型

### 1. 授权分类表

表名：`sys_authorized_package`

用于保存授权功能分类，例如：

- 实体档案管理系统(手动密集架)
- 实体档案管理系统(智能密集架)
- RFID管理
- 微型库房环控检测

推荐字段：

```sql
CREATE TABLE sys_authorized_package (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  created_at DATETIME(3) NULL,
  updated_at DATETIME(3) NULL,
  deleted_at DATETIME(3) NULL,
  code VARCHAR(64) NOT NULL COMMENT '稳定授权编码，例如 archive_manual、rfid',
  name VARCHAR(128) NOT NULL COMMENT '授权功能显示名称，例如 RFID管理',
  remark VARCHAR(255) NOT NULL DEFAULT '' COMMENT '备注',
  enabled TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否启用',
  sort INT NOT NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (id),
  UNIQUE KEY uk_sys_authorized_package_code (code),
  UNIQUE KEY uk_sys_authorized_package_name (name),
  KEY idx_sys_authorized_package_deleted_at (deleted_at),
  KEY idx_sys_authorized_package_enabled_sort (enabled, sort)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. 授权分类和菜单关联表

表名：`sys_authorized_package_menu`

用于保存“某个授权分类包含哪些菜单”。

推荐字段：

```sql
CREATE TABLE sys_authorized_package_menu (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  created_at DATETIME(3) NULL,
  updated_at DATETIME(3) NULL,
  package_id BIGINT UNSIGNED NOT NULL COMMENT '授权分类ID',
  menu_id BIGINT UNSIGNED NOT NULL COMMENT 'sys_menu.id',
  PRIMARY KEY (id),
  UNIQUE KEY uk_authorized_package_menu (package_id, menu_id),
  KEY idx_authorized_package_menu_menu_id (menu_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3. 授权分类和 API 分组关联表

当前项目授权 API 主要按 `sys_api.api_group` 查询，不是精确到单个 API。

所以先建 API 分组关联表即可。

表名：`sys_authorized_package_api_group`

```sql
CREATE TABLE sys_authorized_package_api_group (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  created_at DATETIME(3) NULL,
  updated_at DATETIME(3) NULL,
  package_id BIGINT UNSIGNED NOT NULL COMMENT '授权分类ID',
  api_group VARCHAR(64) NOT NULL COMMENT 'sys_api.api_group',
  PRIMARY KEY (id),
  UNIQUE KEY uk_authorized_package_api_group (package_id, api_group),
  KEY idx_authorized_package_api_group_group (api_group)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

后续如果要精确到接口，可以再补一张：

```sql
sys_authorized_package_api(package_id, api_id)
```

但第一版不建议过度设计，先按现有 `api_group` 模型迁移。

## Go Model 建议

新增文件：

```text
model/system/authorized_package.go
```

建议结构：

```go
type AuthorizedPackageModel struct {
    global.MODEL
    Code    string `json:"code" gorm:"size:64;uniqueIndex;not null;comment:稳定授权编码"`
    Name    string `json:"name" gorm:"size:128;uniqueIndex;not null;comment:授权功能显示名称"`
    Remark  string `json:"remark" gorm:"size:255;not null;default:'';comment:备注"`
    Enabled bool   `json:"enabled" gorm:"index;not null;default:true;comment:是否启用"`
    Sort    int    `json:"sort" gorm:"index;not null;default:0;comment:排序"`
    Menus   []*MenuModel `json:"menus" gorm:"many2many:sys_authorized_package_menu;joinForeignKey:PackageID;joinReferences:MenuID"`
}

func (AuthorizedPackageModel) TableName() string {
    return "sys_authorized_package"
}

type AuthorizedPackageAPIGroupModel struct {
    global.MODEL
    PackageID uint   `json:"packageId" gorm:"index;not null;comment:授权分类ID"`
    APIGroup  string `json:"apiGroup" gorm:"size:64;index;not null;comment:API分组"`
}

func (AuthorizedPackageAPIGroupModel) TableName() string {
    return "sys_authorized_package_api_group"
}
```

注意：关联表 `sys_authorized_package_menu` 如果只做 many2many，不一定必须写 model；但如果要手写迁移和 seed，单独建 model 会更清楚。

## Migration 建议

新增迁移文件：

```text
migrate/m20260521_authorized_packages.go
```

并在：

```text
migrate/migrations.go
```

末尾注册：

```go
m20260521AuthorizedPackages,
```

迁移做两件事：

1. `AutoMigrate` 新表。
2. 初始化现有授权分类和关联菜单。

## 初始化授权分类

第一版建议保留当前授权文件里的中文名称兼容老授权文件。

也就是说，`code` 可以先等于中文名称，避免老授权文件失效：

| code | name |
|---|---|
| 工作台 | 工作台 |
| 3D巡检 | 3D巡检 |
| ⼩库房十防监测系统 | ⼩库房十防监测系统 |
| 实体档案管理系统(手动密集架) | 实体档案管理系统(手动密集架) |
| 实体档案管理系统(智能密集架) | 实体档案管理系统(智能密集架) |
| 实体档案+数字化档案管理系统(手动密集架) | 实体档案+数字化档案管理系统(手动密集架) |
| 实体档案+数字化档案管理系统(智能密集架) | 实体档案+数字化档案管理系统(智能密集架) |
| 智档宝档案管理系统 | 智档宝档案管理系统 |
| 微型库房环控检测 | 微型库房环控检测 |
| td27 | td27 |
| RFID管理 | RFID管理 |

第二阶段再把 `code` 改成稳定英文编码：

| code | name |
|---|---|
| archive_manual | 实体档案管理系统(手动密集架) |
| archive_smart | 实体档案管理系统(智能密集架) |
| archive_electronic_manual | 实体档案+数字化档案管理系统(手动密集架) |
| archive_electronic_smart | 实体档案+数字化档案管理系统(智能密集架) |
| smart_doc_vault | 智档宝档案管理系统 |
| micro_env | 微型库房环控检测 |
| rfid | RFID管理 |

为了兼容老授权文件，可以做一个别名表，或者在后端 lookup 时同时匹配 `code IN (?) OR name IN (?)`。

第一版推荐简单稳妥：`code` 先用现在授权文件里的中文字符串。

## RFID 分类菜单初始化

`RFID管理` 应该包含：

```text
/ArchivesManagement
/ArchivesManagement/ArchivesManagementList
/ArchivesManagement/ArchivesManagementList/maintain
/ArchivesManagement/ArchivesManagementList/maintain/ArchiveTagManagement/:id
/ArchivesManagement/ArchivesManagementList/maintain/ShelfLabeManagement/:id
/ArchivesManagement/ArchivesManagementList/maintain/ArchiveTagManagement
/ArchivesManagement/ArchivesManagementList/maintain/ShelfLabeManagement
```

原因：

- 前三个是父级菜单，否则前端菜单树可能无法正常展开。
- 后四个是档案标签和层架标签的真实业务页面。

## 档案类授权菜单初始化原则

档案类授权建议包含档案业务主体菜单，但不包含 RFID 标签管理菜单。

也就是说，以下菜单应该从档案类套餐里拆出来，只放到 `RFID管理`：

```text
/ArchivesManagement/ArchivesManagementList/maintain/ArchiveTagManagement/:id
/ArchivesManagement/ArchivesManagementList/maintain/ShelfLabeManagement/:id
/ArchivesManagement/ArchivesManagementList/maintain/ArchiveTagManagement
/ArchivesManagement/ArchivesManagementList/maintain/ShelfLabeManagement
```

这样客户只买档案系统时，不会默认拿到 RFID 标签管理。

如果客户买档案系统 + RFID，则授权文件里应该包含：

```text
实体档案管理系统(手动密集架)-RFID管理
```

## 后端改造点

### 1. 替换 `authorize/common.go` 的 switch case

当前逻辑：

```go
switch v {
case config.AuthorizedLabelArchiveManual:
    query config.ArchivePer.Menus
case config.AuthorizedLabelRFID:
    query config.RFIDPer.Menus
}
```

迁移后改成：

```text
拿到授权文件里的分类 code 列表
    ↓
查 sys_authorized_package where enabled = 1 and (code in ? or name in ?)
    ↓
查 package 对应 menu_id
    ↓
查 package 对应 api_group，再查 sys_api.id
    ↓
合并 BasePer 基础菜单
    ↓
返回 menuIDs 和 apiIDs
```

建议保留函数签名：

```go
func GetMenuRoleIDs(spliceCode []string) (menuIDs []uint, apiIDs []uint, err error)
```

这样 `service/authorized/authorized.go` 和 `initialize/initauth.go` 不需要大改。

### 2. 新增动态查询函数

建议拆成：

```go
func getDynamicAuthorizedPackageIDs(codes []string) ([]uint, error)
func getDynamicAuthorizedMenuIDs(packageIDs []uint) ([]uint, error)
func getDynamicAuthorizedAPIIDs(packageIDs []uint) ([]uint, error)
```

这样可测试性更好。

### 3. 保留 BasePer

当前 `BasePer` 是基础菜单：

```text
/SystemManagement
/SystemManagementList
/SystemManagement/systemMan
/SystemManagement/basicInfo
```

建议第一版继续保留在代码里。

原因：

- 基础菜单是兜底能力，不属于客户购买模块。
- 激活授权后至少需要有基础设置入口。

第二阶段也可以把 `BasePer` 做成一个内置 package，比如 `base`。

### 4. 兼容旧授权文件

旧授权文件里 `extra.code` 是中文名称，例如：

```text
实体档案管理系统(手动密集架)-RFID管理
```

所以查询时必须支持中文名称。

推荐 SQL 条件：

```sql
WHERE enabled = 1
  AND deleted_at IS NULL
  AND (code IN (?) OR name IN (?))
```

这样后面即使 code 换成英文，只要 name 还保留中文，老授权文件也能用。

## 前端改造点

当前前端写死了授权选项：

- `/home/gl/桌面/rfid/fit-archive-ng-rfid-gl/src/views/Login/components/empower.vue`
- `/home/gl/桌面/rfid/fit-archive-ng-rfid-gl/src/views/Login/components/uploadFile.vue`

建议新增接口：

```text
GET /authorized/packages
```

返回：

```json
{
  "code": 0,
  "data": [
    {
      "code": "实体档案管理系统(手动密集架)",
      "name": "实体档案管理系统(手动密集架)",
      "remark": "",
      "sort": 40
    },
    {
      "code": "RFID管理",
      "name": "RFID管理",
      "remark": "档案标签和层架标签管理",
      "sort": 90
    }
  ]
}
```

前端 checkbox：

```vue
<a-checkbox :value="item.code">{{ item.name }}</a-checkbox>
```

生成授权文件时继续提交：

```json
{
  "extra": {
    "code": "实体档案管理系统(手动密集架)-RFID管理"
  }
}
```

为了兼容当前后端，第一版仍然使用 `-` 拼接。

## 授权分类管理接口

第一版可以只做只读接口：

```text
GET /authorized/packages
```

后续如果要做后台维护页面，再加：

```text
POST /authorized/packages
PUT /authorized/packages/:id
DELETE /authorized/packages/:id
POST /authorized/packages/:id/menus
POST /authorized/packages/:id/api-groups
```

但是第一版不建议一次做太大。

先把“代码写死”迁到“数据库 seed + 动态读取”，风险最小。

## 后台维护页面建议

后续可以在系统设置里新增：

```text
系统设置 / 授权分类管理
```

页面能力：

- 授权分类列表
- 新增/编辑授权分类
- 启用/禁用授权分类
- 配置分类包含哪些菜单
- 配置分类包含哪些 API 分组

权限控制：

- 只允许超级管理员使用。
- 不建议开放给普通项目管理员。

## 安全边界

动态授权不是让数据库随便绕过授权。

必须保持以下边界：

1. 授权文件仍然必须经过签名校验。
2. 授权文件决定“允许哪些授权分类”。
3. 数据库只决定“这个分类包含哪些菜单/API”。
4. 普通用户不能修改授权分类配置。
5. 修改授权分类配置应该记录操作日志。

一个风险例子：

如果普通管理员可以把所有菜单都塞进 `RFID管理`，那客户只买 RFID 也能拿到全部系统。

所以授权分类维护必须是交付/超级管理员能力，不能给普通业务管理员。

## 推荐实施顺序

### 第一步：建表和 seed

新增：

```text
model/system/authorized_package.go
migrate/m20260521_authorized_packages.go
```

迁移内容：

- 创建 `sys_authorized_package`
- 创建 `sys_authorized_package_menu`
- 创建 `sys_authorized_package_api_group`
- 初始化当前所有授权分类
- 按当前 `sys_menu.path` 初始化菜单关联
- 初始化 API 分组关联

### 第二步：后端动态读取

修改：

```text
authorize/common.go
```

把原来的 `switch case` 替换为数据库查询。

为了回滚方便，可以先保留旧逻辑兜底：

```text
优先查数据库
如果数据库没有初始化任何授权分类，再走旧 switch case
```

等验证稳定后，再删旧硬编码。

### 第三步：新增授权分类列表接口

新增：

```text
GET /authorized/packages
```

用于前端动态展示授权功能。

### 第四步：前端改动态

修改：

```text
src/views/Login/components/empower.vue
src/views/Login/components/uploadFile.vue
```

把 `authMode` 写死数组改成接口加载。

### 第五步：验证授权激活

至少验证这些组合：

1. 只授权 `实体档案管理系统(手动密集架)`
   - 不应该看到 RFID 标签管理。
2. 只授权 `RFID管理`
   - 应该能看到 RFID 标签管理相关菜单。
   - 应该带上档案管理父级菜单。
3. 授权 `实体档案管理系统(手动密集架)-RFID管理`
   - 应该同时看到档案业务菜单和 RFID 菜单。
4. 老授权文件仍然能激活。
5. 数据库里禁用某个 package 后，授权时不应该分配该 package 的菜单。

## 回滚方案

迁移期间建议保留旧代码常量和旧 switch 兜底。

回滚方式：

1. 如果新表没数据或异常，后端自动走旧 `config.xxxPer`。
2. 如果动态接口异常，前端可以保留默认静态 `authMode` 作为 fallback。
3. 新表不删除旧菜单、不改变 `sys_menu`，所以回滚风险较低。

## 需要注意的现有菜单问题

当前数据库中发现过一个菜单配置问题：

```text
ArchivesManagement/maintain/ArchiveTagManagement/index.vue/:id
```

这个 `/:id` 不应该放在 `component` 后面，应该只放在 `path` 里。

正确应该类似：

```text
path      = /ArchivesManagement/ArchivesManagementList/maintain/ArchiveTagManagement/:id
component = ArchivesManagement/maintain/ArchiveTagManagement/index.vue
```

这不是动态授权迁移的核心，但如果迁移后菜单仍然 404，需要优先检查 `sys_menu.component`。

## 最小可交付版本

第一版建议只做到：

- 建三张授权配置表。
- seed 当前授权分类。
- `GetMenuRoleIDs` 改为查数据库。
- 新增 `GET /authorized/packages`。
- 前端授权功能列表改成接口返回。

暂时不做授权分类维护页面。

这样工作量可控，且能马上解决“每次新增分类都要改代码”的问题。

## 结论

授权动态化可以做，而且适合当前项目。

最稳的迁移方式是：

1. 保留授权文件签名机制。
2. 保留 `extra.code` 结构。
3. 把分类和菜单/API 的映射迁移到数据库。
4. 第一版兼容中文 code，保证老授权文件可用。
5. 等稳定后再逐步改成英文稳定 code 和后台维护页面。
