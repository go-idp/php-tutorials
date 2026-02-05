# 密码加密

正确加密密码是保护用户数据的关键。

## 不要使用的方法

```php
<?php
// 错误！不要使用这些方法
md5($password);
sha1($password);
base64_encode($password);
?>
```

## 正确方法：使用 password_hash()

```php
<?php
// 加密密码
$hash = password_hash($password, PASSWORD_DEFAULT);

// 验证密码
if (password_verify($password, $hash)) {
    // 密码正确
}
?>
```

## 选项说明

```php
<?php
// 使用 BCRYPT（默认）
$hash = password_hash($password, PASSWORD_BCRYPT);

// 指定成本
$options = ['cost' => 12];
$hash = password_hash($password, PASSWORD_BCRYPT, $options);

// 使用 ARGON2
$hash = password_hash($password, PASSWORD_ARGON2ID);
?>
```

## 重新加密

```php
<?php
if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {
    $newHash = password_hash($password, PASSWORD_DEFAULT);
    // 更新数据库中的哈希值
}
?>
```

## 下一步

学习现代 PHP → [现代 PHP](/advanced/modern-php)
