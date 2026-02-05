# 数据库操作

ThinkPHP 提供了强大的数据库操作功能。

## 配置数据库

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

## 使用 Db 门面

```php
<?php
use think\facade\Db;

// 查询
$users = Db::table('users')->select();

// 插入
Db::table('users')->insert(['name' => 'John']);

// 更新
Db::table('users')->where('id', 1)->update(['name' => 'Jane']);

// 删除
Db::table('users')->where('id', 1)->delete();
?>
```

## 使用模型

```php
<?php
use app\model\User;

// 查询
$users = User::select();

// 插入
User::create(['name' => 'John']);

// 更新
User::where('id', 1)->update(['name' => 'Jane']);

// 删除
User::destroy(1);
?>
```

## 下一步

学习查询构造器 → [查询构造器](/thinkphp/query-builder)
