# MVC 模式深入

MVC（Model-View-Controller）是一种架构模式。

## 组件说明

### Model（模型）

负责数据和业务逻辑：

```php
<?php
class UserModel
{
    public function getUser($id)
    {
        // 数据库查询
        return $user;
    }
    
    public function saveUser($data)
    {
        // 保存用户
    }
}
?>
```

### View（视图）

负责展示数据：

```php
<?php
class UserView
{
    public function render($user)
    {
        echo "Name: {$user['name']}";
        echo "Email: {$user['email']}";
    }
}
?>
```

### Controller（控制器）

负责处理请求和协调模型与视图：

```php
<?php
class UserController
{
    private $model;
    private $view;
    
    public function __construct()
    {
        $this->model = new UserModel();
        $this->view = new UserView();
    }
    
    public function show($id)
    {
        $user = $this->model->getUser($id);
        $this->view->render($user);
    }
}
?>
```

## MVC 优势

- 分离关注点
- 代码复用
- 易于测试
- 易于维护

## 下一步

学习性能优化 → [性能优化](/advanced/performance)
