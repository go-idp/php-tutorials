# CSRF 防护

CSRF（Cross-Site Request Forgery）是跨站请求伪造攻击。

## 什么是 CSRF？

攻击者诱导用户执行非预期的操作。

## 防护方法

### Token 验证

```php
<?php
// 生成 Token
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

// 在表单中
echo '<input type="hidden" name="csrf_token" value="' . $_SESSION['csrf_token'] . '">';

// 验证 Token
if ($_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    die('CSRF token validation failed');
}
?>
```

### SameSite Cookie

```php
<?php
setcookie('session', $value, [
    'samesite' => 'Strict',
    'secure' => true,
    'httponly' => true
]);
?>
```

### 验证 Referer

```php
<?php
$referer = $_SERVER['HTTP_REFERER'] ?? '';
if (!str_starts_with($referer, 'https://yourdomain.com')) {
    die('Invalid referer');
}
?>
```

## 下一步

学习密码加密 → [密码加密](/advanced/password-encryption)
