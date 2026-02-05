# XSS 防护

XSS（Cross-Site Scripting）是常见的 Web 安全漏洞。

## 什么是 XSS？

XSS 攻击通过在网页中注入恶意脚本，窃取用户信息或执行恶意操作。

## XSS 类型

### 存储型 XSS

恶意脚本存储在服务器上：

```php
<?php
// 危险示例
echo $_GET['comment'];  // 如果包含 <script>alert('XSS')</script>
?>
```

### 反射型 XSS

恶意脚本通过 URL 参数反射：

```php
<?php
// 危险示例
echo "搜索: " . $_GET['q'];
?>
```

## 防护方法

### 转义输出

```php
<?php
// HTML 转义
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');

// 使用函数
function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}
?>
```

### 内容安全策略（CSP）

```php
<?php
header("Content-Security-Policy: default-src 'self'");
?>
```

### 验证输入

```php
<?php
$input = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
?>
```

## 下一步

学习 CSRF 防护 → [CSRF 防护](/advanced/csrf)
