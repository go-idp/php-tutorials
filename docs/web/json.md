# JSON 处理

JSON（JavaScript Object Notation）是常用的数据交换格式。

## 编码为 JSON

```php
<?php
$data = [
    'name' => 'John',
    'age' => 25,
    'city' => 'Beijing'
];

$json = json_encode($data);
echo $json;
// 输出: {"name":"John","age":25,"city":"Beijing"}
?>
```

### 格式化输出

```php
<?php
$json = json_encode($data, JSON_PRETTY_PRINT);
?>
```

## 解码 JSON

```php
<?php
$json = '{"name":"John","age":25,"city":"Beijing"}';
$data = json_decode($json, true);  // 返回数组

echo $data['name'];  // John
?>
```

### 返回对象

```php
<?php
$json = '{"name":"John","age":25}';
$obj = json_decode($json);  // 返回对象

echo $obj->name;  // John
?>
```

## 处理 JSON 错误

```php
<?php
$json = '{"name":"John"}';
$data = json_decode($json, true);

if (json_last_error() === JSON_ERROR_NONE) {
    echo "JSON 有效";
} else {
    echo "JSON 错误: " . json_last_error_msg();
}
?>
```

## 从文件读取 JSON

```php
<?php
$json = file_get_contents('data.json');
$data = json_decode($json, true);
?>
```

## 写入 JSON 文件

```php
<?php
$data = ['name' => 'John', 'age' => 25];
$json = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents('data.json', $json);
?>
```

## 下一步

学习正则表达式 → [正则表达式](/web/regex)
