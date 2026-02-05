# 数组

数组是存储多个值的变量。PHP 支持索引数组和关联数组。

## 创建数组

### 索引数组

```php
<?php
// 方式一
$fruits = array("Apple", "Banana", "Orange");

// 方式二（简写）
$fruits = ["Apple", "Banana", "Orange"];

// 访问元素
echo $fruits[0];  // 输出: Apple
?>
```

### 关联数组

```php
<?php
$person = [
    "name" => "John",
    "age" => 25,
    "city" => "Beijing"
];

echo $person["name"];  // 输出: John
?>
```

## 访问数组元素

```php
<?php
$fruits = ["Apple", "Banana", "Orange"];

echo $fruits[0];   // Apple
echo $fruits[1];   // Banana
echo $fruits[2];   // Orange
?>
```

## 修改数组元素

```php
<?php
$fruits = ["Apple", "Banana", "Orange"];
$fruits[1] = "Grape";  // 修改元素

$person = ["name" => "John", "age" => 25];
$person["age"] = 30;  // 修改关联数组
?>
```

## 添加元素

```php
<?php
$fruits = ["Apple", "Banana"];

// 添加元素
$fruits[] = "Orange";  // 添加到末尾
array_push($fruits, "Grape");  // 使用函数添加

// 关联数组
$person["email"] = "john@example.com";
?>
```

## 遍历数组

### for 循环

```php
<?php
$fruits = ["Apple", "Banana", "Orange"];

for ($i = 0; $i < count($fruits); $i++) {
    echo $fruits[$i] . " ";
}
?>
```

### foreach 循环

```php
<?php
$fruits = ["Apple", "Banana", "Orange"];

// 遍历值
foreach ($fruits as $fruit) {
    echo $fruit . " ";
}

// 遍历键和值
$person = ["name" => "John", "age" => 25];
foreach ($person as $key => $value) {
    echo "$key: $value\n";
}
?>
```

## 数组函数

### 常用函数

```php
<?php
$fruits = ["Apple", "Banana", "Orange"];

// 获取数组长度
count($fruits);  // 3

// 检查键是否存在
isset($fruits[0]);  // true
array_key_exists(0, $fruits);  // true

// 检查值是否存在
in_array("Apple", $fruits);  // true
array_search("Apple", $fruits);  // 返回键 0

// 添加元素
array_push($fruits, "Grape");
array_unshift($fruits, "Mango");  // 添加到开头

// 移除元素
array_pop($fruits);  // 移除最后一个
array_shift($fruits);  // 移除第一个

// 合并数组
$arr1 = [1, 2];
$arr2 = [3, 4];
$merged = array_merge($arr1, $arr2);  // [1, 2, 3, 4]

// 切片
$slice = array_slice($fruits, 1, 2);  // 从索引1开始取2个元素
?>
```

### 排序函数

```php
<?php
$numbers = [3, 1, 4, 1, 5];

sort($numbers);        // 升序排序
rsort($numbers);       // 降序排序
asort($numbers);       // 保持键的升序排序
ksort($numbers);       // 按键排序
?>
```

### 数组操作

```php
<?php
$fruits = ["Apple", "Banana", "Orange"];

// 反转数组
$reversed = array_reverse($fruits);

// 去重
$unique = array_unique([1, 2, 2, 3, 3]);

// 随机打乱
shuffle($fruits);

// 数组转字符串
$str = implode(", ", $fruits);  // "Apple, Banana, Orange"

// 字符串转数组
$arr = explode(", ", $str);
?>
```

## 多维数组

```php
<?php
// 二维数组
$students = [
    ["name" => "John", "age" => 20],
    ["name" => "Jane", "age" => 22],
    ["name" => "Bob", "age" => 21]
];

// 访问
echo $students[0]["name"];  // John

// 遍历
foreach ($students as $student) {
    echo $student["name"] . " - " . $student["age"] . "\n";
}
?>
```

## 数组解构 (PHP 7.1+)

```php
<?php
$person = ["John", 25, "Beijing"];
[$name, $age, $city] = $person;

echo $name;  // John
echo $age;   // 25
?>
```

## 下一步

学习面向对象编程 → [面向对象编程](/guide/oop)
