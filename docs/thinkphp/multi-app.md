# 多应用模式

多应用模式允许在同一个项目中运行多个应用。

## 启用多应用

编辑 `config/app.php`：

```php
<?php
return [
    'app_namespace' => 'app',
    'auto_multi_app' => true,
];
?>
```

## 应用目录结构

```
app/
├── index/          # 前台应用
│   ├── controller/
│   └── model/
├── admin/          # 后台应用
│   ├── controller/
│   └── model/
└── api/            # API 应用
    ├── controller/
    └── model/
```

## 访问应用

```
http://localhost/index/        # 前台
http://localhost/admin/        # 后台
http://localhost/api/          # API
```

## 应用配置

每个应用可以有独立的配置文件：

```
app/
├── index/
│   └── config/
└── admin/
    └── config/
```

## 下一步

学习命令行工具 → [命令行工具](/thinkphp/console)
