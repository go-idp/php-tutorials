# Cookie 与 Session

Cookie 和 Session 用于在客户端和服务器之间保持状态。

## Cookie

### 设置 Cookie

```php
<?php
// 基本用法
setcookie("username", "John", time() + 3600);

// 完整参数
setcookie(
    "username",           // 名称
    "John",               // 值
    time() + 3600,        // 过期时间
    "/",                  // 路径
    "example.com",        // 域名
    true,                 // 仅 HTTPS
    true                  // 仅 HTTP 访问
);
?>
```

### 读取 Cookie

```php
<?php
$username = $_COOKIE['username'] ?? 'Guest';
?>
```

### 删除 Cookie

```php
<?php
setcookie("username", "", time() - 3600);
?>
```

## Session

### 启动 Session

```php
<?php
session_start();

// 设置 Session 变量
$_SESSION['username'] = 'John';
$_SESSION['user_id'] = 123;
?>
```

### 读取 Session

```php
<?php
session_start();

$username = $_SESSION['username'] ?? null;
?>
```

### 删除 Session

```php
<?php
session_start();

// 删除单个变量
unset($_SESSION['username']);

// 删除所有 Session
session_destroy();
?>
```

### Session 配置

```php
<?php
// 设置 Session 过期时间
ini_set('session.gc_maxlifetime', 3600);

// 设置 Session 保存路径
ini_set('session.save_path', '/tmp/sessions');
?>
```

## 安全注意事项

1. **Cookie 安全**
   - 使用 HTTPS
   - 设置 HttpOnly 标志
   - 设置 Secure 标志

2. **Session 安全**
   - 使用安全的 Session ID
   - 定期更新 Session ID
   - 防止 Session 固定攻击

## 下一步

学习文件上传 → [文件上传](/web/file-upload)
