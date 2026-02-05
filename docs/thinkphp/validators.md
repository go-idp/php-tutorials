# 验证器

验证器用于验证请求数据的有效性。

## 创建验证器

```bash
php think make:validate User
```

## 定义验证规则

```php
<?php
namespace app\validate;

use think\Validate;

class User extends Validate
{
    protected $rule = [
        'name' => 'require|max:25',
        'email' => 'require|email',
        'age' => 'require|number|between:1,120',
    ];
    
    protected $message = [
        'name.require' => '姓名不能为空',
        'email.email' => '邮箱格式不正确',
    ];
}
?>
```

## 使用验证器

```php
<?php
namespace app\controller;

use app\validate\User as UserValidate;
use think\Request;

class User
{
    public function create(Request $request, UserValidate $validate)
    {
        $data = $request->post();
        
        if (!$validate->check($data)) {
            return json(['error' => $validate->getError()]);
        }
        
        // 验证通过，处理数据
    }
}
?>
```

## 常用验证规则

- `require` - 必填
- `number` - 数字
- `email` - 邮箱
- `url` - URL
- `max:25` - 最大长度
- `min:5` - 最小长度
- `between:1,100` - 范围

## 下一步

学习中间件 → [中间件](/thinkphp/middleware)
