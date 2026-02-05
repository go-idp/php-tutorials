# 控制器

控制器负责处理请求并返回响应。

## 创建控制器

### 基本控制器

```php
<?php
namespace app\controller;

class Index
{
    public function index()
    {
        return 'Hello ThinkPHP';
    }
}
?>
```

### 使用命令行创建

```bash
php think make:controller Index
```

## 控制器方法

```php
<?php
namespace app\controller;

class User
{
    public function index()
    {
        return '用户列表';
    }
    
    public function create()
    {
        return '创建用户';
    }
    
    public function show($id)
    {
        return "用户 ID: {$id}";
    }
}
?>
```

## 获取请求数据

```php
<?php
namespace app\controller;

use think\Request;

class User
{
    public function create(Request $request)
    {
        // 获取 GET 参数
        $id = $request->param('id');
        
        // 获取 POST 数据
        $name = $request->post('name');
        
        // 获取所有参数
        $data = $request->param();
        
        return json($data);
    }
}
?>
```

## 返回响应

### 返回字符串

```php
<?php
public function index()
{
    return 'Hello World';
}
?>
```

### 返回 JSON

```php
<?php
public function index()
{
    return json(['status' => 'success', 'data' => []]);
}
?>
```

### 返回视图

```php
<?php
public function index()
{
    return view('index', ['name' => 'ThinkPHP']);
}
?>
```

### 重定向

```php
<?php
public function index()
{
    return redirect('/user');
}
?>
```

## 控制器中间件

```php
<?php
namespace app\controller;

class User
{
    protected $middleware = [
        'auth' => ['except' => ['login', 'register']],
    ];
}
?>
```

## 下一步

学习模型 → [模型](/thinkphp/models)
