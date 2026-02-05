# ORM

ORM（Object-Relational Mapping）提供了面向对象的方式操作数据库。

## 定义模型

```php
<?php
namespace app\model;

use think\Model;

class User extends Model
{
    protected $table = 'users';
    protected $pk = 'id';
}
?>
```

## 模型关联

### 一对一关联

```php
<?php
// User 模型
public function profile()
{
    return $this->hasOne(Profile::class);
}

// Profile 模型
public function user()
{
    return $this->belongsTo(User::class);
}
?>
```

### 一对多关联

```php
<?php
// User 模型
public function posts()
{
    return $this->hasMany(Post::class);
}
?>
```

### 多对多关联

```php
<?php
// User 模型
public function roles()
{
    return $this->belongsToMany(Role::class);
}
?>
```

## 使用关联

```php
<?php
// 预加载关联
$user = User::with('profile')->find(1);

// 访问关联数据
echo $user->profile->bio;

// 延迟加载
$user = User::find(1);
$profile = $user->profile;
?>
```

## 下一步

学习验证器 → [验证器](/thinkphp/validators)
