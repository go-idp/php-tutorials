# 语法基础

本章介绍 PHP 的基本语法规则和约定。

## PHP 标签

PHP 代码需要包含在标签中：

```php
<?php
// PHP 代码
?>
```

短标签（需要配置开启）：

```php
<?
// 代码
?>
```

## 注释

PHP 支持三种注释方式：

```php
<?php
// 单行注释

# 单行注释（另一种方式）

/*
 * 多行注释
 * 可以写多行
 */
?>
```

## 语句结束

PHP 语句以分号 `;` 结束：

```php
<?php
echo "Hello";
echo "World";
?>
```

## 大小写敏感性

- **变量名**：区分大小写
- **函数名、类名、关键字**：不区分大小写

```php
<?php
$name = "John";
$Name = "Jane";  // 不同的变量

echo "Hello";  // 正确
ECHO "Hello";  // 也正确
?>
```

## 代码块

使用花括号 `{}` 定义代码块：

```php
<?php
if ($condition) {
    // 代码块
}
?>
```

## 命名规范

### 变量命名

- 以 `$` 开头
- 只能包含字母、数字和下划线
- 不能以数字开头
- 区分大小写

```php
<?php
$name = "John";
$age = 25;
$user_name = "john_doe";
?>
```

### 常量命名

通常使用全大写字母：

```php
<?php
define("PI", 3.14159);
define("MAX_SIZE", 100);
?>
```

## 输出内容

使用 `echo` 或 `print` 输出：

```php
<?php
echo "Hello World";
print "Hello World";

// 输出变量
$name = "John";
echo "Hello, $name";
?>
```

## 下一步

了解变量和数据类型 → [变量与数据类型](/guide/variables)
