# 模型

模型用于处理数据库操作。

## 创建模型

### 基本模型

```php
<?php
namespace app\model;

use think\Model;

class User extends Model
{
    // 表名（可选，默认使用类名）
    protected $table = 'users';
    
    // 主键（可选，默认为 id）
    protected $pk = 'id';
}
?>
```

### 使用命令行创建

```bash
php think make:model User
```

## 查询数据

### 查询单条记录

```php
<?php
$user = User::find(1);
$user = User::where('id', 1)->find();
?>
```

### 查询多条记录

```php
<?php
$users = User::select();
$users = User::where('status', 1)->select();
?>
```

## 新增数据

```php
<?php
// 方式一
$user = new User();
$user->name = 'John';
$user->email = 'john@example.com';
$user->save();

// 方式二
$user = User::create([
    'name' => 'John',
    'email' => 'john@example.com'
]);

// 方式三
User::insert([
    'name' => 'John',
    'email' => 'john@example.com'
]);
?>
```

## 更新数据

```php
<?php
// 方式一
$user = User::find(1);
$user->name = 'Jane';
$user->save();

// 方式二
User::where('id', 1)->update(['name' => 'Jane']);
?>
```

## 删除数据

```php
<?php
// 方式一
$user = User::find(1);
$user->delete();

// 方式二
User::destroy(1);
User::where('id', 1)->delete();
?>
```

## 下一步

学习视图 → [视图](/thinkphp/views)
