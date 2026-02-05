# 事件系统

事件系统提供了观察者模式的实现。

## 定义事件

```php
<?php
namespace app\event;

class UserLogin
{
    public $user;
    
    public function __construct($user)
    {
        $this->user = $user;
    }
}
?>
```

## 定义监听器

```php
<?php
namespace app\listener;

use app\event\UserLogin;

class SendLoginNotification
{
    public function handle(UserLogin $event)
    {
        // 发送登录通知
        echo "用户 {$event->user->name} 已登录";
    }
}
?>
```

## 注册事件

编辑 `app/event.php`：

```php
<?php
return [
    'UserLogin' => [
        \app\listener\SendLoginNotification::class,
    ],
];
?>
```

## 触发事件

```php
<?php
use think\facade\Event;

Event::trigger('UserLogin', $user);
?>
```

## 下一步

学习服务容器 → [服务容器](/thinkphp/container)
