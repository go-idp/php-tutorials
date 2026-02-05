# 请求与响应

PHP 提供了超全局变量来处理 HTTP 请求和响应。

## 超全局变量

### $_GET

获取 URL 参数：

```php
<?php
// URL: http://example.com?name=John&age=25
$name = $_GET['name'];  // "John"
$age = $_GET['age'];    // "25"

// 安全获取（带默认值）
$name = $_GET['name'] ?? 'Guest';
?>
```

### $_POST

获取 POST 数据：

```php
<?php
// 表单提交
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';

// 处理表单
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 处理 POST 请求
}
?>
```

### $_REQUEST

包含 GET、POST 和 COOKIE 数据（不推荐使用，安全性较低）。

### $_SERVER

服务器和执行环境信息：

```php
<?php
$_SERVER['REQUEST_METHOD'];    // 请求方法
$_SERVER['REQUEST_URI'];       // 请求 URI
$_SERVER['HTTP_HOST'];         // 主机名
$_SERVER['REMOTE_ADDR'];       // 客户端 IP
$_SERVER['HTTP_USER_AGENT'];   // 用户代理
?>
```

## 处理 JSON 请求

```php
<?php
// 接收 JSON 数据
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// 返回 JSON 响应
header('Content-Type: application/json');
echo json_encode(['status' => 'success', 'data' => $data]);
?>
```

## 文件上传

```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    
    if ($file['error'] === UPLOAD_ERR_OK) {
        $tmpName = $file['tmp_name'];
        $name = $file['name'];
        $size = $file['size'];
        
        // 移动文件
        move_uploaded_file($tmpName, "uploads/$name");
    }
}
?>
```

## 响应处理

### 设置响应头

```php
<?php
// 内容类型
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

// 重定向
header('Location: http://example.com');

// 缓存控制
header('Cache-Control: no-cache, must-revalidate');
?>
```

### 输出内容

```php
<?php
// echo
echo "Hello World";

// print
print "Hello World";

// printf
printf("Hello, %s", $name);
?>
```

## 下一步

学习 Cookie 与 Session → [Cookie 与 Session](/web/cookie-session)
