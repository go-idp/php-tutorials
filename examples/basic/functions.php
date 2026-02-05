<?php
/**
 * 函数示例
 */

// 基本函数
function greet($name) {
    return "Hello, $name!";
}

// 带默认参数
function greetWithDefault($name = "Guest") {
    return "Hello, $name!";
}

// 带类型声明
function add(int $a, int $b): int {
    return $a + $b;
}

// 使用
echo greet("John") . "\n";
echo greetWithDefault() . "\n";
echo add(5, 3) . "\n";
?>
