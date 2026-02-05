# 类型声明

类型声明可以提高代码的可读性和安全性。

## 标量类型

```php
<?php
function add(int $a, int $b): int
{
    return $a + $b;
}

function greet(string $name): string
{
    return "Hello, $name";
}

function isActive(bool $status): bool
{
    return $status;
}
?>
```

## 复合类型

```php
<?php
// 数组
function process(array $data): array
{
    return $data;
}

// 可调用
function execute(callable $callback)
{
    return $callback();
}
?>
```

## 联合类型（PHP 8.0+）

```php
<?php
function process(string|int $value): string|int
{
    return $value;
}
?>
```

## 可空类型

```php
<?php
function findUser(?int $id): ?User
{
    if ($id === null) {
        return null;
    }
    return User::find($id);
}
?>
```

## 返回类型

```php
<?php
function getUser(): User
{
    return new User();
}

function getUsers(): array
{
    return [];
}
?>
```

## 下一步

学习生成器 → [生成器](/advanced/generators)
