# HTTP 基础

HTTP（HyperText Transfer Protocol）是 Web 开发的基础协议。了解 HTTP 对于 PHP Web 开发至关重要。

## HTTP 协议简介

HTTP 是客户端和服务器之间通信的协议：

- **请求（Request）**：客户端向服务器发送请求
- **响应（Response）**：服务器返回响应给客户端

## HTTP 方法

### GET 请求

用于获取资源：

```php
<?php
// 获取 GET 参数
$name = $_GET['name'] ?? 'Guest';
echo "Hello, $name";
?>
```

### POST 请求

用于提交数据：

```php
<?php
// 获取 POST 数据
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
?>
```

### 其他方法

- `PUT` - 更新资源
- `DELETE` - 删除资源
- `PATCH` - 部分更新

## 请求头

```php
<?php
// 获取请求头
$headers = getallheaders();
$userAgent = $_SERVER['HTTP_USER_AGENT'];
$accept = $_SERVER['HTTP_ACCEPT'];
?>
```

## 响应头

```php
<?php
// 设置响应头
header("Content-Type: application/json");
header("Location: http://example.com");
header("HTTP/1.1 404 Not Found");
?>
```

## HTTP 状态码

```php
<?php
// 200 OK
http_response_code(200);

// 404 Not Found
http_response_code(404);

// 500 Internal Server Error
http_response_code(500);
?>
```

## 下一步

学习请求与响应处理 → [请求与响应](/web/request-response)
