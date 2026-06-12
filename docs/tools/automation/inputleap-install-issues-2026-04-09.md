---
tags:
  - 工具
  - InputLeap
description: InputLeap 安装和联通问题速查
---

# InputLeap 问题速查

## 网络 / 代理

现象：下载失败、TLS 异常、仓库更新报错。

检查：

```bash
env | grep -i proxy
```

处理：

- 临时关闭代理后重试
- 把局域网 IP 或目标域名加入 `NO_PROXY`
- 检查 `http_proxy`、`https_proxy`、`all_proxy`、`no_proxy`

## VM 影响联通

现象：开 VMware 后两端 ping 不通或端口不通。

重点检查：

```bash
ip addr
ip route
ping <对端IP>
```

处理：

- 检查 `vmnet8`、`vmnet1` 是否抢路由
- 需要同局域网时优先试桥接模式
- 临时关闭虚拟网卡验证
- 检查防火墙和 InputLeap 端口
