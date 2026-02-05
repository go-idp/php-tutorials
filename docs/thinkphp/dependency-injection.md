# 依赖注入

依赖注入是一种设计模式，用于管理对象之间的依赖关系。

## 构造函数注入

```php
<?php
namespace app\controller;

use app\service\UserService;

class User
{
    protected $userService;
    
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    
    public function index()
    {
        return $this->userService->getAll();
    }
}
?>
```

## 方法注入

```php
<?php
namespace app\controller;

use app\service\UserService;
use think\Request;

class User
{
    public function create(Request $request, UserService $userService)
    {
        $data = $request->post();
        return $userService->create($data);
    }
}
?>
```

## 属性注入

```php
<?php
namespace app\controller;

use app\service\UserService;
use think\annotation\Inject;

class User
{
    #[Inject]
    protected UserService $userService;
}
?>
```

## 下一步

学习实战项目 → [实战：博客系统](/thinkphp/practice-blog)
