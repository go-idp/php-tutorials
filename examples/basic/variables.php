<?php
/**
 * 变量示例
 */

// 字符串
$name = "John";
$message = "Hello, $name";

// 整数
$age = 25;

// 浮点数
$price = 99.99;

// 布尔值
$isActive = true;

// 数组
$fruits = ["Apple", "Banana", "Orange"];

// 输出
echo "Name: $name\n";
echo "Age: $age\n";
echo "Price: $price\n";
echo "Active: " . ($isActive ? 'Yes' : 'No') . "\n";
echo "Fruits: " . implode(", ", $fruits) . "\n";
?>
