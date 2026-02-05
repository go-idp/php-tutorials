# 字符串处理

PHP 提供了丰富的字符串处理函数。

## 字符串创建

```php
<?php
$str1 = "双引号字符串";
$str2 = '单引号字符串';
$str3 = <<<EOT
多行字符串
可以包含多行内容
EOT;
?>
```

## 字符串连接

```php
<?php
$str1 = "Hello";
$str2 = "World";

$result = $str1 . " " . $str2;  // "Hello World"
$str1 .= " PHP";                 // $str1 = "Hello PHP"
?>
```

## 字符串长度

```php
<?php
$str = "Hello";
echo strlen($str);  // 5

// 多字节字符串
echo mb_strlen("你好");  // 2
?>
```

## 字符串查找

```php
<?php
$str = "Hello World";

// 查找位置
strpos($str, "World");     // 6
stripos($str, "world");    // 不区分大小写

// 检查是否包含
str_contains($str, "World");  // true (PHP 8.0+)
?>
```

## 字符串替换

```php
<?php
$str = "Hello World";

// 替换
str_replace("World", "PHP", $str);        // "Hello PHP"
str_ireplace("world", "PHP", $str);       // 不区分大小写

// 替换多个
str_replace(["Hello", "World"], ["Hi", "PHP"], $str);
?>
```

## 字符串截取

```php
<?php
$str = "Hello World";

// 截取
substr($str, 0, 5);        // "Hello"
substr($str, 6);           // "World"

// 多字节截取
mb_substr("你好世界", 0, 2);  // "你好"
?>
```

## 大小写转换

```php
<?php
$str = "Hello World";

strtoupper($str);   // "HELLO WORLD"
strtolower($str);   // "hello world"
ucfirst($str);      // "Hello world"
ucwords($str);      // "Hello World"
?>
```

## 去除空白

```php
<?php
$str = "  Hello World  ";

trim($str);      // "Hello World"
ltrim($str);     // "Hello World  "
rtrim($str);     // "  Hello World"
?>
```

## 字符串分割

```php
<?php
$str = "apple,banana,orange";

// 分割为数组
$fruits = explode(",", $str);

// 数组转字符串
$str = implode(",", $fruits);
?>
```

## 字符串格式化

```php
<?php
// sprintf
$name = "John";
$age = 25;
$message = sprintf("姓名: %s, 年龄: %d", $name, $age);

// printf
printf("姓名: %s, 年龄: %d", $name, $age);
?>
```

## 字符串验证

```php
<?php
$email = "user@example.com";

// 验证邮箱
filter_var($email, FILTER_VALIDATE_EMAIL);

// 验证 URL
filter_var($url, FILTER_VALIDATE_URL);

// 检查是否为数字
is_numeric($str);
?>
```

## 下一步

完成 PHP 基础后，开始学习 Web 开发 → [HTTP 基础](/web/http-basics)
