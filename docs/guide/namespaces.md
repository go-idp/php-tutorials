# 命名空间

命名空间用于组织代码，避免类名、函数名和常量名的冲突。

## 定义命名空间

```php
<?php
namespace App\Models;

class User {
    // ...
}
?>
```

## 使用命名空间

### 完全限定名称

```php
<?php
$user = new \App\Models\User();
?>
```

### use 语句

```php
<?php
use App\Models\User;

$user = new User();
?>
```

### 别名

```php
<?php
use App\Models\User as UserModel;

$user = new UserModel();
?>
```

## 子命名空间

```php
<?php
namespace App\Models;

class User {
    // ...
}

namespace App\Controllers;

class UserController {
    // ...
}
?>
```

## 全局命名空间

使用反斜杠 `\` 访问全局命名空间：

```php
<?php
namespace App;

$date = new \DateTime();  // 使用全局的 DateTime 类
?>
```

## 命名空间常量

```php
<?php
namespace App;

const VERSION = "1.0.0";

echo VERSION;           // 当前命名空间
echo \App\VERSION;     // 完全限定名称
?>
```

## 自动加载

使用 Composer 自动加载：

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    }
}
```

## 下一步

学习文件操作 → [文件操作](/guide/file-operations)
