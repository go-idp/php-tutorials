# PHP 8.x 新特性

PHP 8.x 引入了许多新特性和改进。

## PHP 8.0 新特性

### 命名参数

```php
<?php
function createUser(string $name, string $email, int $age = 0) { }

// 使用命名参数
createUser(name: 'John', email: 'john@example.com');
?>
```

### 联合类型

```php
<?php
function process(string|int $value) { }
?>
```

### Match 表达式

```php
<?php
$result = match ($status) {
    'success' => '操作成功',
    'error' => '操作失败',
    default => '未知状态'
};
?>
```

### 构造器属性提升

```php
<?php
class User
{
    public function __construct(
        public string $name,
        public string $email
    ) {}
}
?>
```

## PHP 8.1 新特性

### 枚举

```php
<?php
enum Status: string
{
    case PENDING = 'pending';
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
}
?>
```

### 只读属性

```php
<?php
class User
{
    public readonly string $id;
}
?>
```

## PHP 8.2 新特性

### 只读类

```php
<?php
readonly class User
{
    public string $name;
    public string $email;
}
?>
```

## 下一步

学习类型声明 → [类型声明](/advanced/type-declarations)
