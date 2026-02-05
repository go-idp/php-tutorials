# 变量与数据类型

变量是存储数据的容器。PHP 是一种弱类型语言，变量类型会根据赋值自动确定。

## 变量声明

PHP 变量以 `$` 符号开头：

```php
<?php
$name = "John";
$age = 25;
$price = 99.99;
$isActive = true;
?>
```

## 变量命名规则

- 必须以字母或下划线开头
- 只能包含字母、数字和下划线
- 区分大小写
- 不能使用 PHP 关键字

```php
<?php
$name = "John";      // 正确
$_name = "John";     // 正确
$name1 = "John";     // 正确
$1name = "John";     // 错误
$my-name = "John";   // 错误
?>
```

## 数据类型

PHP 支持以下数据类型：

### 标量类型

#### 1. 字符串 (String)

```php
<?php
$str1 = "双引号字符串";
$str2 = '单引号字符串';
$str3 = "可以包含变量: $name";

// 字符串连接
$fullName = $firstName . " " . $lastName;
?>
```

#### 2. 整数 (Integer)

```php
<?php
$age = 25;
$negative = -10;
$hex = 0xFF;      // 十六进制
$octal = 0777;    // 八进制
$binary = 0b1010; // 二进制
?>
```

#### 3. 浮点数 (Float)

```php
<?php
$price = 99.99;
$pi = 3.14159;
$scientific = 1.2e3; // 1200
?>
```

#### 4. 布尔值 (Boolean)

```php
<?php
$isActive = true;
$isDeleted = false;
?>
```

### 复合类型

#### 5. 数组 (Array)

```php
<?php
// 索引数组
$fruits = array("Apple", "Banana", "Orange");
$fruits = ["Apple", "Banana", "Orange"]; // 简写

// 关联数组
$person = [
    "name" => "John",
    "age" => 25,
    "city" => "Beijing"
];
?>
```

#### 6. 对象 (Object)

```php
<?php
class Person {
    public $name;
    public $age;
}

$person = new Person();
$person->name = "John";
$person->age = 25;
?>
```

### 特殊类型

#### 7. NULL

```php
<?php
$var = null;
$var = NULL;
?>
```

#### 8. 资源 (Resource)

用于表示外部资源，如数据库连接、文件句柄等。

## 类型检测

```php
<?php
$var = "Hello";

var_dump($var);           // 输出类型和值
gettype($var);            // 返回类型字符串
is_string($var);          // 检查是否为字符串
is_int($var);             // 检查是否为整数
is_array($var);           // 检查是否为数组
is_object($var);          // 检查是否为对象
?>
```

## 类型转换

### 自动类型转换

```php
<?php
$str = "10";
$num = $str + 5;  // 自动转换为数字，结果为 15
?>
```

### 强制类型转换

```php
<?php
$str = "10";
$int = (int)$str;        // 转换为整数
$float = (float)$str;    // 转换为浮点数
$bool = (bool)$str;      // 转换为布尔值
$array = (array)$str;    // 转换为数组
?>
```

## 变量作用域

### 局部变量

```php
<?php
function test() {
    $x = 5;  // 局部变量
    echo $x;
}
?>
```

### 全局变量

```php
<?php
$x = 5;  // 全局变量

function test() {
    global $x;  // 使用 global 关键字
    echo $x;
}
?>
```

### 静态变量

```php
<?php
function test() {
    static $count = 0;
    $count++;
    echo $count;
}
?>
```

## 可变变量

变量名可以动态生成：

```php
<?php
$name = "John";
$$name = "Doe";  // 创建 $John 变量

echo $John;  // 输出 "Doe"
?>
```

## 下一步

学习运算符和表达式 → [运算符与表达式](/guide/operators)
