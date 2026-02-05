# 正则表达式

正则表达式用于模式匹配和文本处理。

## 基本语法

### preg_match()

```php
<?php
$pattern = '/hello/';
$text = "hello world";

if (preg_match($pattern, $text)) {
    echo "匹配成功";
}
?>
```

### 常用模式

```php
<?php
// 匹配数字
preg_match('/\d+/', $text);

// 匹配字母
preg_match('/[a-zA-Z]+/', $text);

// 匹配邮箱
preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email);

// 匹配手机号（中国）
preg_match('/^1[3-9]\d{9}$/', $phone);
?>
```

## 查找匹配

### preg_match_all()

```php
<?php
$text = "The numbers are 123 and 456";
preg_match_all('/\d+/', $text, $matches);
print_r($matches[0]);  // [123, 456]
?>
```

## 替换

### preg_replace()

```php
<?php
$text = "Hello World";
$newText = preg_replace('/World/', 'PHP', $text);
echo $newText;  // "Hello PHP"
?>
```

### 多个替换

```php
<?php
$text = "apple, banana, orange";
$newText = preg_replace(['/apple/', '/banana/'], ['Apple', 'Banana'], $text);
?>
```

## 分割

### preg_split()

```php
<?php
$text = "apple,banana,orange";
$fruits = preg_split('/,/', $text);
print_r($fruits);
?>
```

## 常用模式示例

```php
<?php
// 验证邮箱
function isValidEmail($email) {
    return preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email);
}

// 验证手机号
function isValidPhone($phone) {
    return preg_match('/^1[3-9]\d{9}$/', $phone);
}

// 提取 URL
preg_match('/https?:\/\/[^\s]+/', $text, $matches);

// 提取 HTML 标签内容
preg_match('/<h1>(.*?)<\/h1>/', $html, $matches);
?>
```

## 下一步

完成 Web 开发基础后，开始学习 ThinkPHP 框架 → [ThinkPHP 介绍](/thinkphp/introduction)
