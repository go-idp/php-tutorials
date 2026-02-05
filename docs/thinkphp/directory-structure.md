# 目录结构

了解 ThinkPHP 的目录结构有助于更好地组织代码。

## 标准目录结构

```
project/
├── app/                    # 应用目录
│   ├── controller/         # 控制器目录
│   ├── model/              # 模型目录
│   ├── view/               # 视图目录
│   ├── middleware/         # 中间件目录
│   ├── validate/           # 验证器目录
│   └── common.php          # 公共函数文件
├── config/                 # 配置目录
│   ├── app.php             # 应用配置
│   ├── database.php        # 数据库配置
│   ├── route.php          # 路由配置
│   └── cache.php          # 缓存配置
├── public/                 # 入口文件目录
│   └── index.php          # 入口文件
├── route/                  # 路由定义目录
│   └── app.php            # 应用路由
├── runtime/                # 运行时目录
│   ├── cache/             # 缓存文件
│   ├── log/               # 日志文件
│   └── temp/              # 临时文件
└── vendor/                 # Composer 依赖
```

## 目录说明

### app 目录

应用的核心目录，包含：

- `controller/` - 控制器类
- `model/` - 模型类
- `view/` - 视图模板
- `middleware/` - 中间件
- `validate/` - 验证器

### config 目录

存放所有配置文件：

- `app.php` - 应用配置
- `database.php` - 数据库配置
- `route.php` - 路由配置
- `cache.php` - 缓存配置

### public 目录

Web 服务器的入口目录，包含：

- `index.php` - 应用入口文件
- 静态资源文件（CSS、JS、图片等）

### route 目录

路由定义文件：

- `app.php` - 应用路由定义

### runtime 目录

运行时生成的文件：

- `cache/` - 缓存文件
- `log/` - 日志文件
- `temp/` - 临时文件

## 下一步

学习路由系统 → [路由系统](/thinkphp/routing)
