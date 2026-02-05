# 路由系统

路由定义了 URL 与控制器方法的映射关系。

## 路由模式

### 普通模式

```
http://localhost/index.php/index/index
```

### PATHINFO 模式（默认）

```
http://localhost/index.php/index/index
```

### 路由模式

```
http://localhost/index/index
```

## 定义路由

### 在 route/app.php 中定义

```php
<?php
use think\facade\Route;

// 基本路由
Route::get('hello', 'index/hello');
Route::post('user', 'user/create');

// 路由组
Route::group('api', function () {
    Route::get('users', 'api/user/index');
    Route::post('users', 'api/user/create');
});

// RESTful 路由
Route::resource('posts', 'Post');
?>
```

## 路由参数

### 必选参数

```php
<?php
Route::get('user/:id', 'user/show');
// 访问: /user/123
?>
```

### 可选参数

```php
<?php
Route::get('blog/:year/[:month]', 'blog/archive');
// 访问: /blog/2024 或 /blog/2024/01
?>
```

### 参数约束

```php
<?php
Route::get('user/:id', 'user/show')
    ->pattern(['id' => '\d+']);
?>
```

## 路由别名

```php
<?php
Route::get('user/:id', 'user/show')
    ->name('user.show');
?>
```

使用别名生成 URL：

```php
<?php
url('user.show', ['id' => 1]);
?>
```

## 路由中间件

```php
<?php
Route::get('admin', 'admin/index')
    ->middleware('auth');
?>
```

## 下一步

学习控制器 → [控制器](/thinkphp/controllers)
