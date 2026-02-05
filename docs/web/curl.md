# cURL 扩展

cURL 用于发送 HTTP 请求，与外部 API 交互。

## 基本用法

```php
<?php
// 初始化 cURL
$ch = curl_init();

// 设置 URL
curl_setopt($ch, CURLOPT_URL, "https://api.example.com/data");

// 设置选项
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// 执行请求
$response = curl_exec($ch);

// 检查错误
if (curl_errno($ch)) {
    echo "错误: " . curl_error($ch);
}

// 获取 HTTP 状态码
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// 关闭 cURL
curl_close($ch);

echo $response;
?>
```

## GET 请求

```php
<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.example.com/users?id=1");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
?>
```

## POST 请求

```php
<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.example.com/users");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'name' => 'John',
    'email' => 'john@example.com'
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
?>
```

## 发送 JSON

```php
<?php
$data = json_encode(['name' => 'John', 'email' => 'john@example.com']);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.example.com/users");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data)
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
?>
```

## 设置请求头

```php
<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.example.com/data");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer token123',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
?>
```

## 下一步

学习 JSON 处理 → [JSON 处理](/web/json)
