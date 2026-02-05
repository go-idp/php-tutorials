# 查询构造器

查询构造器提供了流畅的接口来构建和执行数据库查询。

## 基本查询

```php
<?php
use think\facade\Db;

// 查询所有
$users = Db::table('users')->select();

// 查询单条
$user = Db::table('users')->find(1);

// 查询指定字段
$users = Db::table('users')->field('id,name,email')->select();
?>
```

## WHERE 条件

```php
<?php
// 等于
Db::table('users')->where('id', 1)->select();

// 不等于
Db::table('users')->where('id', '<>', 1)->select();

// 大于
Db::table('users')->where('age', '>', 18)->select();

// IN
Db::table('users')->whereIn('id', [1, 2, 3])->select();

// LIKE
Db::table('users')->whereLike('name', '%John%')->select();
?>
```

## 排序和分页

```php
<?php
// 排序
Db::table('users')->order('id desc')->select();

// 限制数量
Db::table('users')->limit(10)->select();

// 分页
Db::table('users')->paginate(10);
?>
```

## 联表查询

```php
<?php
Db::table('users')
    ->alias('u')
    ->join('profiles p', 'u.id = p.user_id')
    ->field('u.*, p.bio')
    ->select();
?>
```

## 聚合函数

```php
<?php
// 计数
Db::table('users')->count();

// 求和
Db::table('orders')->sum('amount');

// 平均值
Db::table('scores')->avg('score');

// 最大值
Db::table('users')->max('age');

// 最小值
Db::table('users')->min('age');
?>
```

## 下一步

学习 ORM → [ORM](/thinkphp/orm)
