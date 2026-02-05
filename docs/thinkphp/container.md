# 服务容器

服务容器用于管理类的依赖和实例化。

## 绑定服务

```php
<?php
use think\Container;

// 绑定类
Container::getInstance()->bind('userService', \app\service\User::class);

// 绑定闭包
Container::getInstance()->bind('userService', function () {
    return new \app\service\User();
});
?>
```

## 解析服务

```php
<?php
use think\facade\App;

$userService = App::make('userService');
?>
```

## 依赖注入

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
}
?>
```

## 下一步

学习依赖注入 → [依赖注入](/thinkphp/dependency-injection)
