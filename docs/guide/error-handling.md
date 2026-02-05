# 错误处理

PHP 提供了多种错误处理机制，帮助开发者调试和处理运行时错误。

## 错误类型

### 错误级别

- `E_ERROR` - 致命错误
- `E_WARNING` - 警告
- `E_NOTICE` - 通知
- `E_PARSE` - 解析错误
- `E_STRICT` - 严格标准
- `E_DEPRECATED` - 已弃用

## 错误报告

### 配置错误报告

```php
<?php
// 显示所有错误
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 关闭错误显示（生产环境）
ini_set('display_errors', 0);
ini_set('log_errors', 1);
?>
```

### php.ini 配置

```ini
display_errors = Off
log_errors = On
error_log = /var/log/php_errors.log
```

## 异常处理

### try...catch

```php
<?php
try {
    $result = 10 / 0;
} catch (DivisionByZeroError $e) {
    echo "错误: " . $e->getMessage();
}
?>
```

### 多个 catch

```php
<?php
try {
    // 代码
} catch (InvalidArgumentException $e) {
    // 处理参数错误
} catch (RuntimeException $e) {
    // 处理运行时错误
} catch (Exception $e) {
    // 处理其他异常
}
?>
```

### finally

```php
<?php
try {
    // 代码
} catch (Exception $e) {
    // 处理异常
} finally {
    // 无论是否异常都会执行
    echo "清理工作";
}
?>
```

## 抛出异常

```php
<?php
function divide($a, $b) {
    if ($b == 0) {
        throw new Exception("除数不能为零");
    }
    return $a / $b;
}

try {
    $result = divide(10, 0);
} catch (Exception $e) {
    echo $e->getMessage();
}
?>
```

## 自定义异常类

```php
<?php
class CustomException extends Exception {
    public function errorMessage() {
        return "自定义错误: " . $this->getMessage();
    }
}

try {
    throw new CustomException("发生错误");
} catch (CustomException $e) {
    echo $e->errorMessage();
}
?>
```

## 错误处理函数

### set_error_handler()

```php
<?php
function customErrorHandler($errno, $errstr, $errfile, $errline) {
    echo "错误 [$errno]: $errstr 在 $errfile 的第 $errline 行";
    return true;
}

set_error_handler("customErrorHandler");
?>
```

### set_exception_handler()

```php
<?php
function customExceptionHandler($exception) {
    echo "未捕获的异常: " . $exception->getMessage();
}

set_exception_handler("customExceptionHandler");
?>
```

## 错误日志

```php
<?php
// 记录错误到日志
error_log("发生错误: " . $errorMessage);

// 发送邮件
error_log("错误信息", 1, "admin@example.com");
?>
```

## 下一步

学习日期时间处理 → [日期时间](/guide/datetime)
