# 函数

函数是一段可重复使用的代码块，用于执行特定任务。

## 定义函数

```php
<?php
function greet() {
    echo "Hello, World!";
}

greet();  // 调用函数
?>
```

## 函数参数

### 传递参数

```php
<?php
function greet($name) {
    echo "Hello, $name!";
}

greet("John");  // 输出: Hello, John!
?>
```

### 多个参数

```php
<?php
function add($a, $b) {
    return $a + $b;
}

$result = add(5, 3);  // 8
?>
```

### 默认参数

```php
<?php
function greet($name = "Guest") {
    echo "Hello, $name!";
}

greet();        // 输出: Hello, Guest!
greet("John");  // 输出: Hello, John!
?>
```

### 类型声明

```php
<?php
function add(int $a, int $b): int {
    return $a + $b;
}

$result = add(5, 3);  // 8
?>
```

## 返回值

使用 `return` 语句返回值：

```php
<?php
function multiply($a, $b) {
    return $a * $b;
}

$result = multiply(4, 5);  // 20
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

test();     // 输出: 5
echo $x;    // 错误: 未定义变量
?>
```

### 全局变量

```php
<?php
$x = 5;  // 全局变量

function test() {
    global $x;
    echo $x;  // 输出: 5
}

test();
?>
```

### 静态变量

```php
<?php
function counter() {
    static $count = 0;
    $count++;
    echo $count;
}

counter();  // 输出: 1
counter();  // 输出: 2
counter();  // 输出: 3
?>
```

## 可变参数

### 使用 func_get_args()

```php
<?php
function sum() {
    $args = func_get_args();
    $total = 0;
    foreach ($args as $arg) {
        $total += $arg;
    }
    return $total;
}

echo sum(1, 2, 3, 4);  // 输出: 10
?>
```

### 使用 ... 运算符 (PHP 5.6+)

```php
<?php
function sum(...$numbers) {
    $total = 0;
    foreach ($numbers as $number) {
        $total += $number;
    }
    return $total;
}

echo sum(1, 2, 3, 4);  // 输出: 10
?>
```

## 匿名函数（闭包）

```php
<?php
$greet = function($name) {
    echo "Hello, $name!";
};

$greet("John");  // 输出: Hello, John!
?>
```

### 使用 use 关键字

```php
<?php
$message = "Hello";

$greet = function($name) use ($message) {
    echo "$message, $name!";
};

$greet("John");  // 输出: Hello, John!
?>
```

## 箭头函数 (PHP 7.4+)

```php
<?php
$add = fn($a, $b) => $a + $b;

echo $add(5, 3);  // 输出: 8
?>
```

## 递归函数

函数调用自身：

```php
<?php
function factorial($n) {
    if ($n <= 1) {
        return 1;
    }
    return $n * factorial($n - 1);
}

echo factorial(5);  // 输出: 120
?>
```

## 内置函数

PHP 提供了大量内置函数：

```php
<?php
// 字符串函数
strlen("Hello");        // 5
strtoupper("hello");    // "HELLO"
str_replace("World", "PHP", "Hello World");  // "Hello PHP"

// 数组函数
count([1, 2, 3]);       // 3
array_push($arr, 4);    // 添加元素
array_pop($arr);        // 移除最后一个元素

// 数学函数
abs(-5);                // 5
sqrt(16);               // 4
rand(1, 100);           // 随机数
?>
```

## 下一步

学习数组操作 → [数组](/guide/arrays)
