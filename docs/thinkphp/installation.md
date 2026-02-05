# 安装与配置

本章介绍如何安装和配置 ThinkPHP 框架。

## 环境要求

- PHP >= 7.2.5
- PDO PHP Extension
- MBstring PHP Extension
- CURL PHP Extension

## 使用 Composer 安装

### 创建项目

```bash
composer create-project topthink/think tp
```

### 进入项目目录

```bash
cd tp
```

## 目录结构

安装后的目录结构：

```
tp/
├── app/              # 应用目录
│   ├── controller/   # 控制器
│   ├── model/        # 模型
│   └── view/         # 视图
├── config/           # 配置文件
├── public/           # 入口文件目录
├── route/            # 路由定义
├── runtime/          # 运行时文件
└── vendor/           # 第三方库
```

## 配置应用

### 应用配置

编辑 `config/app.php`：

```php
<?php
return [
    'app_name' => 'My Application',
    'app_debug' => true,
    'default_timezone' => 'Asia/Shanghai',
];
?>
```

### 数据库配置

编辑 `config/database.php`：

```php
<?php
return [
    'default' => 'mysql',
    'connections' => [
        'mysql' => [
            'type' => 'mysql',
            'hostname' => '127.0.0.1',
            'database' => 'database',
            'username' => 'root',
            'password' => 'password',
            'charset' => 'utf8mb4',
        ],
    ],
];
?>
```

## 运行应用

### 启动开发服务器

```bash
php think run
```

访问：`http://localhost:8000`

### 使用 PHP 内置服务器

```bash
php -S localhost:8000 -t public
```

## 下一步

了解目录结构 → [目录结构](/thinkphp/directory-structure)
