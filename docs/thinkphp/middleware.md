# 中间件

中间件用于在请求处理前后执行特定逻辑。

## 创建中间件

```bash
php think make:middleware Auth
```

## 定义中间件

```php
<?php
namespace app\middleware;

class Auth
{
    public function handle($request, \Closure $next)
    {
        // 前置操作
        if (!session('user')) {
            return redirect('/login');
        }
        
        // 继续执行
        $response = $next($request);
        
        // 后置操作
        return $response;
    }
}
?>
```

## 注册中间件

### 全局中间件

编辑 `app/middleware.php`：

```php
<?php
return [
    \app\middleware\Auth::class,
];
?>
```

### 路由中间件

```php
<?php
use think\facade\Route;

Route::get('admin', 'admin/index')
    ->middleware(\app\middleware\Auth::class);
?>
```

### 控制器中间件

```php
<?php
namespace app\controller;

class Admin
{
    protected $middleware = [
        \app\middleware\Auth::class,
    ];
}
?>
```

## 下一步

学习缓存系统 → [缓存系统](/thinkphp/cache)
